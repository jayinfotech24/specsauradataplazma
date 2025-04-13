import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.USER, required: true },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: MODEL_NAME.PRODUCT,
                    required: true,
                },
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: MODEL_NAME.CART,
                    required: true,    
                },
                prescription: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: MODEL_NAME.PRESCRIPTION,
                    default: null,
                },
                quantity: { type: Number, required: true, min: 1 },
            }
        ],

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

        isDelete: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Order = mongoose.model(MODEL_NAME.ORDER, orderSchema);

export default Order;
