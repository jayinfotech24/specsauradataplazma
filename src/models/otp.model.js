import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const otpSchema = new mongoose.Schema(
    {
        email: { type: String, requred: true, unique: true },
        otp: { type: String },
        otpExpires: Date,
        isVarified: { type: Boolean, default: false },
        isDelete: { type: Boolean, default: false }
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const otpUser = mongoose.model(MODEL_NAME.OTP, otpSchema);

export default otpUser;