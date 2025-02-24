import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email:{type:String,requred:true,unique:true},
        otp:{type:String},
        otpExpires: Date,
        isVarified: {type:Boolean,default:false}
    }
)

const otpUser = mongoose.model("OTP",otpSchema);

export default otpUser;