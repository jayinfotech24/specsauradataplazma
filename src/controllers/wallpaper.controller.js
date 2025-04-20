import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import wallpapers from "../models/wallpaper.model.js";

// Wallpapers Management 
export const getAllwallpapers = async (req,res) => {
    try {

        const wallpaer = await wallpapers.find({ isDelete: false});
        res.status(200).json({ items: wallpaer, status: 200})

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}


export const createWallpaper = async (req, res) => {
    try {

        const { url, title, description } = req.body;

        const wallpaer = new wallpapers({
            url: url,
            title: title,
            description: description
        });

        await wallpaer.save();

        res.status(200).json({ wallpaer, status: 200 })

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const updateWallpaper = async (req, res) => {
    try {

        const { id } = req.params
        const { url, title, description } = req.body;

        let wallpaper = await wallpapers.findById(id);

        if (!wallpaper) {
            return res.status(404).json({ message: "Wallpaper not found", status: 404 });
        }

        // Update only provided fields
        if (url) wallpaper.url = url;
        if (title) wallpaper.title = title;
        if (description) wallpaper.description = description;

        await wallpaper.save();

        res.status(200).json({ wallpaper, status: 200 })

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const deleteWallpaper = async (req, res) => {
    try {

        const { id } = req.params

        let wallpaper = await wallpapers.findById(id);

        if (!wallpaper) {
            return res.status(404).json({ message: "Wallpaper not found", status: 404 });
        }

        wallpaper.isDelete = true
        await wallpaper.save();

        res.status(200).json({ message: SUCCESS_MESSAGE.WALLPAPER_DELETE, status: 200 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}