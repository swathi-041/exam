import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthContext';
import { useContext } from 'react';

// Test component to utilize the AuthContext
const TestComponent = () => {
    const { userRole, login, logout } = useContext(AuthContext);

    return (
        <div>
            <button onClick={() => login('teacher')}>Login as Teacher</button>
            <button onClick={() => logout()}>Logout</button>
            <p>Role: {userRole || ''}</p>
        </div>
    );
};

// Test for managing user role
test('should manage user role correctly', () => {
    render(
        <AuthProvider>
            <TestComponent />
        </AuthProvider>
    );

    // Test login functionality
    fireEvent.click(screen.getByText('Login as Teacher'));
    expect(screen.getByText('Role: teacher')).toBeInTheDocument();

    // Test logout functionality
    fireEvent.click(screen.getByText('Logout'));
    expect(screen.getByText('Role:')).toBeInTheDocument();
});





// import { render, screen, fireEvent } from '@testing-library/react';
// import { AuthProvider, AuthContext } from './AuthContext';
// import { useContext } from 'react';

// const TestComponent = () => {
//     const { userRole, login, logout } = useContext(AuthContext);

//     return (
//         <div>
//             <button onClick={() => login('teacher')}>Login as Teacher</button>
//             <button onClick={() => logout()}>Logout</button>
//             <p>Role: {userRole || ''}</p>
//         </div>
//     );
// };

// test('should manage user role correctly', () => {
//     render(
//         <AuthProvider>
//             <TestComponent />
//         </AuthProvider>
//     );

//     // Test login functionality
//     fireEvent.click(screen.getByText('Login as Teacher'));
//     expect(screen.getByText('Role: teacher')).toBeInTheDocument();

//     // Test logout functionality
//     fireEvent.click(screen.getByText('Logout'));
//     expect(screen.getByText('Role:')).toBeInTheDocument();
// });
