const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema ({
    artist: {
        type: String,
        required: true
    },
    information: String,
    image: String,
    published: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;