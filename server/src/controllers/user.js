import  {User } from "../models/User.js";
import ApiResponse from "../utills/ApiResponse.js";
import apierror from "../utills/ApiError.js"

export const userLoginCallback = async (req, res) => {
    try {
        if (req.oidc.isAuthenticated()) {
            // console.log(req.oidc.user);

            const {name,picture,email} = req.oidc.user;

            
            if(!name || !email){
                throw new apierror(400,"Please fill all the fields");
            }
            
            const existeduser = await User.find({
                email
            })
            // console.log("user is present " + existeduser);

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

export const getuser = async (req,res) => {
    try {
        // if (req.oidc.isAuthenticated()) {
        //     // return res.status(200).json(req.oidc.user); 
        //     const user = await User.findOne(
        //         {email:req.oidc.user.email}
        //     );
        //     if(!user){
        //         return res.status(400).json(new apierror(400,"User not found"));  
        //     }
        //     return res.status(200).json(user);
            
        // }
        // else{
        //     return res.status(200).json(new apierror(200,"You are not logged in"));  
        // }
       return res.json({loggedIn: req.oidc.isAuthenticated(), user: req.oidc.user});

        

    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}



