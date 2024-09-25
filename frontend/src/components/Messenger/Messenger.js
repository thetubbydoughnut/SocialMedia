import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messenger.css';

const Messenger = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch messages from the server
        axios.get('/messages')
            .then(response => setMessages(response.data))
            .catch(error => console.error('Error fetching messages:', error));
    }, []);

    const sendMessage = () => {
        const message = {
            sender: 'User1', // Replace with actual sender
            receiver: 'User2', // Replace with actual receiver
            content: newMessage
        };

        axios.post('/messages', message)
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch(error => console.error('Error sending message:', error));
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