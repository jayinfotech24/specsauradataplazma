import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import otpUser from "../models/otp.model.js";

// Get All users
export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find({ isDelete: false});
        res.status(200).json({users,status:200})
    } catch (error) {
        res.status(500).json({message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status:500})
    }
};


// get user by ID 
export const getUserByID = async (req,res) => {
    try {
        const user = await User.findOne({ _id:req.params.id, isDelete: false});
        if (!user) return res.status(404).json({message:ERROR_MESSAGE.USER_NOT_FOUND, status: 404})
            res.status(200).json({user , status: 200});
    } catch (error) {
        res.status(500).json({message:ERROR_MESSAGE.PROCESS_REQUEST,status: 500})
    }
}

// get user from auth token 
export const getUserInfo = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: ERROR_MESSAGE.UNAUTHORIZED, status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const mainUser = await User.findOne({ _id: decoded.userId });

        if (!mainUser) {
            return res.status(404).json({ message: ERROR_MESSAGE.USER_NOT_FOUND, status: 404 });
        }

        res.status(200).json({ mainUser, status: 200 });

    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: ERROR_MESSAGE.UNAUTHORIZED, status: 401 });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, number, address } = req.body;

        // check for email 
        if (!email) {
            return res.status(400).json({ message: ERROR_MESSAGE.EMAIL_REQUIRED, status: 400 });
        }

        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (!user) {
            return res.status(404).json({ message: ERROR_MESSAGE.USER_NOT_FOUND, status: 404 });
        }

        // update only provided fields
        if (name !== undefined) user.name = name;
        if (number !== undefined) user.number = number;
        if (address !== undefined) user.address = address;

        await user.save();

        res.status(200).json({ user, status: 200 });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
};

// create new user 
export const createUser = async (req,res) => {
    try {
        const { name,email,number,address } = req.body;

        // check for email 
        if (!email) {
            return res.status(400).json({message: ERROR_MESSAGE.EMAIL_REQUIRED, status:400});
        }

        // create new user 
        const newUser = new User({
            email,
            name: name || undefined,
            number: number || undefined,
            address: address || undefined,
        });

        await newUser.save();

        res.status(201).json({newUser, status: 201 });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findById(id);

        if (!deletedUser) {
            return res.status(404).json({ error: ERROR_MESSAGE.USER_NOT_FOUND, status: 404 });
        }

        deletedUser.isDelete = true

        await deletedUser.save();

        res.status(200).json({ message: SUCCESS_MESSAGE.USER_DELETED, status: 200 });
    } catch (error) {
        res.status(500).json({ error: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
};