const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,  // store image path
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);