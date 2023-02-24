/**
 * overpass.js
 * This file defines the Overpass data provider object.
 */

const querystring = require("querystring");
const xmldom = require("xmldom")
const osmtogeojson = require("osmtogeojson");

const ENDPOINTS = {
  "main-lz4": "https://lz4.overpass-api.de/api/interpreter"
};

const RATE_LIMITS_DAILY = {
  "main-lz4": 1000000
};

const WIKIPEDIA_URL = "https://en.m.wikipedia.org";

// see https://wiki.openstreetmap.org/wiki/Key:amenity
const AMENITY_TYPES = {
  "food": [
    "bar",
    "biergarten",
    "cafe",
    "fast_food",
    "food_court",
    "ice_cream",
    "pub",
    "restaurant"
  ],
  "indoor": [
    "arts_centre",
    "casino",
    "cinema",
    "community_centre",
    "conference_centre",
    "events_venue",
    "exhibition_centre",
    "gambling",
    "music_venue",
    "nightclub",
    "planetarium",
    "social_centre",
    "studio",
    "theatre"
  ],
  "outdoor": [
    "public_bookcase",
    "fountain",
    "give_box",
    "kneipp_water_cure",
    "marketplace"
  ]
};

/**
 * Data provider which abstracts away Overpass API calls.
 * 
 * This is supposed to be a singleton class. The server should only
 * initialize one of these at a time, since it keeps track of per-endpoint
 * rate limits.
 */
class OverpassDataProvider {
  
  constructor() {
    // store how many requests we've made to a given endpoint this session
    // WARNING: this is not currently persistent so if you restart this server,
    // the values here may be less than the true request count
    this.requests = {};

    for (let endpointName in ENDPOINTS) {
      this.requests[endpointName] = 0;
    }
  }

  /**
   * Get activities of a certain type within the specified radius of a coordinate.
   * @param {string} activityType Type of activity (e.g. "indoor")
   * @param {number} meters       Search radius from coordinate in meters
   * @param {number} latitude     Latitude for center of search area
   * @param {number} longitude    Longitude for center of search area
   * @returns {Promise<Array<Activity>>} List of Conzensus Activities within search area
   */
  async getActivitiesInRadius(activityType, meters, latitude, longitude) {
    let amenities = AMENITY_TYPES[activityType].join("|");

    let overpassQL = `
      node
        ["amenity"~"${amenities}"]
        (around:${meters}, ${latitude}, ${longitude});
      out;
    `;

    let geojson = await this.#requestFromBestEndpoint(overpassQL);
    return geojson.features.map(this.#osmFeatureAsActivity);
  }

  /**
   * Transform OSM GeoJSON features into Conzensus Activity objects
   * @param {GeoJSON} feature GeoJSON representing a feature in OSM/Overpass
   * @returns {Activity} Conzensus Activity
   */
  #osmFeatureAsActivity(feature) {
    let props = feature.properties;
    let tags = props.tags;

    let activity = {
      "id": "overpass-" + feature.id,
      "name": tags.name,
      "category": tags.amenity,
      "coordinates": feature.geometry.coordinates,
      "distance": 0.0,                            // TODO: should we really be calculating distance here/anywhere in the server side?
      "description": "No description available",  // TODO: get a description from somewhere. Overpass doesn't provide one. Might be able to use Wikidata for some locations.
      "budget": [0.0, 9999.99],                   // TODO: get a budget from somewhere.
      "tags": [],                                 // TODO: OSM's tags don't seem to correspond to what we consider "tags"
      "imageUrl": null,
      "externalLinks": {}
    };

    if (tags["brand:wikipedia"] && tags["brand:wikipedia"].startsWith("en:")) {
      let wikiPage = tags["brand:wikipedia"].slice(3);
      activity["externalLinks"]["wikipedia"] = `${WIKIPEDIA_URL}/${wikiPage}`;
    }

    return activity;
  }

  /**
   * Get the best endpoint to use to request data.
   * @note  The "best" endpoint is currently the one with the least requests
   *        that hasn't exceeded its rate limit yet.
   * @returns {String} Endpoint name
   */
  #getBestEndpoint() {
    let leastRequests = Infinity;
    let bestEndpoint = null;
    for (const [endpointName, requests] of Object.entries(this.requests)) {
      if (requests < leastRequests && requests < RATE_LIMITS_DAILY[endpointName]) {
        leastRequests = requests;
        bestEndpoint = endpointName;
      }
    }
    return bestEndpoint;
  }

  /**
   * Request the given OverpassQL query from the best API endpoint.
   * 
   * See `OverpassDataProvier.#getBestEndpoint()` for what counts as "best"
   * @param {string} overpassQL API query in Overpass Query Language
   * @returns {Promise<GeoJSON>} Overpass response data as GeoJSON
   */
  async #requestFromBestEndpoint(overpassQL) {
    let bestEndpointName = this.#getBestEndpoint();
    let bestEndpointURL = ENDPOINTS[bestEndpointName];

    let queryString = querystring.stringify({data: overpassQL});
    let requestURL = `${bestEndpointURL}?${queryString}`;

    this.requests[bestEndpointName]++;

    let response = await fetch(requestURL);
    let body = await response.text();
    let document = new xmldom.DOMParser().parseFromString(body);
    let geojson = osmtogeojson(document);

    return geojson;
  }
}

module.exports.OverpassDataProvider = OverpassDataProvider;