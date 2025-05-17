import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";
import displayVideo from "../models/displayVideo.model.js";

// Wallpapers Management 

export const getAllVideos = async (req,res) => {
    try {

        const videos = await displayVideo.find({ isDelete: false});
        res.status(200).json({ items: videos, status: 200 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}

export const getVideoByID = async (req,res) => {
    try {

        const { id } = req.params

        const videos = await displayVideo.find({ _id: id, isDelete: false });
        res.status(200).json({ items: videos, status: 200});
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND , status: 500 });
    }
}

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

        const { id } = req.params
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

        const { id } = req.params

        let video = await displayVideo.find({ _id:id, isDelete: false});

        if (!video) {
            return res.status(404).json({ message: "Video not found", status: 404 });
        }

        video.isDelete = true
        video.save();

        res.status(200).json({ message: SUCCESS_MESSAGE.VIDEO_DELETE, status: 200 });

    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.ENTITY_NOT_FOUND, status: 500 });
    }
}