import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme'; 

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderComponent = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDark')==='true'? true:false);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev); 
    };

    const theme = createTheme(isDarkMode ? darkTheme : lightTheme); 

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setIsDarkMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
