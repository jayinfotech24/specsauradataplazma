import mongoose from "mongoose";

const gstRateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    gst: { type: Number, required: true },
    isDelete: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const GSTRate = mongoose.model("GSTRate", gstRateSchema);

export default GSTRate; 