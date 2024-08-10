import express from 'express';
import {getAuctions ,createAuction} from '../controllers/Auction.js';
import { isAuthenticated } from '../Middleware/IsAuthinticated.js';

const AuctionRouter= express.Router();
AuctionRouter.route('/auctions').get(getAuctions);
AuctionRouter.route('/createauctions').post(isAuthenticated,createAuction);


export default AuctionRouter;