const Auction = require("../models/Auction");
const User = require("../models/User");
const Bid = require("../models/Bid");

exports.createAuction = async (req, res) => {
  try {
    const { title, description, cropImage, startingPrice, startDate, endDate } =
      req.body;
    const seller = req.user.id;

    const auction = new Auction({
      title,
      description,
      cropImage,
      startingPrice,
      currentPrice: startingPrice,
      startDate,
      endDate,
      status: "active",
      seller,
    });

    await auction.save();

    const user = await User.findById(seller);
    user.auctions.push(auction._id);
    await user.save();

    res.status(201).json({ auction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate("seller").populate("winner");
    res.status(200).json({ auctions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAuction = async (req, res) => {
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

exports.updateAuctionByBid = async (req, res) => {
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

exports.updateAuction = async (req, res) => {
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
