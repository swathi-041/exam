import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './UploadExam.css';
export default function UploadExam() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        if (field === 'question') {
            updatedQuestions[index].question = value;
        } else if (field === 'correctAnswer') {
            updatedQuestions[index].correctAnswer = value;
        } else {
            const optionIndex = parseInt(field.split('-')[1], 10);
            updatedQuestions[index].options[optionIndex] = value;
        }
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { question: '', options: ['', '', '', ''], correctAnswer: '' }
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5002/api/exams/upload', {
                title,
                description,
                questions
            });
            toast.success('Exam uploaded successfully!');
            setTitle('');
            setDescription('');
            setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
        } catch (error) {
            console.error('Error uploading exam:', error);
            toast.error('Failed to upload exam');
        }
    };

    return (
        <div className="upload-exam-container">
            <h1 className="upload-exam-title">Upload Exam</h1>
            <form onSubmit={handleSubmit} className="upload-exam-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea-field"
                    />
                </div>
                {questions.map((question, index) => (
                    <div key={index} className="question-container">
                        <label>Question {index + 1}:</label>
                        <input
                            type="text"
                            value={question.question}
                            onChange={(e) =>
                                handleQuestionChange(index, 'question', e.target.value)
                            }
                            className="input-field"
                            required
                        />
                        <div className="options-container">
                            {question.options.map((option, i) => (
                                <div key={i} className="option-field">
                                    <label>Option {i + 1}:</label>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) =>
                                            handleQuestionChange(index, `option-${i}`, e.target.value)
                                        }
                                        className="input-field"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <label>Correct Answer:</label>
                        <input
                            type="text"
                            value={question.correctAnswer}
                            onChange={(e) =>
                                handleQuestionChange(index, 'correctAnswer', e.target.value)
                            }
                            className="input-field"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addQuestion} className="button add-question-button">
                    Add Another Question
                </button>
                <button type="submit" className="button submit-button">Upload Exam</button>
            </form>
        </div>
    );
}
