import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const cartSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.USER,
        },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.PRODUCT,
        },
        lesnsType: { type: String, required: true },
        numberOfItems: { type: Number, required: true },
        lensCoating: { type: String, required: false }, 
        lensMaterial: { type: String, required: false },
        prescriptionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.PRODUCT,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Cart = mongoose.model(MODEL_NAME.CART, cartSchema);

export default Cart;