import jwt from "jsonwebtoken";
import otpUser from "../models/otp.model.js";
import User from "../models/user.model.js";
import { ERROR_MESSAGE } from "../constants/api.js";

const authMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ') ) {
        return res.status(401).json({ message: ERROR_MESSAGE.UNAUTHORIZED, status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const userOTP = otpUser.findById(decoded.userId);
        const email = userOTP.email

        if (!userOTP) {
            return res.status(401).json({ message: ERROR_MESSAGE.UNAUTHORIZED, status: 401 });
        }

        req.user = User.findOne({ email });
        next()
    } catch (error) {
        res.status(401).json({ message: ERROR_MESSAGE.UNAUTHORIZED, status: 401 });
    }
};

export default authMiddleware;