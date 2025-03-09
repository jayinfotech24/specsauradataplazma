import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{type:String,default:null},
        color: { type: String, default: null},
        category: { type: String, default: null},
        price: { type: Number, default: 0},
        totalItems: { type: Number, default: 0},
        availableItems: { type: Number, default: 0},
        url: { type: String, default: null},
        images: { type: String, default: null}
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Product = mongoose.model("Product",productSchema);

export default Product;