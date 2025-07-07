import { MODEL_NAME } from "../constants/DBConst.js";
import LensType from "../models/lensType.model.js";
import Coating from "../models/coating.model.js";

export const createLnsType = async (req, res) => {
    try {
        const { lensMainType, name, imageURL, description } = req.body;

        // Manual empty checks
        if (!lensMainType?.trim()) {
            return res.status(400).json({ error: "lensMainType is required", status: 400 });
        }
        if (!name?.trim()) {
            return res.status(400).json({ error: "name is required", status: 400 });
        }

        if (!description?.trim()) {
            return res.status(400).json({ error: "description is required", status: 400 });
        }

        const lens = new LensType(req.body);
        const savedLens = await lens.save();
        res.status(201).json({ savedLens, status: 200 });
    } catch (err) {
        res.status(400).json({ error: err.message, status: 500 });
    }
}


export const getAllTypes = async (req, res) => {
    try {
        const lensTypes = await LensType.find({ isDelete: false });

        if (!lensTypes || lensTypes.length === 0) {
            return res.status(404).json({ message: "No lens types found", status: 404 });
        }

        // For each lensType, find its related coatings
        const lensTypesWithCoatings = await Promise.all(
            lensTypes.map(async (lensType) => {
                const coatings = await Coating.find({
                    lens: lensType._id,
                    isDelete: false
                });

                return {
                    ...lensType.toObject(),
                    coatings // add coatings array
                };
            })
        );

        res.status(200).json({ items: lensTypesWithCoatings, status: 200 });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500 });
    }
};

export const getSingleLensType = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters

        // Find lens type by ID
        const lensType = await LensType.findById(id);

        if (!lensType) {
            return res.status(404).json({ message: 'Lens type not found', status: 404 });
        }

        // Respond with the lens type details
        res.status(200).json({ lensType, status: 200 });
    } catch (error) {
        console.error('Error fetching lens type:', error);
        res.status(500).json({ message: 'Internal server error', status: 500 });
    }
};

export const getAllLansesForSingleType = async (req, res) => {
    try {
        const lensMainType = req.params.lensMainType?.trim();

        if (!lensMainType) {
            return res.status(400).json({ error: "lensMainType is required", status: 400 });
        }

        const lensTypes = await LensType.find({ lensMainType, isDelete: false });

        if (!lensTypes || lensTypes.length === 0) {
            return res.status(404).json({ message: "No lens types found for given lensMainType", status: 404 });
        }

        // Add coatings array for each lensType
        const lensTypesWithCoatings = await Promise.all(
            lensTypes.map(async (lensType) => {
                const coatings = await Coating.find({
                    lens: lensType._id,
                    isDelete: false
                });

                return {
                    ...lensType.toObject(),
                    coatings
                };
            })
        );

        res.status(200).json({ lensTypes: lensTypesWithCoatings, status: 200 });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500 });
    }
};

export const updateLanseType = async (req, res) => {
    try {
        const { lensMainType, name, imageURL, description } = req.body;

        // Optional field validations (only if updating these fields)
        if (lensMainType !== undefined && !lensMainType.trim()) {
            return res.status(400).json({ error: "lensMainType cannot be empty", status: 400 });
        }
        if (name !== undefined && !name.trim()) {
            return res.status(400).json({ error: "name cannot be empty", status: 400 });
        }

        if (description !== undefined && !description.trim()) {
            return res.status(400).json({ error: "description cannot be empty", status: 400 });
        }

        const updatedLens = await LensType.findOneAndUpdate(
            { _id: req.params.id, isDelete: false },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedLens) {
            return res.status(404).json({ message: "Lens type not found or already deleted", status: 404 });
        }

        res.status(200).json({ updatedLens, status: 200 });
    } catch (err) {
        res.status(400).json({ error: err.message, status: 400 });
    }
};

export const deleteLansetype = async (req, res) => {
    try {
        const deletedLens = await LensType.findOneAndUpdate(
            { _id: req.params.id, isDelete: false },
            { isDelete: true },
            { new: true }
        );

        if (!deletedLens) {
            return res.status(404).json({ message: "Lens type not found or already deleted", status: 404 });
        }

        res.status(200).json({ message: "Lens type deleted successfully", status: 200 });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500 });
    }
}