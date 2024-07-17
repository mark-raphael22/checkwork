import { createClubService} from "../../Services/ClubService.js"
import  cloudinary from 'cloudinary';
import fs  from "fs";
import { isRequired } from "../../Helpers/isRequired.js";


export const createClubRequiredController = async (req,res, next) => {
  const {name,description,image}=req.body
  if (!isRequired(req.body, res)) return;
  return next();
};



//const data= ({name,description,image})=req.body
export const CreateController = async(req, res) =>{

    // const data= {
    //     name:req.body.name,
    //     description: req.body.description,
    //     image: req.body.image,
    // }
    const {name,description,image}=req.body

try {
  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder: "ClubService"
  })
  fs.unlinkSync(req.files.image.tempFilePath) ;
  req.body.image = result.secure_url

    // if(data){
    //   res.status(200).json({success:false,msg:"please provide neccesary information "})
    
    // }
    let club = await createClubService(req, res,req.body)
    if (club){
     return res.status(200).json({success:true, message:"club created successfully",club})
    }else{
    return  new Error("Could not create club")
    }      
} catch (error) {
    console.log(error);
}


}


