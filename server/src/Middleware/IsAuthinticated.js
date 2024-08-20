import apierror from "../utills/ApiError.js";

export const IsAuthenticated = (req, res, next) => {
    
    console.log("isAuthenticated: ", req.isAuthenticated());

    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).send(new apierror(401, "User is not logged in"));
    }
};
