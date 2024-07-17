import { OtpModel } from "../Model/OtpModel.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import sendMailService from "../Services/MailService.js";
import User from "../Model/UserModel.js";
 
 export const checkExpiry = async (time) => {
    const currentTime = new Date();
    const otpTime = new Date(time);
  
    // Check if the provided time is still valid (e.g., not expired)
    if (otpTime > currentTime) {
      // Do something with the generated OTP, like sending it to the user
      return { otp, isValid: true };
    } else {
      if (currentTime < otpTime) return { isValid: false };
    }
  };
  
  //to generate charaters for the otp
  async function generateOTPFunc() {
    const generateOTP = await otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    return generateOTP;
  }
  
  //getting the otp service after being generated and then create the model for otp.andsave
  async function saVeOtp(time, email) {
    const otp = await generateOTPFunc();
    const otpData = await OtpModel.create({ email, expiry: time, otp });
    return otpData;
  }
  
  //In

  export const verifyTokenService = async (token) => {
    try {
      let tokenObj = await TokenModel.findOne({ token });
      if (!tokenObj) {
        throw new Error("Token is not valid.");
      }
      if (tokenObj.status === "VERIFIED") {
        throw new Error("Token has already been verified.");
      }
      if (new Date(tokenObj.expiry) < new Date()) {
        throw new Error("Token has expired.");
      }
      tokenObj.status = "VERIFIED";
      await tokenObj.save();
      return tokenObj.toObject();
    } catch (error) {
      throw error;
    }
  };
  
  // verify the otp service is available hasnt expired
  export const VerifyOtpService = async (data, res) => {
    try {
      const { otp, email } = data;
      let storedOtp = await OtpModel.findOne({ email: email });
      const isExpired = await checkExpiry(storedOtp.expiry);
      const isMatch = await bcrypt.compareSync(otp, storedOtp.otp);
      if (isMatch === true && isExpired === false) return true;
      if (
        (isMatch === false && isExpired === true) ||
        (isMatch === true && isExpired === false) ||
        (isMatch === true && isExpired === true)
      )
        return false;
    } catch (error) {
      return res.status(400).json({ message: error._message });
    }
  };
  