import pkg from 'express-openid-connect';  
const { requiresAuth } = pkg;
import express from 'express';
import ApiResponse from "../utills/ApiResponse.js";
import { fetchuser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.route("/").get(fetchuser);


export default userRouter
