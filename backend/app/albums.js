const express = require('express');
const config = require('../config');
const path = require('path');
const nanoid = require('nanoid');
const multer = require('multer');
const router = express.Router();
const Album = require('../models/Album');

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
    if (req.query.artist) {
        const albums = await Album.find({artist: req.query.artist});
        res.send(albums)
    } else {
        const albums = await Album.find();
        res.send(albums)
    }
});

router.get('/:id', async (req, res) => {
    const album = await Album.findById(req.params.id).populate('artist');
    if (!album) {
        return res.status(404).send({message: 'Not found'});
    }
    res.send(album)
});

router.post('/', upload.single('image'), async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }

    const object = {
        title: req.body.title,
        year: req.body.year,
        image: req.body.image,
        artist: req.body.artist
    };
    const album = new Album(object);

    try {
        await album.save();
        return res.send(album);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;