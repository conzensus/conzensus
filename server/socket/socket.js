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
      socket.on("castVotes", (voteRequest) =>
        this.onCastVotes(io, socket, voteRequest.votes, voteRequest.activities)
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

    let response = {
      roomCode: roomCode,
      settings: this.rooms[roomCode].settings,
    };
    socket.emit("roomCreated", response);
    console.log(roomCode, " has been created ");
  }

  onJoinRoom(socket, joinInfo) {
    let response = { success: false, roomCode: joinInfo.roomCode };
    if (!this.rooms[joinInfo.roomCode]) {
      socket.emit("joinRoomStatus", response);
    } else {
      this.sockets[socket.id] = {
        roomObj: this.rooms[joinInfo.roomCode],
        playerObj: null,
      };
      socket.join(joinInfo.roomCode);

      response.success = true;
      socket.emit("joinRoomStatus", response);
      console.log("Join room: \n", this.rooms[joinInfo.roomCode]);
    }
  }

  onAddPlayer(socket, playerInfo) {
    this.onRemovePlayer(socket);
    let playerObj = new Player(playerInfo.playerName, playerInfo.character);
    this.sockets[socket.id].roomObj.addPlayer(playerObj);
    this.sockets[socket.id] = {
      roomObj: this.sockets[socket.id].roomObj,
      playerObj: playerObj,
    };
    let response = {
      playerName: playerObj.name,
      character: playerObj.character,
      roomCode: this.sockets[socket.id].roomObj.roomCode,
    };
    socket.emit("playerAdded", response);
    console.log("Add player: \n", this.sockets[socket.id].roomObj);
  }

  onRemovePlayer(socket) {
    let playerObj = this.sockets[socket.id].playerObj;
    this.sockets[socket.id].roomObj.removePlayer(playerObj);
    let response = { success: true };
    socket.emit("playerRemoved", response);
    console.log("Remove player: \n", this.sockets[socket.id].roomObj);
  }

  onSetSettings(socket, settingsInfo) {
    let activityType = settingsInfo.activityType;
    let maxDistance = settingsInfo.maxDistance;
    let hostLocation = settingsInfo.hostLocation;
    this.sockets[socket.id].roomObj.editSettings(
      activityType,
      maxDistance,
      hostLocation
    );
    let response = { success: true };
    socket.emit("settingsStatus", response);
    console.log("SetSettings \n", this.sockets[socket.id].roomObj);
  }

  async onStartGame(io, socket) {
    let room = this.sockets[socket.id].roomObj;
    let availableCategories = await room.startGame();

    let response = { availableCategories: availableCategories };
    io.in(room.roomCode).emit("gameStarted", response);
    console.log("Game started; room code:", room.roomCode);
  }

  onSelectCategories(io, socket, selectedCategories) {
    let room = this.sockets[socket.id].roomObj;
    let lastPlayerToCall = room.aggregateCategories(
      selectedCategories.categories
    );
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
      let response = { availableCards: availableCards };
      io.in(room.roomCode).emit("startVoting", response);
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
      let response = { results: top3 };
      io.in(room.roomCode).emit("sendResults", response);
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
