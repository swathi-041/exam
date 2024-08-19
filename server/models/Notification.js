const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['pdf', 'link', 'note', 'assignment'], required: true },
    fileUrl: { type: String }, // For storing URLs of uploaded files
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
