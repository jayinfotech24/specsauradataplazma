import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const prescriptionSchema = new mongoose.Schema(
    {
        rightEye: {
            sphere: { type: String, required: false }, // SPH
            cylinder: { type: String, required: false }, // CYL
            axis: { type: String, required: false }, // Axis
            add: { type: String, required: false }, // Addition (for Bifocal/Progressive)
            pd: { type: String, required: false }, // Pupillary Distance
        },
        leftEye: {
            sphere: { type: String, required: false },
            cylinder: { type: String, required: false },
            axis: { type: String, required: false },
            add: { type: String, required: false },
            pd: { type: String, required: false }, // Pupillary Distance
        },
        prescriptionURL: { type:String, default: null },
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Prescription = mongoose.model(MODEL_NAME.PRESCRIPTION, prescriptionSchema);

export default Prescription;