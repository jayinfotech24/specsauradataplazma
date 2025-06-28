import Coating from "../models/coating.model.js";

// GET all coating types
export const getAllCoatings = async (req, res) => {
    try {
        const coatings = await Coating.find({ isDelete: false }).populate('lens');
        res.status(200).json({ items: coatings, status: 200 });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500 });
    }
};

export const getSingleCoating = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters

        // Find coating by ID
        const coating = await Coating.findById(id);

        if (!coating) {
            return res.status(404).json({ message: 'Coating not found', status: 404 });
        }

        // Respond with the coating details
        res.status(200).json({ coating, status: 200 });
    } catch (error) {
        console.error('Error fetching coating:', error);
        res.status(500).json({ message: 'Internal server error', status: 500 });
    }
};

// GET all coatings for a specific lens type
export const getAllCoatingForSingleTypeLens = async (req, res) => {
    try {
        const { lensMainType } = req.params;

        if (!lensMainType) {
            return res.status(400).json({ error: "lensMainType is required", status: 400 });
        }

        const coatings = await Coating.find({ lens: lensMainType, isDelete: false }).populate('lens');

        if (!coatings || coatings.length === 0) {
            return res.status(404).json({ message: "No coatings found for given lens type", status: 404 });
        }

        res.status(200).json({ items: coatings, status: 200 });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500 });
    }
};

// POST create a new coating
export const createCoating = async (req, res) => {
    try {
        const { title, description, isDelete, lens, price } = req.body;

        if (!title || !lens || !price) {
            return res.status(400).json({ error: "Title, price and lens are required", status: 400 });
        }

        const newCoating = new Coating({ title, description, isDelete, price, lens });
        await newCoating.save();

        res.status(201).json({ message: "Coating created successfully", coating: newCoating, status: 201 });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500 });
    }
};

// PATCH update coating by ID
export const updateCoating = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedCoating = await Coating.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCoating) {
            return res.status(404).json({ error: "Coating not found", status: 404 });
        }

        res.status(200).json({ message: "Coating updated", coating: updatedCoating, status: 200 });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500 });
    }
};

// DELETE (soft delete) coating by ID
export const deleteCoating = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Coating.findByIdAndUpdate(id, { isDelete: true }, { new: true });

        if (!deleted) {
            return res.status(404).json({ error: "Coating not found", status: 404 });
        }

        res.status(200).json({ message: "Coating deleted", coating: deleted, status: 200 });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500 });
    }
};