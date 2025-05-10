import { MODEL_NAME } from "../constants/DBConst.js";
import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, paymentMethod, shippingAddress } = req.body;

        // Basic validations
        if (!user || !items || !Array.isArray(items) || items.length === 0 || !totalAmount || !paymentMethod || !shippingAddress) {
            return res.status(400).json({ message: "All required fields must be provided", status: 400 });
        }

        // Optional: Validate required fields inside shippingAddress
        const requiredAddressFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'country', 'phone'];
        const hasMissingAddressFields = requiredAddressFields.some(field => !shippingAddress[field]);
        if (hasMissingAddressFields) {
            return res.status(400).json({ message: "Incomplete shipping address", status: 400 });
        }

        const order = new Order({
            user,
            items,
            totalAmount,
            paymentMethod,
            shippingAddress
        });

        await order.save();
        res.status(201).json({ message: "Order created successfully", order, status: 201 });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: error.message || "Internal server error", status: 500 });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ isDelete: false })
            .populate({
                path: "items.product",
                model: MODEL_NAME.PRODUCT
            })
            .populate({
                path: "items.prescription",
                model: MODEL_NAME.PRESCRIPTION
            })
            .populate({
                path:"items.cart",
                model: MODEL_NAME.CART
            })
            .populate("user")
            .exec();

        res.status(200).json({items: orders, status: 200});
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

export const getOrders = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required", status: 400 });
        }

        const orders = await Order.find({ user: id,isDelete: false })
        .populate({
            path: "items.product",
            model: MODEL_NAME.PRODUCT
        })
        .populate({
            path: "items.prescription",
            model: MODEL_NAME.PRESCRIPTION
        })
        .populate({
            path:"items.cart",
            model: MODEL_NAME.CART
        })
        .exec();
        res.status(200).json({ items: orders, status: 200});
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params 
        const order = await Order.findOne({ _id: id, isDelete: false})
        .populate("user")
        .populate({
            path: "items.product",
            model: MODEL_NAME.PRODUCT
        })
        .populate({
            path: "items.prescription",
            model: MODEL_NAME.PRESCRIPTION
        })
        .populate({
            path:"items.cart",
            model: MODEL_NAME.CART
        })
        .exec();
        if (!order) return res.status(404).json({ error: "Order not found", status: 404 });
        res.status(200).json({ order, status: 200});
    } catch (error) {
        res.status(500).json({ error: error.message, status: 500 });
    }
};


export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params 
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!order) return res.status(404).json({ error: "Order not found", status: 404 });
        res.status(200).json({ order, status: 200});
    } catch (error) {
        res.status(400).json({ error: error.message, status: 400 });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params 
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found", status: 404 });

        order.isDelete = true

        await order.save();

        res.status(200).json({ message: "Order deleted successfully", status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};
