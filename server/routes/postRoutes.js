const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/postController');

// Route to fetch all posts
router.get('/', getPosts);

// Route to create a new post
router.post('/', createPost);

module.exports = router;
