import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import otpUser from "../models/userOTP.js";
import { generateOTPTemplate } from "../constants/otpTemplate.js"
import crypto from "crypto";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// Generate OTP
const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    return otp;
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {

    const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: process.env.CLIENT_REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAUTH2',
            user: process.env.SENDER_MAIL,  //set these in your .env file
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.CLIENT_REFRESH_TOKEN,
            accessToken: accessToken,
            expires: 3599
        }
    })

    let htmlTemp = generateOTPTemplate(otp)

    const emailOtpData = {
        from: "no-reply@SpecsAura",
        to: email,
        subject: `SpeacAura Login OTP for ${new Date().toLocaleDateString()}`,
        html: htmlTemp,
    };

    try {
        const result = await transport.sendMail(emailOtpData);
        return result
    } catch (error) {
        return error
    }
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
        await sendOTPEmail(email, otp).then(result => {
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