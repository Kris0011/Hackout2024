import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadoncloudinary = async (localfilepath) => {
    try {
        console.log(localfilepath);
        if(!localfilepath)
            return null;
        console.log("Uploading file on cloudinary");
        const result = await cloudinary.uploader.upload(localfilepath,{resource_type: "auto"});
        console.log("File is uploaded on cloudinary",result);
        fs.unlinkSync(localfilepath);
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const deleteoncloudinary = async (publicid) => {
    await cloudinary.uploader.destroy(publicid);
};


export {uploadoncloudinary,deleteoncloudinary};