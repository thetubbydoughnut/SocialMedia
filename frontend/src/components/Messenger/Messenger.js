import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Messenger.css';

const socket = io('http://localhost:9000'); // Ensure this matches your server URL and port

const Messenger = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        console.log('Messenger component mounted');
        socket.on('receiveMessage', (message) => {
            console.log('Message received:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        const message = {
            sender: 'User1', // Replace with actual sender
            receiver: 'User2', // Replace with actual receiver
            content: newMessage,
            timestamp: new Date()
        };

        console.log('Sending message:', message);
        socket.emit('sendMessage', message);
        setNewMessage('');
    };

    return (
        <div className="messenger">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Messenger;