import {
    VerifyOtpService,
    forgotPasswordService,
  } from "../../Services/PaswordResetService.js";
  

  //making sure the password service and the otp  is present in the request .body 
  import { isRequired } from "../../Helpers/isRequired.js";
  export const passwordRequiredController = async (req, res, next) => {
    const { email } = req?.body
    if (!isRequired({ email: email }, res)) return;
    return next();
  };
  
  export const forgotPasswordController = async (req, res, next) => {
    let otp = await forgotPasswordService({ email: req?.body?.email });
 
    if (otp) res.status(200).json({ message: "OTP sent successfully" });
    if (!otp) res.status(400).json({ message: "Could not generate OTP, please contact support" });
      };
  
  export const verifiedOtpRequiredController = (req, res, next) => {
    if (!isRequired({ otp: req?.body?.otp, email: req?.body?.email }, res)) 
      return false;
    return next();
  };
  
  export const verifyOtpController = async (req, res, next) => {
    let verifiedOtp = await VerifyOtpService(
      { otp: req?.body?.otp, email: req?.body?.email },
    
    );
    if (verifiedOtp === true) return res.status(200,).json({message: "Otp Verified!",})
    if (verifiedOtp === false)
      return res.status(400,  ).json({message:"Oops, OTP expired, request another!",})
  };
  
