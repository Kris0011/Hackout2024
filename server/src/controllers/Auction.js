import { Auction } from "../models/Auction.js";
import { User } from "../models/User.js";

// import { uploadoncloudinary } from "../utills/Cloudinary.js";

import { v2 as cloudinary } from "cloudinary";
import { uploadoncloudinary } from "../utills/Cloudinary.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createAuction = async (req, res) => {
  // console.log(req.body);
  try {
    const {
      title,
      description,
      startingPrice,
      startDate,
      endDate,
      status,
      seller,
      cropImg,
    } = req.body;

    
    const cropImageUrl = await uploadoncloudinary("https://s.gravatar.com/avatar/71c1614625bf6ea2fa43df4257ab2893?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fkr.png");

    const user = await User.findOne({ email: seller });

    if (!user) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const auction = new Auction({
      title,
      description,
      cropImageUrl,
      startingPrice,
      currentPrice: startingPrice,
      startDate,
      endDate,
      status,
      seller: user._id,
    });

    const savedAuction = await auction.save();

    user.auctions.push(savedAuction._id);
    await user.save();

    res.status(201).json({ auction: savedAuction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate("seller").populate("winner");
    res.status(200).json({ auctions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      // .populate("seller")
      // .populate("winner")
      // .populate("bids");
    res.status(200).json({ auction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuctionById = async (req,res) => {
  try {
    const { id } = req.body;
    const auction = await Auction.findById(id);
    return res.status(200).json({ auction });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateAuction = async (req, res) => {
  try {
    const { title, description, cropImage, startingPrice, startDate, endDate } =
      req.body;
    const auction = await Auction.findById(req.params.id);

    auction.title = title;
    auction.description = description;
    auction.cropImage = cropImage;
    auction.startingPrice = startingPrice;
    auction.startDate = startDate;
    auction.endDate = endDate;

    await auction.save();

    res.status(200).json({ auction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createAuction,
  getAuctions,
  getAuction,
  updateAuction,
  getAuctionById
};
