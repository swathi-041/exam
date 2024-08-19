const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam'); // Correctly import the Exam model
const { getExams, getExamById, submitAnswers } = require('../controllers/examController');

// Route to upload a new exam
router.post('/upload', async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        // Validate request body
        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Title and questions are required' });
        }

        // Create and save the exam
        const exam = new Exam({ title, description, questions });
        await exam.save();

        res.status(201).json({ success: true, message: 'Exam uploaded successfully' });
    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate title error
            res.status(400).json({ success: false, message: 'Exam title already exists' });
        } else {
            console.error('Failed to upload exam:', err);
            res.status(500).json({ success: false, message: 'Failed to upload exam' });
        }
    }
});

// Route to fetch all exams (only title and description)
router.get('/', getExams);

// Route to fetch an exam by ID
router.get('/:id', getExamById);

// Route to submit an exam
router.post('/:id/submit', submitAnswers);

module.exports = router;
























// // // routes/examRoutes.js
// // const express = require('express');
// // const router = express.Router();
// // const createDynamicModel = require('../models/dynamicExam');
// // const Exam = require('../models/exam');


// // // Route to upload a new exam
// // router.post('/upload', async (req, res) => {
// //     try {
// //         const { title, description, questions } = req.body;

// //         if (!title || !questions || questions.length === 0) {
// //             return res.status(400).json({ message: 'Title and questions are required' });
// //         }

// //         const DynamicExam = createDynamicModel(title);
// //         const exam = new DynamicExam({ title, description, questions });
// //         await exam.save();

// //         res.status(201).json({ success: true, message: 'Exam uploaded successfully' });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ success: false, message: 'Failed to upload exam' });
// //     }
// // });

// // router.get('/exams', async (req, res) => {
// //     try {
// //         const exams = await Exam.find({}, 'title description');
// //         res.json(exams);
// //     } catch (error) {
// //         console.error('Error fetching exams:', error);
// //         res.status(500).json({ error: 'Failed to fetch exams' });
// //     }
// // });



// // // Get all available exams
// // // router.get('/exams', async (req, res) => {
// // //     try {
// // //         const exams = await Exam.find({}, 'title description');
// // //         res.json(exams);
// // //     } catch (err) {
// // //         res.status(500).json({ message: 'Error fetching exams' });
// // //     }
// // // });

// // // // Get a specific exam by ID
// // // router.get('/exams/:id', async (req, res) => {
// // //     try {
// // //         const exam = await Exam.findById(req.params.id);
// // //         if (!exam) return res.status(404).json({ message: 'Exam not found' });
// // //         res.json(exam);
// // //     } catch (err) {
// // //         res.status(500).json({ message: 'Error fetching exam' });
// // //     }
// // // });

// // // // Submit answers and evaluate the score
// // // router.post('/exams/:id/submit', async (req, res) => {
// // //     try {
// // //         const exam = await Exam.findById(req.params.id);
// // //         if (!exam) return res.status(404).json({ message: 'Exam not found' });

// // //         const { answers } = req.body;
// // //         if (!answers || answers.length !== exam.questions.length) {
// // //             return res.status(400).json({ message: 'Invalid answers' });
// // //         }

// // //         let score = 0;
// // //         exam.questions.forEach((question, index) => {
// // //             if (question.correctAnswer === answers[index]) {
// // //                 score++;
// // //             }
// // //         });

// // //         res.json({ score, totalQuestions: exam.questions.length });
// // //     } catch (err) {
// // //         res.status(500).json({ message: 'Error evaluating exam' });
// // //     }
// // // });






// //  module.exports = router;



// // const express = require('express');
// // const router = express.Router();
// // const Exam = require('../models/exam');

// // router.post('/upload', async (req, res) => {
// //     try {
// //         const { title, description, questions } = req.body;

// //         if (!title || !questions || questions.length === 0) {
// //             return res.status(400).json({ message: 'Title and questions are required' });
// //         }

// //         const exam = new Exam({ title, description, questions });
// //         await exam.save();

// //         res.status(201).json({ success: true, message: 'Exam uploaded successfully' });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ success: false, message: 'Failed to upload exam' });
// //     }
// // });


// // router.get('/exams', async (req, res) => {
// //     try {
// //         const exams = await Exam.find({}, 'title description'); // Fetch only title and description
// //         res.json(exams);
// //     } catch (error) {
// //         res.status(500).json({ error: 'Failed to fetch exams' });
// //     }
// // });

// // router.get('/exams/:id', async (req, res) => {
// //     try {
// //         const exam = await Exam.findById(req.params.id);
// //         if (!exam) {
// //             return res.status(404).json({ message: 'Exam not found' });
// //         }
// //         res.json(exam);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: 'Failed to fetch exam' });
// //     }
// // });

// // router.post('/exams/:id/submit', async (req, res) => {
// //     try {
// //         const exam = await Exam.findById(req.params.id);
// //         if (!exam) return res.status(404).json({ message: 'Exam not found' });

// //         const { answers } = req.body;
// //         if (!answers || answers.length !== exam.questions.length) {
// //             return res.status(400).json({ message: 'Invalid answers' });
// //         }

// //         let score = 0;
// //         exam.questions.forEach((question, index) => {
// //             if (question.correctAnswer === answers[index]) {
// //                 score++;
// //             }
// //         });

// //         res.json({ score, totalQuestions: exam.questions.length });
// //     } catch (err) {
// //         res.status(500).json({ message: 'Error evaluating exam' });
// //     }
// // });

// // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User'); // Adjust the path to your User model
// // const Exam = require('../models/Exam');

// // // Route to upload a new exam
// // router.post('/upload', async (req, res) => {
// //     try {
// //         const { title, description, questions } = req.body;

// //         // Validate input
// //         if (!title || !questions || questions.length === 0) {
// //             return res.status(400).json({ message: 'Title and questions are required' });
// //         }

// //         // Create and save the new exam
// //         const exam = new Exam({ title, description, questions });
// //         await exam.save();

// //         res.status(201).json({ success: true, message: 'Exam uploaded successfully' });
// //     } catch (err) {
// //         console.error('Failed to upload exam:', err);
// //         res.status(500).json({ success: false, message: 'Failed to upload exam' });
// //     }
// // });

// // // Route to fetch all exams (only title and description)
// // router.get('/exams', async (req, res) => {
// //     try {
// //         const exams = await Exam.find({}, 'title description');
// //         res.json(exams);
// //     } catch (error) {
// //         console.error('Failed to fetch exams:', error);
// //         res.status(500).json({ error: 'Failed to fetch exams' });
// //     }
// // });

// // // Route to fetch a specific exam by ID
// // router.get('/exams/:id', async (req, res) => {
// //     try {
// //         const exam = await Exam.findById(req.params.id);
// //         if (!exam) {
// //             return res.status(404).json({ message: 'Exam not found' });
// //         }
// //         res.json(exam);
// //     } catch (error) {
// //         console.error('Failed to fetch exam:', error);
// //         res.status(500).json({ error: 'Failed to fetch exam' });
// //     }
// // });

// // // Route to submit an exam and track attempts
// // router.post('/exams/:id/submit', async (req, res) => {
// //     const userId = req.user._id; // Get user ID from authentication
// //     const examId = req.params.id;

// //     try {
// //         const exam = await Exam.findById(examId);
// //         if (!exam) {
// //             return res.status(404).json({ message: 'Exam not found' });
// //         }

// //         const user = await User.findById(userId);
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }

// //         if (user.attemptedExams.includes(examId)) {
// //             return res.status(400).json({ message: 'You have already attempted this exam' });
// //         }

// //         const { answers } = req.body;

// //         // Validate answers
// //         if (!answers || answers.length !== exam.questions.length) {
// //             return res.status(400).json({ message: 'Invalid answers' });
// //         }

// //         // Calculate score
// //         let score = 0;
// //         exam.questions.forEach((question, index) => {
// //             if (question.correctAnswer === answers[index]) {
// //                 score++;
// //             }
// //         });

// //         // Track exam attempt
// //         user.attemptedExams.push(examId);
// //         user.attemptCount += 1;
// //         await user.save();

// //         exam.attemptedBy.push(userId);
// //         await exam.save();

// //         res.json({ score, totalQuestions: exam.questions.length });
// //     } catch (err) {
// //         console.error('Error evaluating exam:', err);
// //         res.status(500).json({ message: 'Error evaluating exam' });
// //     }
// // });

// // module.exports = router;


// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User'); // Adjust the path to your User model
// // const Exam = require('../models/Exam');

// // // Route to upload a new exam
// // router.post('/upload', async (req, res) => {
// //     try {
// //         const { title, description, questions } = req.body;

// //         // Validate input
// //         if (!title || !questions || questions.length === 0) {
// //             return res.status(400).json({ message: 'Title and questions are required' });
// //         }

// //         // Create and save the new exam
// //         const exam = new Exam({ title, description, questions });
// //         await exam.save();

// //         res.status(201).json({ success: true, message: 'Exam uploaded successfully' });
// //     } catch (err) {
// //         console.error('Failed to upload exam:', err);
// //         res.status(500).json({ success: false, message: 'Failed to upload exam' });
// //     }
// // });

// // router.get('/exams', async (req, res) => {
// //     try {
// //         const exams = await Exam.find({}, 'title description');
// //         res.json(exams);
// //     } catch (error) {
// //         console.error('Failed to fetch exams:', error);
// //         res.status(500).json({ error: 'Failed to fetch exams' });
// //     }
// // });

// // router.get('/exams/:id', async (req, res) => {
// //     try {
// //         const exam = await Exam.findById(req.params.id);
// //         if (!exam) {
// //             return res.status(404).json({ message: 'Exam not found' });
// //         }
// //         res.json(exam);
// //     } catch (error) {
// //         console.error('Failed to fetch exam:', error);
// //         res.status(500).json({ error: 'Failed to fetch exam' });
// //     }
// // });

// // // Route to submit an exam and track attempts
// // router.post('/exams/:id/submit', async (req, res) => {
// //     const userId = req.user._id; // Get user ID from authentication
// //     const examId = req.params.id;

// //     try {
// //         const exam = await Exam.findById(examId);
// //         if (!exam) {
// //             return res.status(404).json({ message: 'Exam not found' });
// //         }

// //         const user = await User.findById(userId);
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }

// //         if (user.attemptedExams.includes(examId)) {
// //             return res.status(400).json({ message: 'You have already attempted this exam' });
// //         }

// //         const { answers } = req.body;

// //         // Validate answers
// //         if (!answers || answers.length !== exam.questions.length) {
// //             return res.status(400).json({ message: 'Invalid answers' });
// //         }

// //         // Calculate score
// //         let score = 0;
// //         exam.questions.forEach((question, index) => {
// //             if (question.correctAnswer === answers[index]) {
// //                 score++;
// //             }
// //         });

// //         // Track exam attempt
// //         user.attemptedExams.push(examId);
// //         user.attemptCount += 1;
// //         await user.save();

// //         exam.attemptedBy.push(userId);
// //         await exam.save();

// //         res.json({ score, totalQuestions: exam.questions.length });
// //     } catch (err) {
// //         console.error('Error evaluating exam:', err);
// //         res.status(500).json({ message: 'Error evaluating exam' });
// //     }
// // });

// // module.exports = router;


// // const express = require('express');
// // const router = express.Router();
// // const Exam = require('../models/Exam');




// // // Route to upload a new exam
// // router.post('/upload', async (req, res) => {
// //     try {
// //         const { title, description, questions } = req.body;

// //         // Validate input
// //         if (!title || !questions || questions.length === 0) {
// //             return res.status(400).json({ message: 'Title and questions are required' });
// //         }

// //         // Create and save the new exam
// //         const exam = new Exam({ title, description, questions });
// //         await exam.save();

// //         res.status(201).json({ success: true, message: 'Exam uploaded successfully' });
// //     } catch (err) {
// //         console.error('Failed to upload exam:', err);
// //         res.status(500).json({ success: false, message: 'Failed to upload exam' });
// //     }
// // });



// // // Route to fetch all exams (only title and description)
// // router.get('/exams', async (req, res) => {
// //     try {
// //         const exams = await Exam.find({}, 'title description');
// //         res.json(exams);
// //     } catch (error) {
// //         console.error('Failed to fetch exams:', error);
// //         res.status(500).json({ error: 'Failed to fetch exams' });
// //     }
// // });

// // // Route to fetch an exam by ID
// // router.get('/exams/:id', async (req, res) => {
// //     try {
// //         const exam = await Exam.findById(req.params.id).select('title description questions');
// //         res.json(exam);
// //     } catch (error) {
// //         console.error('Failed to fetch exam:', error);
// //         res.status(500).json({ error: 'Failed to fetch exam' });
// //     }
// // });



// // // Route to submit an exam
// // router.post('/exam/:id/submit', async (req, res) => {
// //     try {
// //         const exam = await Exam.findById(req.params.id);
// //         if (!exam) {
// //             return res.status(404).json({ message: 'Exam not found' });
// //         }

// //         const { answers } = req.body;

// //         // Validate answers
// //         if (!answers || answers.length !== exam.questions.length) {
// //             return res.status(400).json({ message: 'Invalid answers' });
// //         }

// //         // Calculate score
// //         let score = 0;
// //         exam.questions.forEach((question, index) => {
// //             if (question.correctAnswer === answers[index]) {
// //                 score++;
// //             }
// //         });

// //         res.json({ score, totalQuestions: exam.questions.length });
// //     } catch (err) {
// //         console.error('Error evaluating exam:', err);
// //         res.status(500).json({ message: 'Error evaluating exam' });
// //     }
// // });

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { getExams, getExamById, submitAnswers } = require('../controllers/examController');

// // Route to upload a new exam
// router.post('/upload', async (req, res) => {
//     try {
//         const { title, description, questions } = req.body;

//         if (!title || !questions || questions.length === 0) {
//             return res.status(400).json({ message: 'Title and questions are required' });
//         }

//         const exam = new Exam({ title, description, questions });
//         await exam.save();

//         res.status(201).json({ success: true, message: 'Exam uploaded successfully' });
//     } catch (err) {
//         console.error('Failed to upload exam:', err);
//         res.status(500).json({ success: false, message: 'Failed to upload exam' });
//     }
// });

// // Route to fetch all exams (only title and description)
// router.get('/exams', getExams);

// // Route to fetch an exam by ID
// router.get('/exams/:id', getExamById);

// // Route to submit an exam
// router.post('/exams/:id/submit', submitAnswers);

// module.exports = router;



