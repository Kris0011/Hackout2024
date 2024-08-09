import pkg from 'express-openid-connect';  
const { requiresAuth } = pkg;

import express from 'express';
import ApiResponse from "../utills/ApiResponse.js";

const userRouter = express.Router();

userRouter.route("/callback").get(async (req, res) => {
    console.log("HII");
    if (req.oidc.isAuthenticated()) {
        const { sub, name, email } = req.oidc.user;

        // Check if user already exists
        // let user = await User.findOne({ sub });

        // if (!user) {
        //     // Create a new user if they don't exist
        //     user = new User({ sub, name, email });
        //     await user.save();
        // }

        // console.log("User data stored/verified in DB:", user);
        return res.status(200).send('Logged in and user data stored');
    } else {
        return res.status(401).send('Not authenticated');
    }
});
userRouter.route("/getuser").get((req,res)=>{
    console.log(req.oidc.user);
    return res.status(200).send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');

})

userRouter.route("/profile").get(requiresAuth(), (req, res) => {
    return res.status(200).send(new ApiResponse(req.oidc.user).toString());
});

export default userRouter
