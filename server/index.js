const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5002;

// Import routes
const examRoutes = require('./routes/examRoutes');
const authRoutes = require('./routes/authRoutes');


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors({
    credentials: true,
    origin: 'https://eduquestt.netlify.app/', 
}));
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api/exams', examRoutes); // Ensure this line is present
app.use('/auth', authRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
