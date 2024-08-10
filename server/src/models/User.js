import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ImageUrl: {
    type: String,
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

export const User = mongoose.model("User", UserSchema);