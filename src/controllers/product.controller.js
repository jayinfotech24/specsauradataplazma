import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDelete: false});
        res.status(200).json({ products, status: 200 })
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, color, category, price, totalItems, availableItems, url, images, description } = req.body;

        // create new user 
        const product = new Product({
            name: name || undefined,
            color: color || undefined,
            category: category || undefined,
            price: price || undefined,
            totalItems: totalItems || undefined,
            availableItems: availableItems || undefined,
            url: url || undefined,
            images: images || undefined,
            description: description || undefined
        });

        await product.save();

        res.status(201).json({ product, status: 201 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
}

export const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, color, category, price, totalItems, availableItems, url, images, description } = req.body;

        let product = await Product.findById(id); // Await the query

        if (!product) {
            return res.status(404).json({ message: "Product not found", status: 404 });
        }

        // Update only provided fields
        if (name) product.name = name;
        if (color) product.color = color;
        if (category) product.category = category;
        if (price) product.price = price;
        if (totalItems) product.totalItems = totalItems;
        if (availableItems) product.availableItems = availableItems;
        if (url) product.url = url;
        if (images) product.images = images;
        if (description) product.description = description;

        await product.save(); // Save changes

        res.status(200).json({ message: "Product updated successfully", product });

        res.status(201).json({ product, status: 201 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findById(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: ERROR_MESSAGE.PRODUCT_NOT_FOUND, status: 404 });
        }

        deletedProduct.isDelete = true

        await deletedProduct.save()

        res.status(200).json({ message: SUCCESS_MESSAGE.PRODUCT_DELETE, status: 200 });
    } catch (error) {
        res.status(500).json({ error: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: ERROR_MESSAGE.PRODUCT_NOT_FOUND, status: 404 });
        }

        res.status(200).json({ product , status: 200 });
    } catch (error) {
        res.status(500).json({ error: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
};