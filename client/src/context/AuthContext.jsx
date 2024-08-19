import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    const isAuthenticated = userRole !== null;

    const login = (role) => {
        setUserRole(role);
        // Additional login logic (e.g., saving token to localStorage)
    };

    const logout = () => {
        setUserRole(null);
        // Additional logout logic (e.g., clearing token from localStorage)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};























// import { createContext, useState } from 'react';

// // Create AuthContext
// export const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//     const [userRole, setUserRole] = useState('');

//     const login = (role) => {
//         setUserRole(role);
//     };

//     const logout = () => {
//         setUserRole('');
//     };

//     return (
//         <AuthContext.Provider value={{ userRole, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// import { createContext, useState, useContext } from 'react';

// export const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//     const [userRole, setUserRole] = useState(null);

//     const login = (role) => {
//         setUserRole(role);
//         // Additional login logic (e.g., saving token to localStorage)
//     };

//     const logout = () => {
//         setUserRole(null);
//         // Additional logout logic (e.g., clearing token from localStorage)
//     };

//     return (
//         <AuthContext.Provider value={{ userRole, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
