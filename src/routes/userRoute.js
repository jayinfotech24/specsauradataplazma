import express from "express";
import { getAllUsers,getUserByID,createUser,updateUser } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.get("/all",authMiddleware,getAllUsers);
userRoute.get("/:id",authMiddleware,getUserByID);
userRoute.post("/create",createUser);
userRoute.post("/update",updateUser);

export default userRoute;