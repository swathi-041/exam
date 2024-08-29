import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UploadExam from './pages/UploadExam';
import ExamList from './pages/ExamList';
import Exam from './pages/Exam';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import PostsPage from './pages/PostsPage';
import CreatePostPage from './pages/CreatePostPage';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </AuthProvider>
    );
};

const AppContent = () => {
    const { toggleTheme } = useTheme();

    return (
        <>
            <Navbar toggleTheme={toggleTheme} />
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    
                    {/* Protected Routes */}
                    <Route path='/upload-exam' element={<ProtectedRoute roleRequired="teacher"><UploadExam /></ProtectedRoute>} />
                    <Route path='/exams' element={<ExamList />} />
                    <Route path='/exam/:id' element={<Exam />} />
                    <Route path='/posts' element={<PostsPage />} />
                    <Route path='/create-post' element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
                    
                    {/* 404 Page */}
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
};

function ProtectedRoute({ children, roleRequired }) {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated || (roleRequired && userRole !== roleRequired)) {
        return <Navigate to="/login" />;
    }

    return children;
}

// Add PropTypes validation for ProtectedRoute
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,    // children is required and should be a valid React node
    roleRequired: PropTypes.string,         // roleRequired is optional but should be a string if provided
};

export default App;
