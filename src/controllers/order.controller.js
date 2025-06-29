import { MODEL_NAME } from "../constants/DBConst.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { sendEmail } from "./mail.controller.js";
import { generateOrderEmail } from "../constants/orderTemplate.js"

export const createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, paymentStatus, paymentMethod, shippingAddress } = req.body;

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

        let currentUser = await User.find({ _id: user, isDelete: false });

        const order = new Order({
            user,
            items,
            totalAmount,
            paymentStatus,
            paymentMethod,
            shippingAddress
        });

        await order.save();

        let orderTemp = generateOrderEmail({ orderId: order._id, items: items, totalPrice: totalAmount, customerName: shippingAddress['fullName'] })

        await sendEmail(currentUser.email, orderTemp, `Your Order created Successfully on ${new Date().toLocaleDateString()}`).then((result) => {
            console.log("Order Email Sent Successful")
        }).catch((error) => {
            console.log("Failed to send email of Order");
            console.log(error.message)
        })

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
                model: MODEL_NAME.PRODUCT,
                populate: [
                    {
                        path: "category",
                        model: MODEL_NAME.CATEGORY
                    }
                ]
            })
            .populate({
                path: "items.prescription",
                model: MODEL_NAME.PRESCRIPTION
            })
            .populate({
                path: "items.cart",
                model: MODEL_NAME.CART,
                populate: [
                    {
                        path: "prescriptionID",
                        model: MODEL_NAME.PRESCRIPTION
                    },
                    {
                        path: "productID",
                        model: MODEL_NAME.PRODUCT
                    },
                    {
                        path: "lensCoating",
                        model: MODEL_NAME.COATING
                    },
                    {
                        path: "lensType",
                        model: MODEL_NAME.LENS_TYPE
                    }
                ]
            })
            .populate("user")
            .exec();

        res.status(200).json({ items: orders, status: 200 });
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

        const orders = await Order.find({ user: id, isDelete: false })
            .populate({
                path: "items.product",
                model: MODEL_NAME.PRODUCT,
                populate: [
                    {
                        path: "category",
                        model: MODEL_NAME.CATEGORY
                    }
                ]
            })
            .populate({
                path: "items.prescription",
                model: MODEL_NAME.PRESCRIPTION
            })
            .populate({
                path: "items.cart",
                model: MODEL_NAME.CART,
                populate: [
                    {
                        path: "prescriptionID",
                        model: MODEL_NAME.PRESCRIPTION
                    },
                    {
                        path: "productID",
                        model: MODEL_NAME.PRODUCT
                    },
                    {
                        path: "lensCoating",
                        model: MODEL_NAME.COATING
                    },
                    {
                        path: "lensType",
                        model: MODEL_NAME.LENS_TYPE
                    }
                ]
            })
            .exec();
        res.status(200).json({ items: orders, status: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findOne({ _id: id, isDelete: false })
            .populate("user")
            .populate({
                path: "items.product",
                model: MODEL_NAME.PRODUCT,
                populate: [
                    {
                        path: "category",
                        model: MODEL_NAME.CATEGORY
                    }
                ]
            })
            .populate({
                path: "items.prescription",
                model: MODEL_NAME.PRESCRIPTION
            })
            .populate({
                path: "items.cart",
                model: MODEL_NAME.CART,
                populate: [
                    {
                        path: "prescriptionID",
                        model: MODEL_NAME.PRESCRIPTION
                    },
                    {
                        path: "productID",
                        model: MODEL_NAME.PRODUCT
                    },
                    {
                        path: "lensCoating",
                        model: MODEL_NAME.COATING
                    },
                    {
                        path: "lensType",
                        model: MODEL_NAME.LENS_TYPE
                    }
                ]
            })
            .exec();
        if (!order) return res.status(404).json({ error: "Order not found", status: 404 });
        res.status(200).json({ order, status: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, status: 500 });
    }
};


export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!order) return res.status(404).json({ error: "Order not found", status: 404 });
        res.status(200).json({ order, status: 200 });
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
