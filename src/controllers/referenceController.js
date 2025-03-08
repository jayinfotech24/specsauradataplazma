import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import wallpapers from "../models/wallpaperModel.js";
import category from "../models/categoriesModel.js";
import DisplayVideo from "../models/displayvideoModel.js";


// reference data for home screen

export const getReference = async (req,res) => {
    try {
        const wallpaper = await wallpapers.find();
        const categories = await category.find();
        const displayVideo = await DisplayVideo.find();


        res.json({
            wallpapers:wallpaper,
            categories:categories,
            videos:displayVideo,
            status:200
        });
    } catch (error) {
        res.status(500).json({message: ERROR_MESSAGE.ENTITY_NOT_FOUND , status: 500})
    }
}