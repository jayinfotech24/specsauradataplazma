import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userID: { type: String , required: true },
        productID: { type: String, required: true },
        lesnsType: { type: String, required: true },
        numberOfItems: { type: Number, required: true },
        lensCoating: { type: String, required: false }, // Anti-glare, Blue-light filter
        lensMaterial: { type: String, required: false }, // Plastic, Polycarbonate
        prescriptionID: { type: String, required: false },
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Cart = mongoose.model("Cart",cartSchema);

export default Cart;