// routes/exams.js
const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const User = require('../models/User'); // Import User model

// Attempt exam
router.post('/:title/attempt', async (req, res) => {
    try {
        const user = req.user; // Assuming user is attached to request (e.g., from auth middleware)
        const exam = await Exam.findOne({ title: req.params.title });
        
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        if (user.attemptedExams.includes(exam._id)) {
            return res.status(400).json({ message: 'You have already attempted this exam' });
        }

        user.attemptedExams.push(exam._id);
        user.attemptCount += 1;
        await user.save();

        res.json({ message: 'Exam attempted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
