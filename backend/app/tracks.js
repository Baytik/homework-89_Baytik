const express = require('express');
const Track = require('../models/Track');
const User = require('../models/User');

const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

router.get('/', async (req, res) => {
    const authorization = req.get('Authorization');
    const user = await User.findOne({token: authorization});

    if (req.query.album) {
        const tracks = await Track.find({album: req.query.album});
        if (!user || user.role !== 'admin') {
            const filterTrack = tracks.filter(album => album.published === true);
            res.send(filterTrack)
        }
        if (user.role === 'admin') {
            res.send(tracks)
        }
    } else {
        const tracks = await Track.find();
        res.send(tracks)
    }
});

router.post('/', async (req, res) => {
    const object = {
        title: req.body.title,
        duration: req.body.duration,
        counter: req.body.counter,
        album: req.body.album
    };
    const track = new Track(object);

    try {
        await track.save();
        return res.send(track);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    const user = req.user;

    const track = await Track.deleteOne({_id: req.params.id});
    try {
        await track.save();
        return res.send({message: 'Was deleted'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;