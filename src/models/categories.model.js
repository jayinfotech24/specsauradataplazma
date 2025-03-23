import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const categorySchema = new mongoose.Schema(
    {
        url:{type:String,requred:true},
        title:{type:String,required:true},
        description:{type:String,default:null}
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const category = mongoose.model(MODEL_NAME.CATEGORY,categorySchema);

export default category;