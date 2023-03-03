let OverpassDataProvider = require("../../data_providers/overpass");

async function overpassProviderReturnsActivities() {
  let provider = new OverpassDataProvider();

  let activities = await provider.getActivitiesInRadius(
    "indoor",
    1000,
    47.66009172738974,
    -122.31304749174053
  );

  if (activities.length <= 0) {
    console.error("Failed test overpassProviderReturnsActivities(): Overpass data provider failed to return any Activities!");
  } else {
    console.log("Passed test overpassProviderReturnsActivities()")
  }
}

// run tests
overpassProviderReturnsActivities();