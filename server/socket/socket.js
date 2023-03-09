var Player = require("../game_logic/player.js");
var Room = require("../game_logic/room");
var OverpassDataProvider = require("../data_providers/overpass");

class SocketServer {
  constructor(io) {
    this.rooms = {}; // hashmap keys: roomCode, values: room objects
    this.sockets = {}; // hashmap keys: socket.id, values: {roomObj: room Object, playerObj: playerObject}
    this.dataProviders = [new OverpassDataProvider()];
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
      socket.on("startGame", () => this.onStartGame(io, socket));
      socket.on("selectCategories", (selectedCategories) =>
        this.onSelectCategories(io, socket, selectedCategories)
      );
      socket.on("castVotes", (playerVotes, candidateActivities) =>
        this.onCastVotes(io, socket, playerVotes, candidateActivities)
      );
      socket.on("disconnect", () => this.onDisconnect(socket));
    });
  }

  onCreateRoom(socket) {
    let roomCode = this.makeRoomCode(5);
    while (this.rooms[roomCode]) {
      roomCode = this.makeRoomCode(5);
    }
    socket.join(roomCode);

    this.rooms[roomCode] = new Room(roomCode, this.dataProviders);
    this.sockets[socket.id] = {
      roomObj: this.rooms[roomCode],
      playerObj: null,
    };

    socket.emit("roomCreated", roomCode, this.rooms[roomCode].settings);
    console.log(roomCode, " has been created ");
  }

  onJoinRoom(socket, joinInfo) {
    let joinJSON = JSON.parse(joinInfo);
    if (!this.rooms[joinJSON.roomCode]) {
      socket.emit("joinRoomStatus", false, joinJSON.roomCode);
    } else {
      this.sockets[socket.id] = {
        roomObj: this.rooms[joinJSON.roomCode],
        playerObj: null,
      };
      socket.join(joinJSON.roomCode);
      socket.emit("joinRoomStatus", true, joinJSON.roomCode);
      console.log("Join room: \n", this.rooms[joinJSON.roomCode]);
    }
  }

  onAddPlayer(socket, playerInfo) {
    this.onRemovePlayer(socket);
    let playerJSON = JSON.parse(playerInfo);
    let playerObj = new Player(playerJSON.name, playerJSON.character);
    this.sockets[socket.id].roomObj.addPlayer(playerObj);
    this.sockets[socket.id] = {
      roomObj: this.sockets[socket.id].roomObj,
      playerObj: playerObj,
    };
    socket.emit(
      "playerAdded",
      playerObj.name,
      playerObj.character,
      this.sockets[socket.id].roomObj.roomCode
    );
    console.log("Add player: \n", this.sockets[socket.id].roomObj);
  }

  onRemovePlayer(socket) {
    let playerObj = this.sockets[socket.id].playerObj;
    this.sockets[socket.id].roomObj.removePlayer(playerObj);
    console.log("Remove player: \n", this.sockets[socket.id].roomObj);
  }

  onSetSettings(socket, settingsInfo) {
    let settingsJSON = JSON.parse(settingsInfo);
    let activityType = settingsJSON.activityType;
    let maxDistance = settingsJSON.maxDistance;
    let hostLocation = settingsJSON.hostLocation;
    this.sockets[socket.id].roomObj.editSettings(
      activityType,
      maxDistance,
      hostLocation
    );
    socket.emit("settingsStatus", true);
    console.log("SetSettings \n", this.sockets[socket.id].roomObj);
  }

  async onStartGame(io, socket) {
    let room = this.sockets[socket.id].roomObj;
    let availableCategories = await room.startGame();
    io.in(room.roomCode).emit("gameStarted", availableCategories);
    console.log("Game started; room code:", room.roomCode);
  }

  onSelectCategories(io, socket, selectedCategories) {
    let room = this.sockets[socket.id].roomObj;
    let lastPlayerToCall = room.aggregateCategories(selectedCategories);
    if (!lastPlayerToCall) {
      socket.emit("awaitingLastPlayer");
    } else {
      let filtered_activities = room.filterActivities(
        room.broadCategories.broadCategoriesSet
      );
      console.log("filteredActivities:", filtered_activities);
      let availableCards = room.chooseCandidateActivities(
        filtered_activities,
        20
      );
      console.log("availableCards:", availableCards);
      io.in(room.roomCode).emit("startVoting", availableCards);
    }
  }

  onCastVotes(io, socket, playerVotes, candidateActivities) {
    let room = this.sockets[socket.id].roomObj;
    let lastPlayerToVote = room.aggregateVotes(playerVotes);
    if (!lastPlayerToVote) {
      socket.emit("awaitingLastPlayer");
    } else {
      console.log(room.votes);
      let topActivities = room.getTopActivities(
        room.votes,
        candidateActivities
      );
      let top3 = topActivities.slice(0, 3);
      io.in(room.roomCode).emit("sendResults", top3);
    }
  }

  onDisconnect(socket) {
    if (this.sockets[socket.id]) {
      let playerObj = this.sockets[socket.id].playerObj;

      this.sockets[socket.id].roomObj.removePlayer(playerObj);
      socket.leave(this.sockets[socket.id].roomObj.roomCode);
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
