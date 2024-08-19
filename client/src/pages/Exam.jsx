// // src/pages/Exam.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';


// export default function Exam() {
//     const { id } = useParams();
//     const [exam, setExam] = useState(null);
//     const [attempted, setAttempted] = useState(false);
//     const { userRole } = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchExam = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5002/exams/${id}`);
//                 setExam(response.data.exam);
//                 const userResponse = await axios.get(`http://localhost:5002/users/me`);
//                 const attemptedExams = userResponse.data.user.attemptedExams;
//                 setAttempted(attemptedExams.includes(id));
//             } catch (error) {
//                 console.error('Error fetching exam data', error);
//             }
//         };
//         fetchExam();
//     }, [id]);

//     const handleAttempt = async () => {
//         if (attempted) {
//             alert('You have already attempted this exam.');
//             return;
//         }
//         try {
//             await axios.post(`http://localhost:5002/exams/attempt-exam/${id}`);
//             setAttempted(true);
//             alert('Exam attempted successfully.');
//         } catch (error) {
//             console.error('Error attempting exam', error);
//         }
//     };

//     return (
//         <div>
//             {exam ? (
//                 <>
//                     <h1>{exam.title}</h1>
//                     <p>{exam.description}</p>
//                     {/* Display exam questions and options here */}
//                     <button onClick={handleAttempt} disabled={attempted}>
//                         {attempted ? 'Already Attempted' : 'Attempt Exam'}
//                     </button>
//                 </>
//             ) : (
//                 <p>Loading exam...</p>
//             )}
//         </div>
//     );
// }
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export default function Exam() {
//     const { id } = useParams();
//     const [exam, setExam] = useState(null);
//     const [attempted, setAttempted] = useState(false);
//     const { userRole } = useContext(AuthContext); // This can be used if needed
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchExam = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5002/exams/${id}`);
//                 setExam(response.data); // Adjust this if your backend response has a different structure
//                 const userResponse = await axios.get(`http://localhost:5002/users/me`);
//                 const attemptedExams = userResponse.data.attemptedExams; // Adjust this if your backend response has a different structure
//                 setAttempted(attemptedExams.includes(id));
//             } catch (error) {
//                 console.error('Error fetching exam data', error);
//             }
//         };
//         fetchExam();
//     }, [id]);

//     const handleAttempt = async () => {
//         if (attempted) {
//             alert('You have already attempted this exam.');
//             return;
//         }
//         try {
//             await axios.post(`http://localhost:5002/exam/${id}/submit`, { answers: [] }); // Ensure your backend endpoint and data format match
//             setAttempted(true);
//             alert('Exam attempted successfully.');
//         } catch (error) {
//             console.error('Error attempting exam', error);
//         }
//     };

//     return (
//         <div>
//             {exam ? (
//                 <>
//                     <h1>{exam.title}</h1>
//                     <p>{exam.description}</p>
//                     {/* Display exam questions and options here */}
//                     <button onClick={handleAttempt} disabled={attempted}>
//                         {attempted ? 'Already Attempted' : 'Attempt Exam'}
//                     </button>
//                 </>
//             ) : (
//                 <p>Loading exam...</p>
//             )}
//         </div>
//     );
// }

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function Exam() {
//     const { id } = useParams(); // Get the exam ID from the route params
//     const [exam, setExam] = useState(null);

//     useEffect(() => {
//         async function fetchExam() {
//             try {
//                 const response = await axios.get(`http://localhost:5002/api/exams/${id}`); // Fetch exam by ID
//                 setExam(response.data);
//             } catch (error) {
//                 console.error('Error fetching exam:', error);
//             }
//         }
//         fetchExam();
//     }, [id]);

//     if (!exam) {
//         return <p>Loading exam...</p>;
//     }

//     return (
//         <div>
//             <h1>{exam.title}</h1>
//             <p>{exam.description}</p>

//             {/* Loop through the questions and display them */}
//             {exam.questions.map((question, index) => (
//                 <div key={index}>
//                     <h3>Question {index + 1}: {question.questionText}</h3>
//                     <ul>
//                         {question.options.map((option, idx) => (
//                             <li key={idx}>{option}</li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
        
//         </div>
//     );
// }


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; // Assuming you're using react-hot-toast
import './ExamList.css'
export default function Exam() {
    const { id } = useParams(); // Get the exam ID from the route params
    const [exam, setExam] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [score, setScore] = useState(null); // For storing the score after submission

    useEffect(() => {
        async function fetchExam() {
            try {
                const response = await axios.get(`http://localhost:5002/api/exams/${id}`); // Fetch exam by ID
                setExam(response.data);
                // Initialize selectedAnswers with null values based on the number of questions
                setSelectedAnswers(new Array(response.data.questions.length).fill(null));
            } catch (error) {
                console.error('Error fetching exam:', error);
            }
        }
        fetchExam();
    }, [id]);

    // Handle selecting an option
    const handleSelectAnswer = (questionIndex, optionIndex) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = optionIndex;
        setSelectedAnswers(updatedAnswers);
    };

    // Handle form submission and calculate the score
    const handleSubmit = async () => {
        if (!exam) return; // Prevent submission if exam data is not available

        try {
            let calculatedScore = 0;
            exam.questions.forEach((question, index) => {
                // Compare the selected answer with the correct answer
                if (selectedAnswers[index] !== null && question.options[selectedAnswers[index]] === question.correctAnswer) {
                    calculatedScore++;
                }
            });

            setScore(calculatedScore);

            // Display score using toast
            toast.success(`Your score: ${calculatedScore}/${exam.questions.length}`);
        } catch (error) {
            console.error('Error calculating score:', error);
            toast.error('Failed to submit exam');
        }
    };

    if (!exam) {
        return <p>Loading exam...</p>;
    }

    return (
        <div>
            <h1>{exam.title}</h1>
            <p>{exam.description}</p>

            {/* Loop through the questions and display them */}
            {exam.questions.map((question, index) => (
                <div key={index}>
                    <h3>Question {index + 1}: {question.question}</h3>
                    <ul>
                        {question.options.map((option, idx) => (
                            <li key={idx}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={idx}
                                        checked={selectedAnswers[index] === idx}
                                        onChange={() => handleSelectAnswer(index, idx)}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Submit button */}
            <button onClick={handleSubmit}>Submit Exam</button>
        </div>
    );
}
