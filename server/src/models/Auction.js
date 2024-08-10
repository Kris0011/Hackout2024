const mongoose = require("mongoose");
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
  winner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  winnerBid: {
    type: Schema.Types.ObjectId,
    ref: "Bid",
  },
});

module.exports = mongoose.model("Auction", AuctionSchema);
