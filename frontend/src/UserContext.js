import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axiosInstance from './utils/axiosInstance';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                return;
            }
            try {
                const response = await axiosInstance.get('/profile/me');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const contextValue = useMemo(() => user, [user]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);