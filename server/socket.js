var { Server } = require("socket.io");

function startSocket(server) {
	const io = new Server(server, {
		cors: { origin: "http://localhost:3000" },
	});
	io.on("connection", (socket) => {
		console.log(`⚡: ${socket.id} user just connected!`);
		socket.on("disconnect", () => {
			console.log("🔥: A user disconnected");
		});
	});
}

module.exports = startSocket;
