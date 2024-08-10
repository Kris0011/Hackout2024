import pkg from 'express-openid-connect';  
const { requiresAuth } = pkg;
import express from 'express';
import { userLoginCallback,getuser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.route("/").get(userLoginCallback);

userRouter.route("/getuser").get(getuser);



export default userRouter
