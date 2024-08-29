// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function ExamList() {
//     const [exams, setExams] = useState([]);

//     useEffect(() => {
//         async function fetchExams() {
//             try {
//                 const response = await axios.get('https://eduquestt.onrender.com/api/exams');
//                 setExams(response.data);
//             } catch (error) {
//                 console.error('Error fetching exams:', error);
//             }
//         }
//         fetchExams();
//     }, []);

//     return (
//         <div>
//             <h1>Available Exams</h1>
//             <ul>
//                 {exams.map(exam => (
//                     <li key={exam._id}>
//                         <h2>{exam.title}</h2>
//                         <p>{exam.description}</p>
//                         <Link to={`/exam/${exam._id}`}>Take Exam</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ExamList() {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchExams() {
            try {
                const response = await axios.get('https://eduquestt.onrender.com/api/exams');
                console.log('Fetched exams:', response.data); // Add this line
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        }
        fetchExams();
    }, []);

    const takeExam = (id) => {
        console.log('Navigating to exam with ID:', id); // Add this line
        navigate(`/exam/${id}`);
    };

    return (
        <div className="container">
            <h1>Available Exams</h1>
            <ul>
                {exams.map(exam => (
                    <li key={exam._id}>
                        <h2>{exam.title}</h2>
                        <p>{exam.description}</p>
                        <button onClick={() => takeExam(exam._id)}>Take Exam</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

