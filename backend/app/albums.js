const express = require('express');
const config = require('../config');
const path = require('path');
const nanoid = require('nanoid');
const multer = require('multer');
const router = express.Router();
const Album = require('../models/Album');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const User = require('../models/User');

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
    const authorization = req.get('Authorization');
    const user = await User.findOne({token: authorization});

    if (req.query.artist) {
        const albums = await Album.find({artist: req.query.artist}).populate('artist');
        if (!user || user.role !== 'admin') {
            const filterAlbum = albums.filter(album => album.published === true);
            res.send(filterAlbum)
        }
        if (user.role === 'admin') {
            res.send(albums)
        }
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

router.post('/', [auth, upload.single('image')], async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }
    const user = req.user;
    const object = {
        user: user._id,
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

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    const user = req.user;

        const album = await Album.deleteOne({_id: req.params.id});
        try {
            await album.save();
            return res.send({message: 'Was deleted'});
        } catch (e) {
            return res.status(400).send(e);
        }
});

router.post('/:id/published', [auth, permit('admin')], async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (!album) {
        return res.status(404).send({message: 'Not found'})
    }
    album.published = true;
    await album.save();
    return res.send(album)
});

module.exports = router;