import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import Product from "../models/product.model.js";

export const getAllAccessories = async (req, res) => {
    try {
        const accessories = await Product.find({ isDelete: false, isAccessory: true })
            .sort({ createdAt: -1 })
            .populate('category')
            .exec();
        res.status(200).json({ accessories, status: 200 })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 })
    }
}

export const createAccessory = async (req, res) => {
    try {
        const { 
            name, 
            price, 
            totalItems, 
            availableItems, 
            url, 
            images, 
            description, 
            brandName, 
            modelNo, 
            productID, 
            warranty, 
            discount 
        } = req.body;

        // Create new accessory with provided data and set other fields to null/default
        const accessory = new Product({
            name: name || null,
            category: "680fb9063dbd062321772ec6", // Fixed category ID for accessories
            price: price || 0,
            totalItems: totalItems || 0,
            availableItems: availableItems || 0,
            url: url || null,
            images: images || [],
            description: description || null,
            brandName: brandName || null,
            modelNo: modelNo || null,
            productID: productID || null,
            frameWidth: 0,
            frameHeight: 0,
            frameDimention: null,
            frameColor: null,
            lensColor: null,
            templeColor: null,
            frameMaterial: null,
            lens: null,
            powerSunglasses: false,
            gender: "MALE",
            warranty: warranty || null,
            discount: discount || 0,
            collection_type: null,
            frameShape: null,
            crossPrice: null,
            isAccessory: true
        });

        await accessory.save();

        res.status(201).json({ accessory, status: 201 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
}

export const updateAccessory = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, 
            price, 
            totalItems, 
            availableItems, 
            url, 
            images, 
            description, 
            brandName, 
            modelNo, 
            productID, 
            warranty, 
            discount 
        } = req.body;

        let accessory = await Product.findOne({ _id: id, isAccessory: true, isDelete: false });

        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found", status: 404 });
        }

        // Update only provided fields
        if (name !== undefined) accessory.name = name;
        if (price !== undefined) accessory.price = price;
        if (totalItems !== undefined) accessory.totalItems = totalItems;
        if (availableItems !== undefined) accessory.availableItems = availableItems;
        if (url !== undefined) accessory.url = url;
        if (images !== undefined) accessory.images = images;
        if (description !== undefined) accessory.description = description;
        if (brandName !== undefined) accessory.brandName = brandName;
        if (modelNo !== undefined) accessory.modelNo = modelNo;
        if (productID !== undefined) accessory.productID = productID;
        if (warranty !== undefined) accessory.warranty = warranty;
        if (discount !== undefined) accessory.discount = discount;

        await accessory.save();

        res.status(200).json({ message: "Accessory updated successfully", accessory, status: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
}

export const deleteAccessory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAccessory = await Product.findOne({ _id: id, isAccessory: true, isDelete: false });

        if (!deletedAccessory) {
            return res.status(404).json({ error: "Accessory not found", status: 404 });
        }

        deletedAccessory.isDelete = true;
        await deletedAccessory.save();

        res.status(200).json({ message: "Accessory deleted successfully", status: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
};

export const getAccessory = async (req, res) => {
    try {
        const { id } = req.params;
        const accessory = await Product.findOne({ 
            _id: id, 
            isDelete: false, 
            isAccessory: true 
        })
        .populate('category')
        .exec();

        if (!accessory) {
            return res.status(404).json({ error: "Accessory not found", status: 404 });
        }

        res.status(200).json({ accessory, status: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
};

export const getAccessoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const accessories = await Product.find({ 
            category: categoryId,
            isDelete: false, 
            isAccessory: true 
        })
        .sort({ createdAt: -1 })
        .populate('category')
        .exec();

        res.status(200).json({ accessories, status: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}; 