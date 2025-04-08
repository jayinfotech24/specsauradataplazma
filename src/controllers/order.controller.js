import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
        const { user, product, quantity, totalAmount, paymentMethod, shippingAddress } = req.body;

        if (!user || !product || !quantity || !totalAmount || !paymentMethod || !shippingAddress) {
            return res.status(400).json({ message: "All required fields must be provided", status: 400 });
        }

        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
    }
}

export const getAllOders = async (req,res) => {
    try {
        const orders = await Order.find({ isDelete: false});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
}

export const getOrders = async (req, res) => {
    try {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({ message: "User ID is required", status: 400 });
        }

        const orders = await Order.find({ user: userID,isDelete: false }).populate("product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params 
        const order = await Order.findOne({ _id: id, isDelete: false}).populate("user").populate("product");
        if (!order) return res.status(404).json({ error: "Order not found", status: 404 });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message, status: 500 });
    }
};


export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params 
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!order) return res.status(404).json({ error: "Order not found", status: 404 });
        res.status(200).json(order);
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
