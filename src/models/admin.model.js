import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const AdminSchema = new mongoose.Schema(
    {
        email: { type: String, required: true},
        password: { type: String, required: true}
    },
    { timestamps: true } // Adds createdAt and updatedAt
);

const Admin = mongoose.model(MODEL_NAME.ADMIN, AdminSchema);

export default Admin;