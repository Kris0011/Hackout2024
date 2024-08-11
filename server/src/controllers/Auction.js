import { Auction } from "../models/Auction.js";
import { User } from "../models/User.js";
import { uploadoncloudinary } from "../utills/Cloudinary.js";
 
const createAuction = async (req, res) => {
  console.log(req.body);
  try {
    const {
      title,
      description,
      startingPrice,
      startDate,
      endDate,
      status,
      sellers
    } = req.body;

    console.log(req.files.cropImg[0].path);
    const local = await uploadoncloudinary(req.files.cropImg[0].path);

    // console.log(req.body)
    // console.log(sellers)
    console.log(local);
    const user = await User.find({ email: sellers });

    // const cropImg = req.files ? req.file.filename : null;

    const auction = new Auction({
      title,
      description,
      cropImage: local.url,
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
