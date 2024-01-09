
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoTitle: { type: String, required: true },
    videoUrl: { type: String, required: true },
    subtitleUrl: { type: String, required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
