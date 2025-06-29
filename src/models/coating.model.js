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
    { timestamps: true }
);

// Pre-save hook to add 2% to price
coatingSchema.pre("save", function (next) {
    if (this.isNew && typeof this.price === "number") {
        this.price = Math.round(this.price * 1.02); // add 2% and convert to INT
    }
    next();
});


const Coating = mongoose.model(MODEL_NAME.COATING, coatingSchema);

export default Coating;
