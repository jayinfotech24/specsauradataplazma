import { google } from "googleapis";
import nodemailer from "nodemailer";

// Send OTP via email
export const sendOTPEmail = async (email, htmlTemp) => {

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