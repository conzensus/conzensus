var Settings = require("./settings.js");

module.exports = class Room {
  constructor(roomCode) {
    this.roomCode = roomCode;
    this.playerList = [];
    this.settings = new Settings(); // Could add host location into settings here if we wanted
  }

  addPlayer(player) {
    this.playerList.push(player);
  }

  removePlayer(player) {
    var index = this.playerList.indexOf(player);
    if (index > -1) {
      this.playerList.splice(this.playerList.indexOf(player), 1);
    }
  }

  editSettings(activityType, maxDistance, hostLocation) {
    this.settings.editSettings(activityType, maxDistance, hostLocation);
  }
};
