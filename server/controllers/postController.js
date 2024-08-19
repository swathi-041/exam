const Post = require('../models/post');

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, type, content } = req.body;
        if (!title || !type || !content) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const post = new Post({ title, type, content });
        await post.save();

        res.status(201).json({ success: true, message: 'Post created successfully' });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ message: 'Error creating post' });
    }
};

module.exports = {
    getPosts,
    createPost
};
