import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
    {
        rightEye: {
            sphere: { type: String, required: false }, // SPH
            cylinder: { type: String, required: false }, // CYL
            axis: { type: String, required: false }, // Axis
            add: { type: String, required: false }, // Addition (for Bifocal/Progressive)
        },
        leftEye: {
            sphere: { type: String, required: false },
            cylinder: { type: String, required: false },
            axis: { type: String, required: false },
            add: { type: String, required: false },
        },
        pd: { type: String, required: false }, // Pupillary Distance
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;