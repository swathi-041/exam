// import PropTypes from 'prop-types';
// import { Link, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export default function Navbar({ toggleTheme }) {
//     const { userRole, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     return (
//         <nav>
//             <Link to="/">Home</Link>
//             {!userRole && <Link to="/login">Login</Link>}
//             {!userRole && <Link to="/register">Register</Link>}
//             {userRole === 'teacher' && <Link to="/upload-exam">Upload Exam</Link>}
//             <Link to="/exams">Available Exams</Link>
//             {userRole && <button onClick={handleLogout}>Logout</button>}
//             <Link to="/posts">Posts</Link>
//             <button onClick={toggleTheme}>Toggle Theme</button> {/* Assuming a theme toggle button */}
//         </nav>
//     );
// }

// Navbar.propTypes = {
//     toggleTheme: PropTypes.func.isRequired, // Validate the toggleTheme prop
// };























// // import { Link, useNavigate } from 'react-router-dom';
// // import { useContext } from 'react';
// // import { AuthContext } from '../context/AuthContext';

// // export default function Navbar() {
// //     const { userRole, logout } = useContext(AuthContext); // Use context to get role and logout function
// //     const navigate = useNavigate();

// //     const handleLogout = () => {
// //         logout(); // Reset the role and user state in the context
// //         navigate('/login'); // Navigate to the login page
// //     };

// //     return (
// //         <nav>
// //             <Link to="/">Home</Link>
// //             {!userRole && <Link to="/login">Login</Link>}
// //             {!userRole && <Link to="/register">Register</Link>}
// //             {userRole === 'teacher' && <Link to="/upload-exam">Upload Exam</Link>}
// //             <Link to="/exams">Available Exams</Link>
// //             {userRole && <button onClick={handleLogout}>Logout</button>} {/* Show Logout if logged in */}
// //             {/* <Link to="/notifications">Notifications</Link> */}
// //             <Link to="/posts">Posts</Link>
// //         </nav>
// //     );
// // }

import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeProvider'; // Import useTheme
import './Navbar.css';
import logo from '../assets/logo.png'; // Import your logo image

export default function Navbar() {
    const { userRole, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme(); // Use theme and toggleTheme from context

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className={`navbar ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
            <div className="navbar-logo">
                <img src={logo} alt="Logo" className="logo" /> {/* Logo */}
            </div>
            <nav>
                <Link to="/">Home</Link>
                {!userRole && <Link to="/login">Login</Link>}
                {!userRole && <Link to="/register">Register</Link>}
                {userRole === 'teacher' && <Link to="/upload-exam">Upload Exam</Link>}
                <Link to="/exams">Available Exams</Link>
                {userRole && <button onClick={handleLogout}>Logout</button>}
                <Link to="/posts">Posts</Link>
                <button onClick={toggleTheme}>Toggle Theme</button>
            </nav>
        </header>
    );
}

Navbar.propTypes = {
    toggleTheme: PropTypes.func.isRequired, // Validate the toggleTheme prop
};
