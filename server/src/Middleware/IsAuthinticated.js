import jwt from 'jsonwebtoken';
import apierror from "../utills/ApiError.js";

const JWT_SECRET = process.env.JWT_SECRET || '---------KrisPatel---------';

export const IsAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send(new apierror(401, "User is not logged in"));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send(new apierror(401, "Invalid token"));
    }
};
