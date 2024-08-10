import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cropImage: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  winner: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  bids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  winnerBid: {
    type: Schema.Types.ObjectId,
    ref: "Bid",
  },
});

export const Auction = mongoose.model("Auction", AuctionSchema);
