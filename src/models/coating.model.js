import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const coatingSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: null },
        isDelete: { type: Boolean, default: false },
        price: { type: Number, default: 0 },
        lens: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.LENS_TYPE
        }
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Coating = mongoose.model(MODEL_NAME.COATING, coatingSchema);

export default Coating;