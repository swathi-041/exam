const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['link', 'note'], required: true }, // 'link' or 'note'
    content: { type: String, required: true } // URL or note content
});

module.exports = mongoose.model('Post', postSchema);
