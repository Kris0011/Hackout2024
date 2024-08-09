import  {User } from "../models/User.js";
import ApiResponse from "../utills/ApiResponse.js";
import apierror from "../utills/ApiError.js"

const fetchuser = async (req, res) => {
    try {
        if (req.oidc.isAuthenticated()) {
            console.log(req.oidc.user);

            const {name,picture,email} = req.oidc.user;

            // console.log(name,picture,email);
            if(!name || !email){
                throw new apierror(400,"Please fill all the fields");
            }
            
            const existeduser = await User.find({
                email
            })
            console.log(existeduser);

            if(!existeduser){
                const user = await User.create(
                    {name,
                    picture,
                    email}
                )   
                return res.status(200).json(new ApiResponse(200,"User registered successfully",{user}));  

            }
            else{
                return res.status(200).json(new ApiResponse(200,"User registered successfully",{existeduser}));   
            }
           
        } 
        else 
        {
            return res.status(200).json(new apierror(200,"Logout is Succesfull"));  
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}




export {fetchuser}