// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// export default function ExamDetail() {
//     const { title } = useParams();
//     const [exam, setExam] = useState(null);
//     const [attempts, setAttempts] = useState([]);

//     useEffect(() => {
//         async function fetchExam() {
//             try {
//                 const response = await axios.get(`https://eduquestt.onrender.com/api/exams/${title}`);
//                 setExam(response.data);
//             } catch (err) {
//                 console.error('Error fetching exam details:', err);
//             }
//         }

//         async function fetchAttempts() {
//             try {
//                 const response = await axios.get(`https://eduquestt.onrender.com/api/attempts/${title}`); // Update API endpoint for fetching attempts
//                 setAttempts(response.data);
//             } catch (err) {
//                 console.error('Error fetching attempts:', err);
//             }
//         }

//         fetchExam();
//         fetchAttempts();
//     }, [title]);

//     if (!exam) return <p>Loading...</p>;

//     return (
//         <div>
//             <h1>{exam.title}</h1>
//             <p>{exam.description}</p>
//             <h2>Questions</h2>
//             <ul>
//                 {exam.questions.map((question, index) => (
//                     <li key={index}>
//                         <p>{question.question}</p>
//                         <ul>
//                             {question.options.map((option, idx) => (
//                                 <li key={idx}>{option}</li>
//                             ))}
//                         </ul>
//                         <p>Correct Answer: {question.correctAnswer}</p>
//                     </li>
//                 ))}
//             </ul>
//             <h2>Attempts</h2>
//             <ul>
//                 {attempts.map((attempt) => (
//                     <li key={attempt._id}>
//                         User: {attempt.userId} | Score: {attempt.score}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ExamDetail() {
    const { title } = useParams();
    const [exam, setExam] = useState(null);
    const [attempted, setAttempted] = useState(false);

    useEffect(() => {
        async function fetchExam() {
            try {
                const response = await axios.get(`https://eduquestt.onrender.com/api/exams/${title}`);
                setExam(response.data);
            } catch (err) {
                console.error('Error fetching exam details:', err);
            }
        }

        fetchExam();
    }, [title]);

    const handleAttempt = async () => {
        if (attempted) {
            alert('You have already attempted this exam.');
            return;
        }
        try {
            await axios.post(`https://eduquestt.onrender.com/api/exams/${title}/attempt`);
            setAttempted(true);
            alert('Exam attempted successfully.');
        } catch (err) {
            console.error('Error attempting exam:', err);
        }
    };

    if (!exam) return <p>Loading...</p>;

    return (
        <div>
            <h1>{exam.title}</h1>
            <p>{exam.description}</p>
            <h2>Questions</h2>
            <ul>
                {exam.questions.map((question, index) => (
                    <li key={index}>
                        <p>{question.question}</p>
                        <ul>
                            {question.options.map((option, idx) => (
                                <li key={idx}>{option}</li>
                            ))}
                        </ul>
                        {/* Correct answer is not displayed here */}
                    </li>
                ))}
            </ul>
            <button onClick={handleAttempt} disabled={attempted}>
                {attempted ? 'Already Attempted' : 'Attempt Exam'}
            </button>
        </div>
    );
}
