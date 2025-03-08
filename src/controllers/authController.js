import jwt from "jsonwebtoken";
import otpUser from "../models/userOTP.js";
import User from "../models/userModel.js";
import { ERROR_MESSAGE } from "../constants/api.js";

// Varify OTP 
export const verifyOTP = async (req,res) => {
    const { email,otp } = req.body;

    if (email == null || email == undefined) {
      return res.status(400).json({ message: ERROR_MESSAGE.EMAIL_REQUIRED, status: 400 });
    } else if (otp == null || otp == undefined) {
      return res.status(400).json({ message: ERROR_MESSAGE.OTP_REQUIRE, status: 400 });
    }

    try {
        const otpuser = await otpUser.findOne({ email: new RegExp(`^${email}$`, 'i') });
    
        if (!otpuser) {
          return res.status(404).json({ message: 'OTP' + ERROR_MESSAGE.USER_NOT_FOUND, status: 404 });
        }
    
        if (otpuser.otp !== otp || otpuser.otpExpires < Date.now()) {
          return res.status(501).json({ message: ERROR_MESSAGE.INVALID_OTP, status: 501 });
        }
    
        otpuser.isVarified = true;
        otpuser.otp = undefined;
        otpuser.otpExpires = undefined;
        await otpuser.save();
    
        let user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    
        if (!user) {
          user = new User({ email, undefined , undefined , undefined })
          console.log("User created Sucessfully") 
        }

        await user.save();
    
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: '48h',
        });
    
        // Respond with user details and authentication token
        res.status(200).json({
          email: user.email,
          name: user.name,
          userId: user._id,
          authToken: token,
          status:200
        });
    } catch (error) {
        res.status(501).json({ message: ERROR_MESSAGE.INVALID_OTP, status: 501 });
    }
}