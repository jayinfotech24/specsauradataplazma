import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import User from "../models/user.model.js";

// Get All users
export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json({users,status:200})
    } catch (error) {
        res.status(500).json({message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status:500})
    }
};


// get user by ID 
export const getUserByID = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({message:ERROR_MESSAGE.USER_NOT_FOUND, status: 404})
            res.status(200).json({user , status: 200});
    } catch (error) {
        res.status(500).json({message:ERROR_MESSAGE.PROCESS_REQUEST,status: 500})
    }
}

// create new user 
export const updateUser = async (req,res) => {
    try {
        const { name,email,number,address } = req.body;

        // check for email 
        if (!email) {
            return res.status(400).json({message: ERROR_MESSAGE.EMAIL_REQUIRED, status: 400});
        }

        if (!name || !number || !address ) {
            return res.status(400).json({message: ERROR_MESSAGE.ALL_FIELDS_REQUIRED, status: 400});
        }

        const updateUser = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (updateUser) {
            return res.status(400).json({message: ERROR_MESSAGE.USER_NOT_FOUND, status: 400});
        } else {
            updateUser.name = name
            updateUser.number = number
            updateUser.address = address
        }

        await updateUser.save();

        res.status(201).json({updateUser, status: 201 });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
}

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
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: ERROR_MESSAGE.USER_NOT_FOUND, status: 404 });
        }

        res.status(200).json({ message: SUCCESS_MESSAGE.USER_DELETED, status: 200 });
    } catch (error) {
        res.status(500).json({ error: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
};