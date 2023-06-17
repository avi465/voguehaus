const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure multer middleware for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination folder for storing images
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = `${uuidv4()}${extension}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

module.exports = upload;