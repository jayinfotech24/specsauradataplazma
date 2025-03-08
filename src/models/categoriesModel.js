import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        url:{type:String,requred:true},
        title:{type:String,required:true},
        description:{type:String,default:null}
    }
)

const category = mongoose.model("Category",categorySchema);

export default category;