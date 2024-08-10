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
    publicId : String,
    url : String,
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
  bidPrice: {
    type: Number,
    required: true,
  },
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
