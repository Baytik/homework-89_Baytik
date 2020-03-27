const express = require('express');
const config = require('../config');
const path = require('path');
const nanoid = require('nanoid');
const multer = require('multer');
const router = express.Router();
const Artist = require('../models/Artist');
const User = require('../models/User');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

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
    if(!authorization) {
        const albums = await Artist.find({published: true});
        return res.send(albums)
    }

    const user = await User.findOne({token: authorization});
    if(user.role !== 'admin') {
        const albums = await Artist.find({published: true});
        return res.send(albums)
    } else if (user.role === 'admin') {
        const albums = await Artist.find();
        return res.send(albums)
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }
    const user = req.user;

    const object = {
        user: user._id,
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

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    const user = req.user;

    const artist = await Artist.deleteOne({_id: req.params.id});
    try {
        await artist.save();
        return res.send({message: 'Was deleted'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/:id/published', [auth, permit('admin')], async (req, res) => {
   const artist = await Artist.findById(req.params.id);
   if (!artist) {
       return res.status(404).send({message: 'Not found'})
   }
   artist.published = true;
    await artist.save();
    return res.send(artist)
});

module.exports = router;