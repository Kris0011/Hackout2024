import express from 'express';
import {getAuctions ,createAuction, getAuctionById} from '../controllers/Auction.js';
import { isAuthenticated } from '../Middleware/IsAuthinticated.js';
import { upload } from '../Middleware/multer.js';

const AuctionRouter= express.Router();
AuctionRouter.route('/auctions').get(getAuctions);
AuctionRouter.route('/createauctions').post(isAuthenticated,createAuction);
AuctionRouter.route('/auction').post(isAuthenticated,getAuctionById);
AuctionRouter.route('/createauctions').post(isAuthenticated,upload.fields({
    name:"urlimg",
    maxCount:1
}),createAuction);


export default AuctionRouter;