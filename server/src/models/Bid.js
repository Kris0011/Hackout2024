const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  auction: {
    type: Schema.Types.ObjectId,
    ref: "Auction",
  },
});
