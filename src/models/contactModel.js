import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true},
        mobile: { type: String, required: true},
        subject: { type: String, required: false , default: null},
        message: { type: String, required: false, default: null}
    },
    { timestamps: true } // Adds createdAt and updatedAt
)

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;