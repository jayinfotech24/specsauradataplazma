import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import category from "../models/categories.model.js";


// Category Management 
export const getAllcategory = async (req,res) => {
    try {

        const categories = await category.find();
        res.status(200).json({ items: categories , status: 200 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const getCategoryByID = async (req,res) => {
    try {

        const { id } = req.param
        const cat = await category.findById(id);
        res.status(200).json(cat);

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const createCategory = async (req, res) => {
    try {

        const { url, title, description } = req.body;

        const cat = new category({
            url: url,
            title: title,
            description: description
        });

        await cat.save();

        res.status(200).json({ cat, status: 200 })

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const updateCategory = async (req, res) => {
    try {

        const { id } = req.param
        const { url, title, description } = req.body;

        let cat = await category.findById(id);

        if (!cat) {
            return res.status(404).json({ message: "Category not found", status: 404 });
        }

        // Update only provided fields
        if (url) cat.url = url;
        if (title) cat.title = title;
        if (description) cat.description = description;

        await cat.save();

        res.status(200).json({ cat, status: 200 })

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const deleteCategory = async (req, res) => {
    try {

        const { id } = req.param

        let cat = await category.findByIdAndDelete(id);

        if (!cat) {
            return res.status(404).json({ message: "category not found", status: 404 });
        }

        res.status(200).json({ message: SUCCESS_MESSAGE.CATEGORY_DELETE, status: 200 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}