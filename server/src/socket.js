const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const superheroes = require("superheroes");

const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	},
});


io.on("connection", socket => {
	

	console.log("User connected");

	socket.on("disconnect", () => {
         console.log("User disconnected");
	});

});

server.listen(process.env.PORT || 8000, () => {
	console.log("Server is running on port 8000");
});