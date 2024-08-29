import express from "express";
import cors from "cors";
import userRouter from "./Routes/userRouter.js";
import http from "http";
import { Server } from "socket.io";
import AuctionRouter from "./Routes/AuctionRouter.js";
import { Auction } from "./models/Auction.js";
import passport from "passport";
import session from "express-session";
import "./utills/auth.js";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || '---------KrisPatel---------';

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


app.use(session({ secret: 'cats', resave: false, saveUninitialized: true })); 
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", userRouter);
app.use("/api", AuctionRouter);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));


app.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/auth/failure",
}), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });
  req.isAuthenticated = true;

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.redirect("http://localhost:5173");
});


app.get("/auth/failure", (req, res) => {
  res.send("Failed to login");
});

app.get("/logout", (req, res) => {
  res.clearCookie('jwt', { path: '/' });
  res.status(200).send("Logged out successfully");
});


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("join-room", (data) => {
    console.log("Join Auction", data);
    socket.join(data.auctionId);
  });

  socket.on("placeBid", async (data) => {
    console.log(data.bidAmount);

    const currentAuction = await Auction.findById(data.auction._id);
    console.log(currentAuction);

    if (!currentAuction) {
      console.error(`Auction with ID ${data.auction._id} not found`);
      return;
    }

    // Update auction's current price
    currentAuction.currentPrice += data.bidAmount;

    // Uncomment if you have a User model and want to update the winner
    // const bidder = await User.findById(data.bidder._id);
    // if (bidder) {
    //   currentAuction.winner = bidder._id;
    // }

    await currentAuction.save();

    io.to(data.auction._id).emit("updateAuction", {
      updatedAuction: currentAuction,
      newBidder: data.bidder,
    });
  });
});

export { server };
