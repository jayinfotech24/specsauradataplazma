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
    params: {
        folder: 'uploads',
        allowed_formats: [
            // Image formats
            'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico', 'avif', 
        
            // Document formats
            'pdf', 'txt', 'doc', 'docx', 'odt', 'rtf', 'xls', 'xlsx', 'csv', 'ppt', 'pptx',  
        
            // Video formats
            'mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm'
        ],
    },
});

const upload = multer({ storage: storage });

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

export { upload, uploadFile };