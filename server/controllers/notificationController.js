const Notification = require('../models/Notification');
const path = require('path');
const fs = require('fs');

// Get all notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

// Create a new notification
const createNotification = async (req, res) => {
    try {
        const { title, description, type, fileUrl } = req.body;
        const notification = new Notification({ title, description, type, fileUrl });
        await notification.save();
        res.status(201).json({ success: true, message: 'Notification created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating notification' });
    }
};

// Upload a file and return its URL
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `http://localhost:5002/uploads/${req.file.filename}`;
    res.json({ fileUrl });
};

module.exports = {
    getNotifications,
    createNotification,
    uploadFile
};
