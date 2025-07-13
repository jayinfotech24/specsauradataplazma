import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDelete: false }).populate('category').exec();
        res.status(200).json({ products, status: 200 })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, color, category, price, totalItems, availableItems, url, images, description, brandName, modelNo, productID, frameWidth, frameHeight, frameDimention, frameColor, lensColor, templeColor, frameMaterial, lens, powerSunglasses, gender, warranty, collection_type } = req.body;

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
            description: description || undefined,
            brandName: brandName || undefined,
            modelNo: modelNo || undefined,
            productID: productID || undefined,
            frameWidth: frameWidth || 0,
            frameHeight: frameHeight || 0,
            frameDimention: frameDimention || undefined,
            frameColor: frameColor || undefined,
            lensColor: lensColor || undefined,
            templeColor: templeColor || undefined,
            frameMaterial: frameMaterial || undefined,
            lens: lens || undefined,
            powerSunglasses: powerSunglasses || false,
            gender: gender || 'MALE',
            warranty: warranty || undefined,
            collection_type: collection_type || undefined
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
        const { name, color, category, price, totalItems, availableItems, url, images, description, brandName, modelNo, productID, frameWidth, frameHeight, frameDimention, frameColor, lensColor, templeColor, frameMaterial, lens, powerSunglasses, gender, warranty, collection_type } = req.body;

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
        if (brandName) product.brandName = brandName;
        if (modelNo) product.modelNo = modelNo;
        if (productID) product.productID = productID;
        if (frameWidth) product.frameWidth = frameWidth;
        if (frameHeight) product.frameHeight = frameHeight;
        if (frameDimention) product.frameDimention = frameDimention;
        if (frameColor) product.frameColor = frameColor;
        if (lensColor) product.lensColor = lensColor;
        if (templeColor) product.templeColor = templeColor;
        if (frameMaterial) product.frameMaterial = frameMaterial;
        if (lens) product.lens = lens;
        if (powerSunglasses !== undefined) product.powerSunglasses = powerSunglasses;
        if (gender) product.gender = gender;
        if (warranty) product.warranty = warranty;
        if (collection_type) product.collection_type = collection_type;

        await product.save(); // Save changes

        res.status(200).json({ message: "Product updated successfully", product });
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
        const product = await Product.findOne({ _id: id, isDelete: false })
            .populate('category')
            .exec();

        if (!product) {
            return res.status(404).json({ error: ERROR_MESSAGE.PRODUCT_NOT_FOUND, status: 404 });
        }

        res.status(200).json({ product, status: 200 });
    } catch (error) {
        res.status(500).json({ error: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
};