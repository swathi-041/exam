import { createContext, useContext, useState } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Default to 'light' mode

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
