import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import otpUser from "../models/userOTP.js";
import { generateOTPTemplate } from "../constants/otpTemplate.js"
import crypto from "crypto";
import axios from "axios";

// Generate OTP
const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    return otp;
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {

    let htmlTemp = generateOTPTemplate(otp)

    const emailOtpData = {
        sender: { name: "SpecsAura", email: process.env.SENDER_MAIL},
        to: [{ email: email }],
        subject: `Speacaura Login OTP for ${ new Date().toLocaleDateString() }`,
        htmlContent: htmlTemp,
      };

      try {
        await axios.post('https://api.brevo.com/v3/smtp/email', emailOtpData, {
            headers: { 'api-key': process.env.BREVO_EMAIL_API_KEY },
          });

          console.log("email sent successfully")
      } catch (error) {
        console.warn("Error sending email")
        console.log(error)
      }
};

export const requestOTP = async (req,res) => {
    const { email } = req.body;

    try {
        const otp = generateOTP();
        const otpExpires = Date.now() + 2 * 60 * 1000; // OTP valid for 2 minutes

        let user = await otpUser.findOne({ email });
        if (user) {
            user.otp = otp
            user.otpExpires = otpExpires
        } else {
            user = new otpUser({ email, otp, otpExpires });
        }

        await user.save();
        await sendOTPEmail(email,otp);

        res.status(200).json({message: SUCCESS_MESSAGE.OTP_SENT });
    } catch (error) {
        res.status(500).json({message: ERROR_MESSAGE.OTP_ERROR });
        console.log(error)
    }
}