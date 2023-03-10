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
    this.broadCategories = {
      playersCollectedFrom: 0,
      broadCategoriesSet: new Set(),
    }; // broadCategories[0] Counts how many players' broad categories have been collected, Set() stores their preferences
    this.votes = [];
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

    return Array.from(categories);
  }

  /**
   * Aggregate broad categories into a set based on each players preferences
   * Calls filter activities once every players categories are included
   * @param {Array<String>} selectedCategories by player
   * @returns {Boolean} // True if they are they last player to add categories
   */
  aggregateCategories(selectedCategories) {
    this.broadCategories.broadCategoriesSet.add(...selectedCategories);
    this.broadCategories.playersCollectedFrom++;
    return this.broadCategories.playersCollectedFrom == this.playerList.length;
  }

  /**
   * Filter activities by the set of broad categories
   * @param {Array<String>} broadCategories Broad category filter
   * @returns {Array<String>} Activities that match the broad categories
   */
  filterActivities(broadCategories) {
    return this.activityCache.filter(activity => broadCategories.has(activity.category))
  }

  /**
   * Choose some number of activities from the activity set
   * @param {Array<Activity>} activities Set of activities
   * @param {number} numActivities Number of activities to return
   * @returns {Array<Activity>} Subset of activities
   */
  chooseCandidateActivities(activities, numActivities) {
    // TODO: if we implement more candidate selection strategies than random, we should start putting candidate selection strategies in a separate class or something
    const shuffled = activities.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numActivities);
  }

  /**
   *
   * @param {Array<Activity_ids>} votes // A single players array of votes
   * @returns {Boolean} // True if they are they last player to submit votes
   */
  aggregateVotes(votes) {
    this.votes.push(votes);
    return this.votes.length == this.playerList.length;
  }

  /**
   * Sort the input Activity list by voter preference, removing vetos
   * @param {Array<Vote>}       votes               A list of votes, one from each player
   * @param {Array<Acitivites>} candidateActivities All candidate activites that players voted on
   * @returns {Array<Activity>} Sorted list of Activities, with most preferred first and no vetos
   * @throws If all candidate activities were vetoed
   */
  getTopActivities(votes, candidateActivities) {
    // tally up votes
    // TODO: if we make an alternate way of tallying votes, we should start putting talling strategies in a separate class
    let runningTally = {};
    for (const vote of votes) {
      for (const likedActivityId of vote["like"]) {
        runningTally[likedActivityId] = runningTally[likedActivityId]++ || 1; // the tally for the activity is 1 if undefined in the runningTally and incremented otherwise 
      }
      for (const dislikedActivityId of vote["dislike"]) {
        runningTally[dislikedActivityId] = runningTally[dislikedActivityId]-- || -1;
      }
    }

    // check if there are activities to return
    if (Object.keys(runningTally).length === 0) {
      throw new Error("All candidates activities were vetoed!");
    }

    // sort by tallies
    let sorted = [...Object.keys(runningTally)].sort((a, b) => runningTally[b] - runningTally[a]);

    // change Activity IDs into Activities
    let topActivities = sorted.map(activityId => candidateActivities.find(activity => activity.id === activityId));

    return topActivities;
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
