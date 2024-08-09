import pkg from 'express-openid-connect';  
const { requiresAuth } = pkg;

import express from 'express';
import ApiResponse from "../utills/ApiResponse.js";

const router = express.Router();

router.route("/login").get((req, res) => {
    res.status(200).send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.route("/profile").get(requiresAuth(), (req, res) => {
    res.status(200).send(new ApiResponse(req.oidc.user).toString());
});

export default router;
