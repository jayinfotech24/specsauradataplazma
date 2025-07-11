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
        lensType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.LENS_TYPE,
            default: null
        },
        numberOfItems: { type: Number, required: true, min: 1 },
        lensCoating: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.COATING,
            default: null
        },
        lensMaterial: { type: String, default: null },
        prescriptionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.PRESCRIPTION,
            default: null
        },
        isDelete: { type: Boolean, default: false },
        isAllDataAdded: { type: Boolean, default: false }
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Cart = mongoose.model(MODEL_NAME.CART, cartSchema);

export default Cart;