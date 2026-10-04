const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');
// const { protect } = require('../middleware/auth.middleware');

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

module.exports = {
    uploadFile: function (req, res, next) {
        upload.any()(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            // Everything went fine.
            next();
        });
    },
}