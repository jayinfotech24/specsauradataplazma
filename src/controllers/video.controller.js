import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import displayVideo from "../models/displayVideo.model.js";

// Wallpapers Management 

export const createVideo = async (req, res) => {
    try {

        const { url, title } = req.body;

        const video = new displayVideo({
            url: url,
            title: title
        });

        await video.save();

        res.status(200).json({ video, status: 200 })

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const updateVideo = async (req, res) => {
    try {

        const { id } = req.param
        const { url, title } = req.body;

        let video = await displayVideo.findById(id);

        if (!video) {
            return res.status(404).json({ message: "Video not found", status: 404 });
        }

        // Update only provided fields
        if (url) video.url = url;
        if (title) video.title = title;

        await video.save();

        res.status(200).json({ video, status: 200 })

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const deleteVideo = async (req, res) => {
    try {

        const { id } = req.param

        let video = await displayVideo.findByIdAndDelete(id);

        if (!video) {
            return res.status(404).json({ message: "Video not found", status: 404 });
        }

        res.status(200).json({ message: SUCCESS_MESSAGE.VIDEO_DELETE, status: 200 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}