import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const userSchema = new mongoose.Schema(
    {
        email:{type:String,requred:true,unique:true},
        name:{type:String,default:null},
        number:{type:String,default:null},
        address: {type:String,default:null},
        imageUrl: {type:String, default: null}
    },
    { timestamps: true }
)

const User = mongoose.model(MODEL_NAME.USER,userSchema);

export default User;