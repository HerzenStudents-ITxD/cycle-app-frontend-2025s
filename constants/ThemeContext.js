import React, { createContext, useState, useContext } from 'react';

export const COLORS = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        inputBorder: '#F4CDB0',
        inputBackground: '#FFFFFF',
        buttonActive: '#F4CDB0',
        buttonInactive: '#FFFFFF',
        buttonTextActive: '#FFFFFF',
        buttonTextInactive: '#000000',
        logoutText: '#F4CDB0',
        modalBackground: '#FFFFFF',
        modalText: '#000000',
        cancelButton: '#EEEEEE',
        headerBackground: '#FFFFFF',
        headerText: '#000000',
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        inputBorder: '#555',
        inputBackground: '#333',
        buttonActive: '#F4CDB0',
        buttonInactive: '#333',
        buttonTextActive: '#FFFFFF',
        buttonTextInactive: '#FFFFFF',
        logoutText: '#F4CDB0',
        modalBackground: '#333',
        modalText: '#FFFFFF',
        cancelButton: '#555',
        headerBackground: '#1E1E1E',
        headerText: '#FFFFFF',
    }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false);
    const colors = darkTheme ? COLORS.dark : COLORS.light;

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    return (
        <ThemeContext.Provider value={{ darkTheme, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);