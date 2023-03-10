let YelpDataProvider = require("../../data_providers/yelp");

async function yelpProviderReturnsActivities() {
  let provider = new YelpDataProvider();

  let activities = await provider.getActivitiesInRadius(
    "indoor",
    1000,
    47.66009172738974,
    -122.31304749174053
  );

  if (activities.length <= 0) {
    console.error("Failed test yelpProviderReturnsActivities(): Yelp data provider failed to return any Activities!");
  } else {
    console.log("Passed test yelpProviderReturnsActivities()")
  }
}

// run tests
yelpProviderReturnsActivities();