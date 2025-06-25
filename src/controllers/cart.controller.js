import Cart from "../models/cart.model.js"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js"

export const createCart = async (req, res) => {
    try {
        const { userID, productID, lensType, numberOfItems, lensCoating, lensMaterial, prescriptionID, isDelete } = req.body

        if (!userID || !productID || !numberOfItems ) {
            res.status(404).json({ message: "please provide all fileds.", status: 404 });
        }

        const cart = new Cart({
            userID: userID,
            productID: productID,
            lensType: lensType,
            numberOfItems: numberOfItems,
            lensCoating: lensCoating,
            lensMaterial: lensMaterial,
            prescriptionID: prescriptionID,
            isDelete: isDelete
        });

        await cart.save();

        res.status(200).json({ cart, status: 200 })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message, status: 500 })
    }
}

export const updateCart = async (req, res) => {
    try {
        const { id } = req.params; // Get cart ID from URL params
        const updateData = req.body; // Get updated fields from request body

        if (!id) {
            return res.status(400).json({ message: "Cart ID is required.", status: 400 });
        }

        const updatedCart = await Cart.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found.", status: 404 });
        }

        res.status(200).json({ cart: updatedCart, status: 200 });

    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};


export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Cart ID is required.", status: 400 });
        }

        const cart = await Cart.findById(id);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found.", status: 404 });
        }

        cart.isDelete = true;

        await cart.save();

        res.status(200).json({ message: "Cart deleted successfully.", status: 200 });

    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};

export const deleteManyCarts = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Cart IDs are required in an array.", status: 400 });
        }

        // Update all matching cart items by setting isDelete to true
        const result = await Cart.updateMany(
            { _id: { $in: ids } },
            { $set: { isDelete: true } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "No matching cart items found.", status: 404 });
        }

        res.status(200).json({
            message: "Selected cart items deleted successfully.",
            status: 200,
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.error("Error deleting cart items:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};

export const getManyCarts = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Cart IDs are required in an array.", status: 400 });
        }

        // Fetch all matching cart items
        const carts = await Cart.find({ _id: { $in: ids } });

        if (carts.length === 0) {
            return res.status(404).json({ message: "No matching cart items found.", status: 404 });
        }

        res.status(200).json({
            status: 200,
            items:carts
        });

    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};



// get all cart data from user id 
export const getAllCartforuser = async (req, res) => {
    try {
        const { id } = req.params;

        const carts = await Cart.find({ userID: id, isDelete: false })
        .populate("prescriptionID")
        .populate("productID")
        .populate("lensCoating")
        .populate("lensType")
        .exec();

        res.status(200).json({ items: carts, status: 200});

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 })
    }
}

// get all cart data from user id 
export const getSingleCart = async (req, res) => {
    try {

        const { id } = req.params;

        const carts = await Cart.findOne({ _id: id,isDelete: false })
        .populate("prescriptionID")
        .populate("productID")
        .populate("lensCoating")
        .populate("lensType")
        .exec();

        res.status(200).json({ carts, status: 200 });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 })
    }
}

export const updateCartFlag = async (req, res) => {
    try {
        const { id } = req.params; // Get prescription ID from URL params
        
        const updatedCart = await Cart.findById(id);

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found.", status: 404 });
        }

        updatedCart.isAllDataAdded = true

        await updatedCart.save();

        res.status(200).json({ prescription: updatedCart, status: 200 });

    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};
