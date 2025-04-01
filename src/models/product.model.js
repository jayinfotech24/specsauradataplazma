import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, default: null },
        color: { type: String, default: null },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.CATEGORY
        },
        price: { type: Number, default: 0 },
        totalItems: { type: Number, default: 0 },
        availableItems: { type: Number, default: 0 },
        url: { type: String, default: null },
        images: { type: String, default: null }
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Product = mongoose.model(MODEL_NAME.PRODUCT, productSchema);

export default Product;