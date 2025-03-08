import express from "express";
import { requestOTP } from "../controllers/otpController.js";
import { verifyOTP } from "../controllers/authController.js";
import { getAllUsers,getUserByID,createUser,updateUser } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";


const globalRoute = express.Router();

// OTP ROUTE
globalRoute.post("/request",requestOTP);
globalRoute.post("/verify",verifyOTP);

// USER ROUTE
globalRoute.get("/all",authMiddleware,getAllUsers);
globalRoute.get("/:id",authMiddleware,getUserByID);
globalRoute.post("/create",createUser);
globalRoute.post("/update",updateUser);

export default globalRoute;