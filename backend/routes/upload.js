const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');
// const { protect } = require('../middleware/authMiddleware');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'nkcraft_uploads',
            resorce_type: "image",
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
            public_id: `product_${Date.now()}`
        }
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// @route   GET /api/upload/signature
// @desc    Get signed upload parameters for Cloudinary direct upload
// @access  Private

router.post('/', upload.any(), (req, res, next) => {
    // console.log(process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET);
    try {
        if (!req.files || !req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images uploaded"
            })
        }
        const images = req.files.map((file) => ({
            url: file.path,
            public_id: file.filename,
            fieldname: file.fieldname
        }))
        res.status(200).json({
            success: true,
            message: "Images uploaded successfully.",
            images
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;
