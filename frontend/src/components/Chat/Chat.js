import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = ({ chatId }) => {
    const [chat, setChat] = useState(null);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/chats/${chatId}`);
                setChat(response.data);
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        };
        fetchChat();
    }, [chatId]);

    if (!chat) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chat">
            <h2>Chat between {chat.participants.join(' and ')}</h2>
            <div className="chat__messages">
                {chat.messages.map((message, index) => (
                    <div key={index} className={`chat__message ${message.sender === 'John Doe' ? 'chat__message--sent' : 'chat__message--received'}`}>
                        <div className="chat__message-sender">{message.sender}</div>
                        <div className="chat__message-text">{message.text}</div>
                        <div className="chat__message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;