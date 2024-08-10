import express from 'express';
import {getAuctions } from '../controllers/Auction.js';

const AuctionRouter= express.Router();
AuctionRouter.route('/auctions').get(getAuctions);


export default AuctionRouter;