import GSTRate from "../models/gstRate.model.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";

// Create a new GST Rate
export const createGSTRate = async (req, res) => {
  try {
    const { name, gst } = req.body;
    const gstRate = new GSTRate({ name, gst });
    await gstRate.save();
    res.status(201).json({ gstRate, status: 201 });
  } catch (error) {
    res.status(500).json({ message: error.message || ERROR_MESSAGE.ENTITY_NOT_CREATED, status: 500 });
  }
};

// Get all GST Rates
export const getAllGSTRates = async (req, res) => {
  try {
    const gstRates = await GSTRate.find({ isDelete: false });
    res.status(200).json({ items: gstRates, status: 200 });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
  }
};

// Get GST Rate by ID
export const getGSTRateById = async (req, res) => {
  try {
    const { id } = req.params;
    const gstRate = await GSTRate.findOne({ _id: id, isDelete: false });
    if (!gstRate) {
      return res.status(404).json({ message: "GST Rate not found", status: 404 });
    }
    res.status(200).json({ gstRate, status: 200 });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
  }
};

// Update GST Rate
export const updateGSTRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gst } = req.body;
    const gstRate = await GSTRate.findOne({ _id: id, isDelete: false });
    if (!gstRate) {
      return res.status(404).json({ message: "GST Rate not found", status: 404 });
    }
    if (name !== undefined) gstRate.name = name;
    if (gst !== undefined) gstRate.gst = gst;
    await gstRate.save();
    res.status(200).json({ gstRate, status: 200 });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_UPDATED, status: 500 });
  }
};

// Delete GST Rate (soft delete)
export const deleteGSTRate = async (req, res) => {
  try {
    const { id } = req.params;
    const gstRate = await GSTRate.findById(id);
    if (!gstRate) {
      return res.status(404).json({ message: "GST Rate not found", status: 404 });
    }
    gstRate.isDelete = true;
    await gstRate.save();
    res.status(200).json({ message: SUCCESS_MESSAGE.ENTITY_DELETED || "GST Rate soft deleted", status: 200 });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_DELETED, status: 500 });
  }
}; 