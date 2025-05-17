import dotenv from 'dotenv';

dotenv.config();

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/api.js";

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: 'uploads',
        resource_type: 'auto', // Automatically detect file type (image, video, raw)
        allowed_formats: [
            'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico', 'avif',
            'pdf', 'txt', 'doc', 'docx', 'odt', 'rtf', 'xls', 'xlsx', 'csv', 'ppt', 'pptx',
            'mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm'
        ],
    }),
});

const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 }, });

// Controller Function
const uploadFile = (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({ message: ERROR_MESSAGE.FILE_NOT_FOUND, status: 400 });
        }
    
        res.status(200).json({
            status: 200,
            message: SUCCESS_MESSAGE.FILE_UPLOADED,
            fileUrl: req.file.path, // Public URL
        });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
};

// Upload middleware for multiple files (change the max count as needed)
const uploadMultiple = multer({ storage: storage }).array('files', 10); // "files" is the field name

// Controller Function for Multiple File Uploads
const uploadMultipleFiles = (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: ERROR_MESSAGE.FILE_NOT_FOUND, status: 400 });
        }

        const fileUrls = req.files.map(file => file.path);

        res.status(200).json({
            status: 200,
            message: SUCCESS_MESSAGE.FILE_UPLOADED,
            fileUrls,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ERROR_MESSAGE.PROCESS_REQUEST, status: 500 });
    }
};

export { upload, uploadFile, uploadMultiple, uploadMultipleFiles };