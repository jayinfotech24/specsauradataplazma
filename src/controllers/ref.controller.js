import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import wallpapers from "../models/wallpaper.model.js";
import category from "../models/categories.model.js";
import DisplayVideo from "../models/displayVideo.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";


// reference data for home screen

export const getReference = async (req, res) => {
    try {
        const wallpaper = await wallpapers.find({ isDelete: false });
        const categories = await category.find({ isDelete: false });
        const displayVideo = await DisplayVideo.find({ isDelete: false });

        res.json({
            wallpapers: wallpaper,
            categories: categories,
            videos: displayVideo,
            status: 200
        });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 })
    }
}

export const getDashboardData = async (req, res) => {
    try {

        const customerConts = await User.countDocuments({ isDelete: false });
        const orderCounts = await Order.countDocuments({ isDelete: false });

        res.status(200).json({ customers: customerConts, orders: orderCounts, status: 200 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}