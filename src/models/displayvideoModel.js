import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        url:{type:String,requred:true},
        title:{type:String,required:true}
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const DisplayVideo = mongoose.model("DisplayVideo",videoSchema);

export default DisplayVideo;