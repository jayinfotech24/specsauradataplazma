import Cart from "../models/cart.model.js"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js"

export const createCart = async (req, res) => {
    try {
        const { userID, productID, lensType, numberOfItems, lensCoating, lensMaterial, prescriptionID } = req.body

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
            prescriptionID: prescriptionID
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
        const { id } = req.params; // Get cart ID from URL params

        if (!id) {
            return res.status(400).json({ message: "Cart ID is required.", status: 400 });
        }

        const deletedCart = await Cart.findById(id);

        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found.", status: 404 });
        }

        deletedCart.isDelete = true

        await deleteCart.save();

        res.status(200).json({ message: "Cart deleted successfully.", status: 200 });

    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
};

// get all cart data from user id 
export const getAllCartforuser = async (req, res) => {
    try {

        const { userid } = req.params

        const carts = await Cart.find({ userID: userid,isDelete: false })
        .populate("prescription")
        .populate("productID")
        .exec();

        res.status(200).json(carts);

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 })
    }
}

// get all cart data from user id 
export const getSingleCart = async (req, res) => {
    try {

        const { cartID } = req.params

        const carts = await Cart.find({ _id: cartID,isDelete: false })
        .populate("prescription")
        .populate("productID")
        .exec();

        res.status(200).json(carts);

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 })
    }
}