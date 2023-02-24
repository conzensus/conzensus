var Settings = require('./settings.js');

module.exports = class Room {
  constructor(roomCode) {
    this.roomCode = roomCode;
    this.playerList = [];
    this.settings = new Settings();
  }

  addPlayer(player) {
    this.playerList.push(player);
  }

  removePlayer(player) {
    this.playerList.pop(player);
  }

  editSettings(activityType, maxDistance, hostLocation) {
    this.settings.editSettings(activityType, maxDistance, hostLocation);
  }
}