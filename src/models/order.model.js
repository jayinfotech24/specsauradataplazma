import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.USER, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.PRODUCT, required: true },
        prescription: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.PRESCRIPTION, default: null },
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            enum: ["Online"],
            required: true,
        },
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            country: { type: String, required: true },
            phone: { type: String, required: true },
        },
    },
    { timestamps: true }
);

const Order = mongoose.model(MODEL_NAME.ORDER, orderSchema);

export default Order;
