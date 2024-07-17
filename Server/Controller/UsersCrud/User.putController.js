import { isRequired } from "../../Helpers/isRequired.js";

import User from "../../Model/UserModel.js"
import bcrypt from "bcryptjs";


export const changePasswordRequiredController = (req, res, next) => {
  const data = { userID: req?.params?.userID, password: req?.body?.password };
  if (!isRequired(data, res)) return;
  return next();
};


//targetting the id of the user and then the password making sure they are present in the body 
export const changePasswordController = async (req, res) => {
  


  const {password}=req.body;
  const {email}=req.user
  // console.log(req.user);

try{
  if(!password){
    return res.status(400).json({success:false,mesage:'please provide the valid information'});
} 
  const emailExist = await User.findOne({email});
  if (!emailExist){
      return res.status(400).json({success:false,message:'Sorry Email not found'});
  }
  const salt = await bcrypt.genSalt();
  const hashpasword = await bcrypt.hash(password, salt)
  
  const user =await User.findOneAndUpdate({email}, {password:hashpasword} ,{ new: true, runValidators: true })
  if (user) return res.status(200, user).json({msg: "Password Changed!",})
  if (!user)
    return res.status(400 ).json({msg:"Oops, could not change password!", })
}catch(err){
  throw new Error(err)
}

};
