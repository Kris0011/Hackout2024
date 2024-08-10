import { Auction } from "../models/Auction.js";
import { User } from "../models/User.js";

// import { uploadoncloudinary } from "../utills/Cloudinary.js";

import { v2 as cloudinary } from "cloudinary";
// const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createAuction = async (req, res) => {
  try {
    console.log(req.body);
    // const {
    //   title,
    //   description,
    //   startingPrice,
    //   startDate,
    //   endDate,
    //   status,
    //   seller,
    //   cropImg ,
    //   currentPrice,
    // } = req.body;
    // console.log("sd" + title+ description);

    // console.log(cropImg?.fileList[0]?.thumbUrl)
    // const cropimgurl= await uploadoncloudinary(cropImg?.fileList[0]?.thumburl);
    console.log("inside create auction " , cropImg , seller);
    let public_id = "public_id";
    let url = "url";
    let desc = "This is description";

    // console.log(req.body.cropImage.file);
    //     await cloudinary.uploader.upload(req.file.cropImage, (err, result) => {
    //         if (err) {
    //             console.log("error is " +err);
    //         }
    //         console.log(result)
    //         url = result.url;
    //         public_id = result.public_id;

    //         console.log("url : ", url);
    //         console.log("public_id : ", public_id);
    // });

    // const user = await User.find({
    //   email:seller
    // });

    // const auction = Auction.create({
    //   title,
    //   description,
    //   cropimgurl,
    //   startingPrice,
    //   currentPrice: startingPrice,
    //   startDate,
    //   endDate,
    //   status,
    //   seller : user,
    // });

    // const auctions = await auction.save();

    // user.auctions.push(auctions._id);
    // await user.save();

    // res.status(201).json({ auctions });
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
      .populate("seller")
      .populate("winner")
      .populate("bids");
    res.status(200).json({ auction });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
};
