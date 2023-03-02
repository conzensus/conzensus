module.exports = class Settings {
  constructor() {
    this.activityType = "food";
    this.maxDistance = 5.0;
    this.hostLocation = [47.66009172738974, -122.31304749174053];
  }

  editSettings(activityType, maxDistance, hostLocation) {
    this.activityType = activityType;
    this.maxDistance = maxDistance;
    this.hostLocation = hostLocation;
  }
};
