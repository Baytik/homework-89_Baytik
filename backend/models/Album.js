const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;