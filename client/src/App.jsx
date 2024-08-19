import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UploadExam from './pages/UploadExam';
import ExamList from './pages/ExamList';
import Exam from './pages/Exam';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import the AuthProvider and useAuth
import { ThemeProvider } from './context/ThemeProvider'; // Import ThemeProvider
import PostsPage from './pages/PostsPage';
import CreatePostPage from './pages/CreatePostPage';
import NotFound from './pages/NotFound'; // Import NotFound page
import './App.css'; // Import global styles

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Navbar />
                <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        
                        {/* Protected Routes */}
                        <Route path='/upload-exam' element={<ProtectedRoute><UploadExam /></ProtectedRoute>} />
                        <Route path='/exams' element={<ExamList />} />
                        <Route path='/exam/:id' element={<Exam />} />
                        <Route path='/posts' element={<PostsPage />} />
                        <Route path='/create-post' element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
                        
                        {/* 404 Page */}
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>
            </ThemeProvider>
        </AuthProvider>
    );
};

// // Protected Route Component
// function ProtectedRoute({ children }) {
//     const { isAuthenticated } = useAuth();
//     return isAuthenticated ? children : <Navigate to="/login" />;
// }
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}


export default App;





// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import UploadExam from './pages/UploadExam';
// import ExamList from './pages/ExamList';
// import Exam from './pages/Exam';
// import Navbar from './components/Navbar';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
// // import NotificationsPage from './pages/NotificationsPage';
// import PostsPage from './pages/PostsPage';
// import CreatePostPage from './pages/CreatePostPage';

// const App = () => {
//     return (
//         <AuthProvider>
//             <Navbar />
//             <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
//             <Routes>
//                 <Route path='/' element={<Home />} />
//                 <Route path='/login' element={<Login />} />
//                 <Route path='/register' element={<Register />} />
//                 <Route path='/upload-exam' element={<UploadExam />} />
//                 <Route path='/exams' element={<ExamList />} />
//                 <Route path='/exam/:id' element={<Exam />} />
//                 {/* <Route path="/notifications" element={<NotificationsPage />} /> */}
//                 <Route path="/posts" element={<PostsPage />} />
//                 <Route path="/create-post" element={<CreatePostPage />} />
//             </Routes>
//         </AuthProvider>
//     );
// };

// export default App;
