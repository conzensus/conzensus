var Settings = require("./settings.js");

module.exports = class Room {
  /**
   * Create a Conzensus room
   * @param {String}              roomCode      Room code
   * @param {Array<DataProvider>} dataProviders Ranked list of preferred data providers to use. The room will try index 0 first
   */
  constructor(roomCode, dataProviders) {
    this.dataProviders = dataProviders;
    this.roomCode = roomCode;
    this.playerList = [];
    this.settings = new Settings(); // Could add host location into settings here if we wanted

    this.host; // populated when first player is added
    this.activityCache; // once the game is started, this will be an array of all activities within the room's search range
  }

  /**
   * Add a player to the Conzensus room. If they are first, they will be made host.
   * @param {Player} player Player to add
   */
  addPlayer(player) {
    if (this.playerList.length == 0) {
      this.host = player;
    } 
    this.playerList.push(player);
  }

  /**
   * Remove a player from the Conzensus room
   * @param {Player} player Player to remove
   */
  removePlayer(player) {
    var index = this.playerList.indexOf(player);
    if (index > -1) {
      this.playerList.splice(this.playerList.indexOf(player), 1);
    }
    if (index == 0) {
      this.host = this.playerList[0];
    }
  }

  /**
   * Change the Conzensus room's settings
   * @param {String} activityType         Type of activity (e.g. outdoor)
   * @param {Number} maxDistance          Maximum distance from the host location to reccommend activities from
   * @param {Array<Number>} hostLocation  Latitude and longitude array
   */
  editSettings(activityType, maxDistance, hostLocation) {
    this.settings.editSettings(activityType, maxDistance, hostLocation);
  }

  /**
   * Start the room's game
   * @returns {Promise<Array<String>>} List of broad categories
   */
  async startGame() {
    let provider = this.#getBestDataProvider();

    this.activityCache = await provider.getActivitiesInRadius(
      this.settings.activityType,
      this.settings.maxDistance,
      this.settings.hostLocation[0],
      this.settings.hostLocation[1]
      );
    let categories = this.#getBroadCategories(this.activityCache);

    return categories;
  }

  /**
   * Filter activities by the set of broad categories
   * @param {Array<String>} broadCategories Broad category filter
   * @returns {Array<String>} Activities that match the broad categories
   */
  filterActivities(broadCategories) {
    return this.activityCache.filter(activity => broadCategories.includes(activity.category))
  }

  /**
   * Choose some number of activities from the activity set
   * @param {Array<Activity>} activities Set of activities
   * @param {number} numActivities Number of activities to return
   * @returns {Array<Activity>} Subset of activities
   */
  chooseCandidateActivities(activities, numActivities) {
    const shuffled = activities.sort(() => 0.5 - Math.random());
    return shuffled.slice(numActivities - 1);
  }

  /**
   * Get the set of available broad categories that are in the given array of activities
   * @param {Array<Activity>} activities Array of activities
   * @returns {Set<String>} Set of broad categories
   */
  #getBroadCategories(activities) {
    let categories = new Set();
    for (const activity of activities) {
      categories.add(activity.category);
    }
    return categories;
  }

  /**
   * Get the most preferred available data provider
   * @returns {DataProvider} Best data provider
   */
  #getBestDataProvider() {
    for (const provider of this.dataProviders) {
      if (provider.isAvailable()) {
        return provider;
      }
    }
    throw new Error("No data providers are avilable!");
  }
};
