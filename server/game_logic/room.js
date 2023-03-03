var Settings = require("./settings.js");

module.exports = class Room {
  constructor(roomCode) {
    this.roomCode = roomCode;
    this.playerList = [];
    this.settings = new Settings(); // Could add host location into settings here if we wanted
  }

  /**
   * Add a player to the Conzensus room
   * @param {Player} player Player to add
   */
  addPlayer(player) {
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
};
