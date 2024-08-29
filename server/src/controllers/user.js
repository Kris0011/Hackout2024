import  {User } from "../models/User.js";
import apierror from "../utills/ApiError.js";

export const userLoginCallback = async (req, res) => {
    try {
        if (req.isAuthenticated()) {

            const {name,picture,email} = req.user;

            
            if(!name || !email){
                throw new apierror(400,"Please fill all the fields");
            }
            
            const existeduser = await User.find({
                email
            })
            console.log("user is present " + existeduser);

            if(existeduser.length === 0){
                const user = new User({
                    name,
                    ImageUrl : picture,
                    email
                });
                await user.save();  
                // console.log("user is created " + user);
            }
            return res.redirect("http://localhost:5173");   
           
        } 
        else 
        {
            // res.json({ loggedIn: false });
            return res.redirect("http://localhost:5173");
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}




export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

export const getUserById = async (req,res) => {
    try {
        const { id } = req.body;
        const user
            = await User.findById(id);
        return res.status(200).json({ user });
    }
    catch (error) {
        console.log(error);
        return null;
    }
}


export const getUser = async (req, res) => {
    try {
        const { email } = req.user;
        // console.log("user is present " + email);
        // console.log(req.isAuthenticated() + " " + req.user);
        if (req.isAuthenticated()) {
            const user = await User.findOne({ email });

            if (!user) {
                console.log("User not found");
                return res.status(400).json(new apierror(400, "User not found"));
            }

            return res.status(200).json({user, isAuthenticated: true});
        } else {
            return res.status(200).json(new apierror(200, "You are not logged in"));
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




