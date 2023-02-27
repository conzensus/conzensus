var Settings = require('./settings.js');

module.exports = class Room {
  constructor(roomCode, hostPlayerInfo) { 
    this.roomCode = roomCode;
    this.playerList = [hostPlayerInfo];
    this.settings = new Settings(); // Could add host location into settings here if we wanted
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
