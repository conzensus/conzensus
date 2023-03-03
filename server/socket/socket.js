var Player = require("../game_logic/player.js");
var Room = require("../game_logic/room");

class SocketServer {
  constructor(io) {
    this.roomStates = {}; // hashmap keys: roomCode, values: room objects
    this.sockets = {}; // hashmap keys: socket.id, values: {roomState: roomStateObj, playerObj: playerObject}
    io.on("connection", (socket) => {
      console.log("***: A user connected");
      socket.on("createRoom", () => this.onCreateRoom(socket));
      socket.on("joinRoom", (joinInfo) => this.onJoinRoom(socket, joinInfo));
      socket.on("addPlayer", (playerInfo) =>
        this.onAddPlayer(socket, playerInfo)
      );
      socket.on("removePlayer", () => this.onRemovePlayer(socket));
      socket.on("setSettings", (settingsInfo) =>
        this.onSetSettings(socket, settingsInfo)
      );
      socket.on("disconnect", () => this.onDisconnect(socket));
    });
  }

  onCreateRoom(socket) {
    let roomCode = this.makeRoomCode(5);
    while (this.roomStates[roomCode]) {
      roomCode = this.makeRoomCode(5);
    }
    socket.join(roomCode);

    this.roomStates[roomCode] = new Room(roomCode);
    this.sockets[socket.id] = {
      roomState: this.roomStates[roomCode],
      playerObj: null,
    };

    socket.emit("roomCreated", roomCode);
    console.log(roomCode, " has been created ");
  }

  onJoinRoom(socket, joinInfo) {
    let joinJSON = JSON.parse(joinInfo);
    if (!this.roomStates[joinJSON.roomCode]) {
      socket.emit("joinRoomStatus", false, joinJSON.roomCode);
    } else {
      this.sockets[socket.id] = {
        roomState: this.roomStates[joinJSON.roomCode],
        playerObj: null,
      };
      socket.join(joinJSON.roomCode);
      socket.emit("joinRoomStatus", true, joinJSON.roomCode);
      console.log("Join room: \n", this.roomStates[joinJSON.roomCode]);
    }
  }

  onAddPlayer(socket, playerInfo) {
    this.onRemovePlayer(socket);
    let playerJSON = JSON.parse(playerInfo);
    let playerObj = new Player(playerJSON.name, playerJSON.character);
    this.sockets[socket.id].roomState.addPlayer(playerObj);
    this.sockets[socket.id] = {
      roomState: this.sockets[socket.id].roomState,
      playerObj: playerObj,
    };
    console.log("Add player: \n", this.sockets[socket.id].roomState);
  }

  onRemovePlayer(socket) {
    let playerObj = this.sockets[socket.id].playerObj;
    this.sockets[socket.id].roomState.removePlayer(playerObj);
    console.log("Remove player: \n", this.sockets[socket.id].roomState);
  }

  onSetSettings(socket, settingsInfo) {
    let settingsJSON = JSON.parse(settingsInfo);
    let activityType = settingsJSON.activityType;
    let maxDistance = settingsJSON.maxDistance;
    let hostLocation = settingsJSON.hostLocation;
    this.sockets[socket.id].roomState.editSettings(
      activityType,
      maxDistance,
      hostLocation
    );
    console.log("SetSettings \n", this.sockets[socket.id].roomState);
  }

  onDisconnect(socket) {
    if (this.sockets[socket.id]) {
      let playerObj = this.sockets[socket.id].playerObj;

      this.sockets[socket.id].roomState.removePlayer(playerObj);
      socket.leave(this.sockets[socket.id].roomState.roomCode);
      delete this.sockets[socket.id];
    }
    console.log("🔥: A user disconnected");
  }

  makeRoomCode(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

module.exports = SocketServer;
