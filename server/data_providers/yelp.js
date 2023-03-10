const querystring = require("querystring");

const config = require("../config.json");

const RATE_LIMIT_DAILY = 5000;
const ENDPOINT = "https://api.yelp.com/v3";

// TODO: refine these!!! some active category stuff are actually indoors etc.
// see https://docs.developer.yelp.com/docs/resources-categories
const CATEGORY_TYPES = {
  "food": ["restaurants", "food"],
  "outdoor": ["active"],
  "indoor": ["arts", "museums", "musicvenues", "shopping"]
}

/**
 * Data provider which abstracts away Yelp Fusion API calls.
 * 
 * This is supposed to be a singleton class. The server should only
 * initialize one of these at a time, since it keeps track of per-endpoint
 * rate limits.
 */
class YelpDataProvider {
	constructor() {
		this.requests = 0;
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
		let yelpQuery = querystring.stringify({
      latitude: latitude,
      longitude: longitude,
      radius: meters,
      limit: 50,
      sort_by: "best_match",
      open_now: "true",
      categories: CATEGORY_TYPES[activityType]
		});
		let queryUrl = `${ENDPOINT}/businesses/search?${yelpQuery}`;

    let fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.apiKeys.yelp}`
      }
    };

    let res = await fetch(queryUrl, fetchOptions);
    let json = await res.json();
    let businesses = json["businesses"];

    let activities = businesses.map(this.#yelpBusinessAsActivity);
    return activities;
	}

	/**
	 * Returns true if this data provider is available
	 */
	ifAvailable() {
		return this.requests < RATE_LIMIT_DAILY;
	}

  /**
   * This turns a single Yelp Business JSON object into a Conzensus Activity
   * @param {Object} business Yelp Business object
   * @returns {Activity} Conzensus Activity
   */
  #yelpBusinessAsActivity(business) {
    let tags = business.categories.map(category => category.title);

    let activity = {
      "id": "yelp-" + business.id,
      "name": business.name,
      "category": tags[0], // TODO: Since could be multiple categories, should we convert Activity.category to array type?
      "coordinates": [business.coordinates.latitude, business.coordinates.longitude],
      "distance": business.distance,
      "description": "No description available",  // TODO: get a description from somewhere. Maybe need to have a separate API call
      "budget": [0.0, 9999.99],                   // TODO:  convert from yelp's $$$ notation to actual number range
      "tags": tags,
      "imageUrl": business.image_url,
      "externalLinks": {
        "yelp": business.url
      }
    };

    return activity;
  }
}

module.exports = YelpDataProvider;