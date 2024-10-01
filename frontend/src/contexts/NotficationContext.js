import React, { createContext, useState, useEffect } from 'react';
import socket from '../utils/socket';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Connect to socket and join user room
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split('.')[1]));
            socket.emit('join', user.userId);
        }

        // Fetch existing notifications
        axios.get('/notifications')
            .then(response => setNotifications(response.data))
            .catch(err => console.error(err));

        // Listen for new notifications
        socket.on('newNotification', (notification) => {
            setNotifications(prev => [notification, ...prev]);
        });

        return () => {
            socket.off('newNotification');
        };
    }, []);

    const markAsRead = (id) => {
        axios.put(`/notifications/${id}/read`)
            .then(response => {
                setNotifications(prev => prev.map(n => n.id === id ? response.data : n));
            })
            .catch(err => console.error(err));
    };

    return (
        <NotificationContext.Provider value={{ notifications, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};