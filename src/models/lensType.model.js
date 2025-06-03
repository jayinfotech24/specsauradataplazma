import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const lensType = new mongoose.Schema(
    {
        lensMainType: { type: String, required: true },
        name: { type: String, required: true },
        imageURL: { type: String, required: true },
        description: { type: String, required: true },
        warranty: { type: Number, default: 0},
        price: { type: Number, default: 0},
        isDelete: { type: Boolean, default: false}
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const LensType = mongoose.model(MODEL_NAME.LENS_TYPE, lensType);

export default LensType;