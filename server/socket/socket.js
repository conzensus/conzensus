var { Server } = require("socket.io");
var Player = require('../game_logic/player.js');
var Room = require('../game_logic/room')


function startSocket(server) {
	const roomStates = {}; // hashmap keys: roomCode, values: room objects
    const sockets = {};

	const io = new Server(server, {
		cors: { origin: "http://localhost:3000" },
	});
	io.on("connection", (socket) => {
		console.log("***: A user connected");
		socket.on('newRoom', function(hostInfo){
            console.log("reached")
            let roomCode = makeRoomCode(5);
            while(roomStates[roomCode]) {
                roomCode = makeRoomCode(5)
            }
            socket.join(roomCode);

            let hostJSON = JSON.parse(hostInfo)
            let hostPlayer = new Player(hostJSON.name, hostJSON.character)
            
            sockets[socket.id] = { roomCode: roomCode, playerObj: hostPlayer }

            roomStates[roomCode] = new Room(roomCode, hostPlayer)
            
            socket.emit("returnRoomCode", roomCode)
            console.log(`${hostJSON.name} has created and joined game "${roomCode}".`)
        });

		socket.on('joinRoom', function(joinInfo){
            let joinJSON = JSON.parse(joinInfo)
            if (!roomStates[joinJSON.roomCode]) {
                socket.emit("invalidRoomCode")
            } else {
                sockets[socket.id] = { roomCode: joinJSON.roomCode, playerObj: null }
                socket.join(joinJSON.roomCode)
                socket.emit("returnRoomCode", joinJSON.roomCode)
                console.log(roomStates[joinJSON.roomCode])
            }
        });

        socket.on('addPlayer', function(playerInfo) {
            let playerJSON = JSON.parse(playerInfo)
            let playerObj = new Player(playerJSON.name, playerJSON.character)
            roomStates[sockets[socket.id].roomCode].addPlayer(playerObj)
            sockets[socket.id] = { roomCode: sockets[socket.id].roomCode, playerObj: playerObj }
            console.log(roomStates[sockets[socket.id].roomCode])
        });


        socket.on('editSettings', function(settingsInfo) {
            let settingsJSON = JSON.parse(settingsInfo)
            let activityType = settingsJSON.activityType
            let maxDistance = settingsJSON.maxDistance
            let hostLocation = settingsJSON.hostLocation
            roomStates[sockets[socket.id].roomCode].editSettings(activityType, maxDistance, hostLocation)
            console.log(roomStates[sockets[socket.id].roomCode])
        });


        // calculate broad categories, create only one overpass object at 
        //                                  top of socket or input as parameter to method

        // send 20 cards

        // send voting results
        //          return top 3 activities

		socket.on("disconnect", () => {
			disconnectSocketFromGame()
			console.log("🔥: A user disconnected");
		});

        function disconnectSocketFromGame() {
            if (sockets[socket.id]) {
                let roomCode = sockets[socket.id].roomCode
                let playerObj = sockets[socket.id].playerObj
    
                roomStates[roomCode].removePlayer(playerObj)
                socket.leave(sockets[socket.id])
                delete sockets[socket.id]
            }
        }
	});
}

function makeRoomCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = startSocket;