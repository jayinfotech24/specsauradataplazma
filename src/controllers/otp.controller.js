import crypto from "crypto";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import otpUser from "../models/otp.model.js";
import { sendEmail } from "./mail.controller.js";
import { generateOTPTemplate } from "../constants/otpTemplate.js"

// Generate OTP
const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    return otp;
};

export const requestOTP = async (req, res) => {
    const { email } = req.body;

    if (email == null || email == undefined) {
        return res.status(400).json({ message: ERROR_MESSAGE.EMAIL_REQUIRED, status: 400 });
    }

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
        let htmlTemp = generateOTPTemplate(otp)

        await sendEmail(email, htmlTemp).then(result => {
            res.status(200).json({ message: SUCCESS_MESSAGE.OTP_SENT, status: 200 });
        }).catch(error => {
            res.status(500).json({ message: ERROR_MESSAGE.OTP_ERROR, status: 500 });
            console.log(error)
            console.error(error.message)
        })

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.OTP_ERROR, status: 500 });
        console.log(error)
        console.error(error.message)
    }
}