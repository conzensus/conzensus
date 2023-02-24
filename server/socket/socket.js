var { Server } = require("socket.io");
var Player = require('../game_logic/player.js');


function startSocket(server) {
	const gameStates = {};
    const sockets = {};

	const io = new Server(server, {
		cors: { origin: "http://localhost:3000" },
	});
	io.on("connection", (socket) => {
		console.log("***: A user connected");
		socket.on('newRoom', function(player){
            let gameCode = makeGameCode(5);
            while(gameStates[gameCode]) {
                gameCode = makeGameCode(5)
            }

            let playerJSON = JSON.parse(player)
            sockets[socket.id] = {gameRoom: gameCode, name: playerJSON.name};
            socket.join(gameCode);

            let playerInfo = new Player(playerJSON.name, playerJSON.character)
            gameStates[gameCode] = initGame([playerInfo], gameCode)
            
            console.log(`${createJSON.name} has created and joined game "${gameCode}".`)
        });

		socket.on('joinRoom', function(joinInfo){
            
        });

		socket.on("disconnect", () => {
			disconnectSocketFromGame()
			console.log("🔥: A user disconnected");
		});

        function disconnectSocketFromGame() {
            if (sockets[socket.id]) {
                let gameRoom = sockets[socket.id].gameRoom
                let username = sockets[socket.id].username
    
                removeUser(gameStates[gameRoom], username)
                socket.leave(sockets[socket.id].gameRoom)
                sockets.pop(socket.id)
            }
        }
	});
}

function makeGameCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = startSocket;