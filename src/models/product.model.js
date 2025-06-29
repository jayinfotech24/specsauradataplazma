import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, default: null },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAME.CATEGORY
        },
        price: { type: Number, default: 0 },
        totalItems: { type: Number, default: 0 },
        availableItems: { type: Number, default: 0 },
        url: { type: String, default: null },
        images: [{ type: String, default: [] }],
        isDelete: { type: Boolean, default: false },
        description: { type: String, default: null },
        brandName: { type: String, default: null },
        modelNo: { type: String, default: null },
        productID: { type: String, default: null },
        frameWidth: { type: Number, default: 0 },
        frameHeight: { type: Number, default: 0 },
        frameDimention: { type: String, default: null },
        frameColor: { type: String, default: null },
        lensColor: { type: String, default: null },
        templeColor: { type: String, default: null },
        frameMaterial: { type: String, default: null },
        lens: { type: String, default: null },
        powerSunglasses: { type: Boolean, default: false },
        gender: { type: String, default: "MALE" },
        warranty: { type: String, default: null }
    },
    { timestamps: true }
);

// Add 2% to price (as INT) only on creation
productSchema.pre("save", function (next) {
    if (this.isNew && typeof this.price === "number") {
        this.price = Math.round(this.price * 1.02);
    }
    next();
});

const Product = mongoose.model(MODEL_NAME.PRODUCT, productSchema);

export default Product;
