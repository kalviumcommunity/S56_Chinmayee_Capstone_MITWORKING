const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); 
    },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    try {
        const fileUrl = `https://s56-chinmayee-capstone-mitworking.onrender.com/uploads/${req.file.filename}`;
        res.json({ url: fileUrl }); 
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

module.exports = router;
