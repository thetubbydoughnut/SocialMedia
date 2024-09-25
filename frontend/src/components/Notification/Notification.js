import React, { useEffect, useState } from 'react';
import socket from '../../utils/socket'; // Import the singleton socket

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const handleNotification = (notification) => {
            setNotifications((prev) => [...prev, notification]);
        };

        const handleConnect = () => {
            console.log('Connected to Socket.io server');
        };

        const handleDisconnect = () => {
            console.log('Disconnected from Socket.io server');
        };

        socket.on('notification', handleNotification);
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);

        return () => {
            socket.off('notification', handleNotification);
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            // Do not disconnect the socket here to keep it alive for other components
        };
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;