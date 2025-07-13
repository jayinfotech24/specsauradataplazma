import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const wallpaperSchema = new mongoose.Schema(
    {
        url: { type: String, requred: true },
        title: { type: String, default: null },
        description: { type: String, default: null },
        navigation: { type: String, default: null },
        isDelete: { type: Boolean, default: false }
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const wallpapers = mongoose.model(MODEL_NAME.WALLPAPERS, wallpaperSchema);

export default wallpapers;