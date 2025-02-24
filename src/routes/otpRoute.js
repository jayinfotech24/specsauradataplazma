import express from "express";
import { requestOTP } from "../controllers/otpController.js";
import { verifyOTP } from "../controllers/authController.js";


const otpRoute = express.Router();

otpRoute.post("/request",requestOTP);
otpRoute.post("/verify",verifyOTP);

export default otpRoute;