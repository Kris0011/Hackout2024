import { IsAuthenticated } from '../Middleware/IsAuthinticated.js';
import express from 'express';
import { getUser , getUserById,userLoginCallback } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.route("/").get(IsAuthenticated,userLoginCallback);

userRouter.route("/getuser").get(IsAuthenticated,getUser);

userRouter.route("/getuserbyid").post(IsAuthenticated,getUserById);



export default userRouter
