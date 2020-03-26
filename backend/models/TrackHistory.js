const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    trackId: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    datetime: String,
});


const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;