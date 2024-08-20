import express from 'express';
import {getAuctions ,createAuction, getAuctionById} from '../controllers/Auction.js';
import  {upload}  from '../Middleware/multer.js';
import { IsAuthenticated } from '../Middleware/IsAuthinticated.js';

const AuctionRouter= express.Router();
AuctionRouter.route('/auctions').get(IsAuthenticated,getAuctions);
AuctionRouter.route('/createauctions').post(upload.fields([
    {
        name: "cropImg",
        maxCount: 1
    }
]),IsAuthenticated, createAuction);
AuctionRouter.route('/auction').post(IsAuthenticated,getAuctionById);


export default AuctionRouter;