import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './Register.css';

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (data.password.length < 8) {
            setError("Password must be at least 8 characters long!");
            return;
        }

        if (!data.role) {
            setError("Please select a role!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5002/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role,
            });

            if (response.data.success) {
                toast.success('User registered successfully');
                setData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "student",
                });
                navigate('/login');
            } else {
                toast.error(response.data.error || 'Registration failed');
            }
        } catch (error) {
            setError("Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create an Account</h2>
                <form onSubmit={registerUser} className="register-form">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                        <input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            required
                        />
                        <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                            {passwordVisible ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-wrapper">
                        <input
                            id="confirmPassword"
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder="Confirm password"
                            value={data.confirmPassword}
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                            required
                        />
                        <button type="button" className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                            {confirmPasswordVisible ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={data.role}
                        onChange={(e) => setData({ ...data, role: e.target.value })}
                        required
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="register-button">Register</button>

                    <p className="login-link">
                        Already have an account? <a href="/login">Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
