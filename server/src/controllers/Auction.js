import { Auction } from "../models/Auction.js";
import { User } from "../models/User.js";
import { Bid } from "../models/Bid.js";
import { uploadoncloudinary } from "../utills/Cloudinary.js";

const createAuction = async (req, res) => {

  try {
    console.log(req.body);
    const { title, description, cropImg, startingPrice,currentPrice, startDate, endDate,status,sellers} = req.body;
    console.log("sd" + title+ description);

    const seller = await User.find({
      email:sellers
    });
    
    console.log(cropImg?.fileList[0]?.thumbUrl)
    const cropimgurl= await uploadoncloudinary(cropImg?.fileList[0]?.thumburl);

    const auction = Auction.create({
      title,
      description,
      cropimgurl,
      startingPrice,
      currentPrice: startingPrice,
      startDate,
      endDate,
      status,
      seller,
    });

    const auctions = await auction.save();

    const user = await User.find({
      email:sellers
    });
    user.auctions.push(auctions._id);
    await user.save();

    res.status(201).json({ auctions });
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate("seller").populate("winner");
    res.status(200).json({ auctions });
  } 
  catch (error)
  {
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

const updateAuctionByBid = async (req, res) => {
    try {
        const { amount } = req.body;
        const auction = await Auction.findById(req.params.id).populate("bids");
    
        if (auction.status === "closed") {
        return res.status(400).json({ message: "Auction is closed" });
        }
    
        if (amount <= auction.currentPrice) {
        return res
            .status(400)
            .json({ message: "Bid amount should be greater than current price" });
        }
    
        const bid = new Bid({
        amount,
        bidder: req.user.id,
        });
    
        await bid.save();
    
        auction.bids.push(bid._id);
        auction.currentPrice = amount;
        await auction.save();
    
        const user = await User.findById(req.user.id);
        user.bids.push(bid._id);
        await user.save();

        res.status(200).json({ auction });

        if (new Date() > auction.endDate) {
            auction.status = "closed";
            await auction.save();
        
            const winnerBid = await Bid.findOne({ amount: auction.currentPrice });
        
            if (winnerBid) {
            const winner = await User.findById(winnerBid.bidder);
            auction.winner = winner._id;
            auction.winnerBid = winnerBid._id;
            await auction.save();
        
            winner.bids.push(winnerBid._id);
            winner.save();
            }
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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

export { createAuction, getAuctions, getAuction, updateAuctionByBid, updateAuction };