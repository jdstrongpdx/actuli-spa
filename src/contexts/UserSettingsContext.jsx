import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const UserSettingsContext = createContext(undefined);

// Define the provider component
export const UserSettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Initialize theme from localStorage or default to 'light'
        const savedTheme = localStorage.getItem('app-theme');
        return savedTheme || 'light';
    });

    // Toggle Theme function
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('app-theme', newTheme);
    };

    useEffect(() => {
        // Removed `document.body.className = theme`.
        // Logic moved to dynamically applied class in App.js.
    }, [theme]);


    return (
        <UserSettingsContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </UserSettingsContext.Provider>
    );
};

export const useUserSettings = () => {
    const context = useContext(UserSettingsContext);
    if (!context) {
        throw new Error('useUserSettings must be used within a UserSettingsProvider');
    }
    return context;
};