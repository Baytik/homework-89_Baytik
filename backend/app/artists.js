const express = require('express');
const config = require('../config');
const path = require('path');
const nanoid = require('nanoid');
const multer = require('multer');
const router = express.Router();
const Artist = require('../models/Artist');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const artists = await Artist.find();
    res.send(artists);
});

router.post('/', upload.single('image'), async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }

    const object = {
        artist: req.body.artist,
        information: req.body.information,
        image: req.body.image
    };
    const artist = new Artist(object);

    try {
        await artist.save();
        return res.send(artist);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;