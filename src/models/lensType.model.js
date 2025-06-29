import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const lensType = new mongoose.Schema(
    {
        lensMainType: { type: String, required: true },
        name: { type: String, required: true },
        imageURL: { type: String, default: null },
        description: { type: String, required: true },
        warranty: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        isDelete: { type: Boolean, default: false },
        isCoating: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Pre-save hook to add 2% to price on creation only
lensType.pre("save", function (next) {
    if (this.isNew && typeof this.price === "number") {
        this.price = Math.round(this.price * 1.02); // Add 2% and round to INT
    }
    next();
});

const LensType = mongoose.model(MODEL_NAME.LENS_TYPE, lensType);

export default LensType;