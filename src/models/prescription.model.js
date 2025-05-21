import mongoose from "mongoose";
import { MODEL_NAME } from "../constants/DBConst.js";

const prescriptionSchema = new mongoose.Schema(
    {
        rightEye: {
            sphere: { type: String }, // SPH
            cylinder: { type: String }, // CYL
            axis: { type: String }, // Axis
            add: { type: String }, // Addition (for Bifocal/Progressive)
            pd: { type: String }, // Pupillary Distance
        },
        leftEye: {
            sphere: { type: String },
            cylinder: { type: String },
            axis: { type: String },
            add: { type: String },
            pd: { type: String }, // Pupillary Distance
        },
        prescriptionURL: { type: String, default: null },
        isDelete: { type: Boolean, default: false},
        isAllDataAdded: { type: Boolean, default: false},
    },
    { timestamps: true }
);

// Custom validation to enforce the conditional requirements
prescriptionSchema.pre("validate", function (next) {
    const hasRightEye = this.rightEye && Object.values(this.rightEye).some(val => val);
    const hasLeftEye = this.leftEye && Object.values(this.leftEye).some(val => val);
    const hasPrescriptionURL = !!this.prescriptionURL;

    if (!hasPrescriptionURL && !(hasRightEye || hasLeftEye)) {
        return next(new Error("Either rightEye and leftEye must be provided or prescriptionURL must be set."));
    }
    next();
});

const Prescription = mongoose.model(MODEL_NAME.PRESCRIPTION, prescriptionSchema);

export default Prescription;