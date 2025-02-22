import { ERROR_MESSAGE } from "../constants/api.js";
import User from "../models/userModel.js";

// Get All users
export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({message: ERROR_MESSAGE.ENTITY_NOT_FOUND})
    }
};


// get user by ID 
export const getUserByID = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({message:ERROR_MESSAGE.USER_NOT_FOUND})
            res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:ERROR_MESSAGE.PROCESS_REQUEST})
    }
}

// create new user 
export const createUser = async (req,res) => {
    try {
        const { name,email,number,address } = req.body;

        // check for email 
        if (!email) {
            return res.status(400).json({message: ERROR_MESSAGE.EMAIL_REQUIRED});
        }

        // create new user 
        const newUser = new User({
            email,
            name: name || undefined,
            number: number || undefined,
            address: address || undefined,
        });

        await newUser.save();

        res.status(201).json({newUser});
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST });
    }
}