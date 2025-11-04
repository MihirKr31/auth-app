// middleware/verifyResetOtp.js
import userModel from "../models/userModel.js";

const verifyResetOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ 
      success: false, 
      message: "Email and OTP are required" 
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ 
        success: false, 
        message: "User not found" 
      });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.json({ 
        success: false, 
        message: "Invalid OTP" 
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ 
        success: false, 
        message: "OTP expired" 
      });
    }
    req.user = user;
    
    next();

  } catch (error) {
    return res.json({ 
      success: false, 
      message: error.message 
    });
  }
};

export default verifyResetOtp;
