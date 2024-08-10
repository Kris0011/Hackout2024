const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const superheroes = require("superheroes");
const { Auction } = require("./models/Auction");

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

	socket.on('placeBid',async (data) => {
        
        const currentAuction = await Auction.findById(data.auction._id)
        // console.log(data);
        
            if(currentAuction) {
            	currentAuction.bidPrice+= data.bidAmount;
            }
            currentAuction.winner = data.bidder;

        await currentAuction.save();

        
        io.to(data.auction._id).emit('updateAuction',{updatedAuction: currentAuction,bidder:data.bidder})
        }
    )

	socket.on("joinAuction" , (data) => {
		console.log("Join Auction", data);
		socket.join(data.auctionId);
	})

});

server.listen(process.env.PORT || 8000, () => {
	console.log("Server is running on port 8000");
});