import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const BLOGSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        isDelete: { type: Boolean, default: false},
        description: { type: String, required: true},
        writerName: { type: String, required: true },
        url: { type: String, required: true }
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Blog = mongoose.model(MODEL_NAME.BLOGS, BLOGSchema);

export default Blog;