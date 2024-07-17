import  User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";

export const changePasswordService = async (data, password) => {
  try {
    let user = await User.findOne(data);
    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, 10,salt);
    user.password = hashedPassword;
    user = await user.save();
    return user;
  } catch (error) {
    console.log(error)
    return false;
  }
};  