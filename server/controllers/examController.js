// const mongoose = require('mongoose');
// const Exam = require('../models/Exam'); // Ensure this path is correct

// Function to get all available exams
// Remove the duplicate declaration of getExams
//     try {
//         const exams = await Exam.find({}, 'title');
//         res.json(exams);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching exams' });
//     }


// const Exam = require('../models/Exam');

// // Function to get all available exams
// const getExams = async (req, res) => {
//     try {
//         const exams = await Exam.find({}, 'title description');
//         res.json(exams);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching exams' });
//     }
// };

// // Function to get a specific exam by ID
// const getExamById = async (req, res) => {
//     try {
//         const exam = await Exam.findById(req.params.id);
//         if (!exam) {
//             return res.status(404).json({ message: 'Exam not found' });
//         }
//         res.json(exam);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching exam details' });
//     }
// };

// // Function to submit answers and evaluate the score
// const submitAnswers = async (req, res) => {
//     try {
//         const exam = await Exam.findById(req.params.id);
//         if (!exam) {
//             return res.status(404).json({ message: 'Exam not found' });
//         }

//         const { answers } = req.body; // Assuming answers are submitted in the request body
//         if (!answers || !Array.isArray(answers) || answers.length !== exam.questions.length) {
//             return res.status(400).json({ message: 'Invalid answers submitted' });
//         }

//         let score = 0;
//         exam.questions.forEach((question, index) => {
//             if (question.correctAnswer === answers[index]) {
//                 score++;
//             }
//         });

//         res.json({ score, totalQuestions: exam.questions.length });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error evaluating answers' });
//     }
// };

// module.exports = {
//     getExams,
//     getExamById,
//     submitAnswers
// };



// Remove the extra closing curly brace

// Function to get a specific exam by ID
// const getExamById = async (req, res) => {
//     try {
//         const exam = await Exam.findById(req.params.id);
//         if (!exam) {
//             return res.status(404).json({ message: 'Exam not found' });
//         }
//         res.json(exam);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching exam details' });
//     }
// };

const mongoose = require('mongoose');
const Exam = require('../models/Exam');

// Function to get all available exams
const getExams = async (req, res) => {
    try {
        const exams = await Exam.find({}, 'title description');
        res.json(exams);
    } catch (err) {
        console.error('Error fetching exams:', err);
        res.status(500).json({ message: 'Error fetching exams' });
    }
};

// Function to get a specific exam by ID
const getExamById = async (req, res) => {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid exam ID' });
    }

    try {
        const exam = await Exam.findById(id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json(exam);
    } catch (err) {
        console.error('Error fetching exam details:', err);
        res.status(500).json({ message: 'Error fetching exam details' });
    }
};

// Function to submit answers and evaluate the score
const submitAnswers = async (req, res) => {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid exam ID' });
    }

    try {
        const exam = await Exam.findById(id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const { answers } = req.body;
        if (!answers || !Array.isArray(answers) || answers.length !== exam.questions.length) {
            return res.status(400).json({ message: 'Invalid answers submitted' });
        }

        let score = 0;
        exam.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        res.json({ score, totalQuestions: exam.questions.length });
    } catch (err) {
        console.error('Error evaluating answers:', err);
        res.status(500).json({ message: 'Error evaluating answers' });
    }
};

module.exports = {
    getExams,
    getExamById,
    submitAnswers,
};
