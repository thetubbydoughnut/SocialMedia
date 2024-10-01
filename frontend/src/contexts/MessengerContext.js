import React, { createContext, useState, useEffect } from 'react';
import socket from '../utils/socket';
import axios from 'axios';

export const MessengerContext = createContext();

export const MessengerProvider = ({ children }) => {
    const [conversations, setConversations] = useState({});
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Connect to socket and join user room
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split('.')[1]));
            socket.emit('join', user.userId);
        }

        // Listen for incoming messages
        socket.on('receiveMessage', (message) => {
            if (message.senderId === currentChat) {
                setMessages(prev => [...prev, message]);
            }
            // Optionally, update conversation preview
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [currentChat]);

    const fetchMessages = async (userId) => {
        try {
            const response = await axios.get(`/messages/${userId}`);
            setMessages(response.data.reverse());
            setCurrentChat(userId);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (receiverId, content) => {
        try {
            const response = await axios.post('/messages', { receiverId, content });
            setMessages(prev => [...prev, response.data]);
            socket.emit('sendMessage', response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <MessengerContext.Provider value={{ conversations, fetchMessages, currentChat, messages, sendMessage }}>
            {children}
        </MessengerContext.Provider>
    );
};