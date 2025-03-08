import express from "express";
import { requestOTP } from "../controllers/otpController.js";
import { verifyOTP } from "../controllers/authController.js";
import { getAllUsers,getUserByID,createUser,updateUser, deleteUser } from "../controllers/userController.js"
import { getReference } from "../controllers/referenceController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const globalRoute = express.Router();

// REFERENCE ROUTE
globalRoute.get("/reference",getReference);

// OTP ROUTE
globalRoute.post("/request",requestOTP);
globalRoute.post("/verify",verifyOTP);

// USER ROUTE
globalRoute.get("/all",authMiddleware,getAllUsers);
globalRoute.get("/:id",authMiddleware,getUserByID);
globalRoute.delete("/:id",authMiddleware,deleteUser);
globalRoute.post("/create",createUser);
globalRoute.post("/update",updateUser);

export default globalRoute;