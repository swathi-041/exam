// import { useState, useContext } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; // Import the context

// export default function Login() {
//     const navigate = useNavigate();
//     const { login } = useContext(AuthContext); // Use login function from context
//     const [data, setData] = useState({
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState('');

//     const loginUser = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5002/auth/login', {
//                 email: data.email,
//                 password: data.password
//             });

//             if (response.data.success) {
//                 // Save role using context
//                 login(response.data.role); // Set the user's role in context
//                 toast.success('Login successful');
//                 navigate('/');
//             } else {
//                 toast.error(response.data.error || 'Login failed');
//             }
//         } catch (error) {
//             setError('Login failed. Please try again.');
//             console.error('Login error:', error);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={loginUser}>
//                 <label>Email</label>
//                 <input
//                     type='email'
//                     placeholder='Enter email'
//                     value={data.email}
//                     onChange={(e) => setData({ ...data, email: e.target.value })}
//                     required
//                 />
//                 <label>Password</label>
//                 <input
//                     type='password'
//                     placeholder='Enter password'
//                     value={data.password}
//                     onChange={(e) => setData({ ...data, password: e.target.value })}
//                     required
//                 />
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <button type='submit'>Login</button>
//             </form>
//         </div>
//     );
// }


import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the context
import { useTheme } from '../context/ThemeProvider'; // Import useTheme
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use login function from context
    const { theme } = useTheme(); // Use theme from context
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/auth/login', {
                email: data.email,
                password: data.password
            });

            if (response.data.success) {
                // Save role using context
                login(response.data.role); // Set the user's role in context
                toast.success('Login successful');
                navigate('/');
            } else {
                toast.error(response.data.error || 'Login failed');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className={`login-container ${theme}`}>
            <form onSubmit={loginUser} className="login-form">
                <h2>Login</h2>
                <label >Email</label>
                <input
                    type='email'
                    placeholder='Enter email'
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                />
                <label>Password</label>
                <input
                    type='password'
                    placeholder='Enter password'
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />
                <button type='submit'>Login</button>
                {error && <p className="error">{error}</p>}
                <p className="signup-link">
                    Don't have an account? <a href="/register">Sign Up</a>
                </p>
            </form>
        </div>
    );
}
