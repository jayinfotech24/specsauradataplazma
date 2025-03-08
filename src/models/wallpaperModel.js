import mongoose from "mongoose";

const wallpaperSchema = new mongoose.Schema(
    {
        url:{type:String,requred:true},
        title:{type:String,default:null},
        description:{type:String,default:null}
    }
)

const wallpapers = mongoose.model("Wallpapers",wallpaperSchema);

export default wallpapers;