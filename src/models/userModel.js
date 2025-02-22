import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{type:String,requred:true,unique:true},
        name:{type:String,default:null},
        number:{type:String,default:null},
        address: {type:String,default:null}
    }
)

const User = mongoose.model("User",userSchema);

export default User;