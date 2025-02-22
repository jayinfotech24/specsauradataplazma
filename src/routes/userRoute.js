import express from "express";
import { getAllUsers,getUserByID,createUser } from "../controllers/userController.js"

const userRoute = express.Router();

userRoute.get("/",getAllUsers);
userRoute.get("/:id",getUserByID);
userRoute.post("/",createUser);

export default userRoute;