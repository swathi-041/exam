const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, uploadFile } = require('../controllers/notificationController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

// Route to get all notifications
router.get('/notifications', getNotifications);

// Route to create a new notification
router.post('/notifications', createNotification);

// Route to upload a file
router.post('/notifications/upload', upload.single('file'), uploadFile);

module.exports = router;
