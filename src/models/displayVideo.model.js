import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const videoSchema = new mongoose.Schema(
    {
        url:{type:String,requred:true},
        title:{type:String,required:true}
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const DisplayVideo = mongoose.model(MODEL_NAME.DISPLAYVIDEO,videoSchema);

export default DisplayVideo;