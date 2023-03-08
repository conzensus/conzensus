class FakeTestDataProvider {
  isAvailable() {
    return true;
  }

  async getActivitiesInRadius(activityType, meters, latitude, longitude) {
    return [
      {"id": "test-1.1", "category": "test-category-1"}, // there should be only 1 activity with test-category-1
      {"id": "test-2.2", "category": "test-category-2"}, // and 2 activities of test-category-2 etc.
      {"id": "test-2.2", "category": "test-category-2"},
      {"id": "test-3.1", "category": "test-category-3"},
      {"id": "test-3.2", "category": "test-category-3"},
      {"id": "test-3.3", "category": "test-category-3"},
    ];
  }
}

module.exports = FakeTestDataProvider;