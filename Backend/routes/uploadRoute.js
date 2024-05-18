const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require("../cloudinary.js")
const postModel = require("../models/postModel.js")

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    },
});

const upload = multer({ storage: storage });

router.post('/upload/:id', upload.single('file'), async (req, res) => {
    let id = req.params.id;
    console.log(req.file, id);
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'No file provided' });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        await postModel.create({ userId: id, description: req.body.caption, likes: [], image: result.url });
        res.status(200).send({ url: result.url });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
