import Prescription from "../models/prescription.model.js"
import { ERROR_MESSAGE } from "../constants/api.js";


export const createPrescription = async (req, res) => {
    try {
        const { rightEye, leftEye, prescriptionURL } = req.body;

        // Ensure at least one field is provided (rightEye, leftEye, or prescriptionURL)
        if (
            (!rightEye || Object.keys(rightEye).length === 0) &&
            (!leftEye || Object.keys(leftEye).length === 0) &&
            !prescriptionURL
        ) {
            return res.status(400).json({ message: "Please provide at least one prescription detail.", status: 400 });
        }

        const prescription = new Prescription({
            rightEye: rightEye || {},  // Default to empty object if not provided
            leftEye: leftEye || {},    // Default to empty object if not provided
            prescriptionURL: prescriptionURL || null
        });

        await prescription.save();

        res.status(200).json({ prescription, status: 200 });

    } catch (error) {
        console.error("Error creating prescription:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};

export const updatePrescription = async (req, res) => {
    try {
        const { id } = req.params; // Get prescription ID from URL params
        const { rightEye, leftEye, prescriptionURL } = req.body; // Get update fields

        // Ensure at least one field is provided for updating
        if (
            (!rightEye || Object.keys(rightEye).length === 0) &&
            (!leftEye || Object.keys(leftEye).length === 0) &&
            !prescriptionURL
        ) {
            return res.status(400).json({ message: "Please provide at least one field to update.", status: 400 });
        }

        const updatedPrescription = await Prescription.findByIdAndUpdate(
            id,
            {
                ...(rightEye && Object.keys(rightEye).length > 0 && { rightEye }),
                ...(leftEye && Object.keys(leftEye).length > 0 && { leftEye }),
                ...(prescriptionURL !== undefined && { prescriptionURL })
            },
            { new: true }
        );

        if (!updatedPrescription) {
            return res.status(404).json({ message: "Prescription not found.", status: 404 });
        }

        res.status(200).json({ prescription: updatedPrescription, status: 200 });

    } catch (error) {
        console.error("Error updating prescription:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};

export const deletePrescription = async (req, res) => {
    try {
        const { id } = req.params; // Get prescription ID from URL params

        if (!id) {
            return res.status(400).json({ message: "Prescription ID is required.", status: 400 });
        }

        const deletedPrescription = await Prescription.findById(id);

        if (!deletedPrescription) {
            return res.status(404).json({ message: "Prescription not found.", status: 404 });
        }

        deletedPrescription.isDelete = true

        deletedPrescription.save();

        res.status(200).json({ message: "Prescription deleted successfully.", status: 200 });

    } catch (error) {
        console.error("Error deleting prescription:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};

export const getPrescription = async (req, res) => {
    try {
        const { id } = req.params;

        const prescription = Prescription.findById(id);

        if (prescription) {
            res.status(200).json({ prescription, status: 200 });
        } else {
            res.status(400).json({ message: "Error getting Prescription", status: 400 });
        }

    } catch (error) {
        console.error("Error getting prescription:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
}