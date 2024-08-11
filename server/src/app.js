import express from "express";
import cors from "cors";
import { auth } from "express-openid-connect";
import userRouter from "./Routes/userRouter.js";
import http from "http";
import { Server } from "socket.io";
import AuctionRouter from "./Routes/AuctionRouter.js";
import { Auction } from "./models/Auction.js";
import { User } from "./models/User.js";

const app = express();

const server = http.createServer(app);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: "http://localhost:3000",
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISUSERBASEURL,
};

app.use(auth(config));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", userRouter);
app.use("/api", AuctionRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("join-room", (data) => {
    console.log("Join Auction", data);
    socket.join(data.auctionId);
  });

  socket.on("placeBid", async (data) => {
    console.log(data.bidAmount);

    // const currentAuction = await Auction.findById(data.auction._id);
    const currentAuction = await Auction.findById(data.auction._id);
    // console.log(data);

    console.log(currentAuction);

    if (!currentAuction) {
      console.error(`Auction with ID ${data.auction._id} not found`);
      return;
    }

    if (currentAuction) {
      currentAuction.currentPrice += data.bidAmount;

    //   const bidder = await User.findById(data.bidder._id);
    //   // console.log(data.bidder);
    //   console.log(bidder);
    //  if(bidder){
    //    currentAuction.winner = bidder._id;
    //  }
    }

    await currentAuction.save();



    io.to(data.auction._id).emit("updateAuction", {
      updatedAuction: currentAuction,
      newBidder: data.bidder,
    });
  });
});

export { server };
