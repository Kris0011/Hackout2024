const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  auctions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Auction",
    },
  ],
  bids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],

});

module.exports = mongoose.model("User", UserSchema);
