const express = require('express');
const router = express.Router();
const { test, registerUser, loginUser } = require('../controllers/authController');

// Test Route
router.get('/test', test);

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

module.exports = router;
