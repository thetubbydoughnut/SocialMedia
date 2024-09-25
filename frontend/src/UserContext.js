import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch the username from the server
        fetch('/api/getUsername')
            .then(response => response.json())
            .then(data => setUsername(data.username));
    }, []);

    return (
        <UserContext.Provider value={username}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);