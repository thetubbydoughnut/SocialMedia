import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import socket from '../../utils/socket'; // Import the singleton socket
import './Messenger.css';

const Messenger = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/chats');
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };
        fetchChats();
    }, []);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/chats/${id}`);
                setChat(response.data);
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        };
        fetchChat();
    }, [id]);

    useEffect(() => {
        const handleConnect = () => {
            console.log('Connected to Socket.io server');
        };

        const handleMessage = (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        };

        const handleDisconnect = () => {
            console.log('Disconnected from Socket.io server');
        };

        socket.on('connect', handleConnect);
        socket.on('message', handleMessage);
        socket.on('disconnect', handleDisconnect);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('message', handleMessage);
            socket.off('disconnect', handleDisconnect);
            // Do not disconnect the socket here to keep it alive for other components
        };
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            const newMessage = {
                sender: 'Current User', // Replace with actual user data
                text: message,
                timestamp: new Date().toISOString(),
            };
            socket.emit('sendMessage', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    if (!chat) {
        return <div>Loading...</div>;
    }

    return (
        <div className="messenger">
            <div className="chat-list-container">
                <h2>Available Chats</h2>
                <ul className="chat-list">
                    {chats.map(chat => (
                        <li key={chat.id} className="chat-list-item">
                            {chat.participants.map(participant => (
                                <div key={participant.name} className="chat-participant">
                                    <img src={participant.profilePicture} alt={participant.name} className="chat-participant-picture" />
                                    <span>{participant.name}</span>
                                </div>
                            ))}
                            <Link to={`/messenger/${chat.id}`} className="chat-link">
                                Open Chat
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-container">
                <h2>Chat between {chat.participants.map(p => p.name).join(' and ')}</h2>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === 'Current User' ? 'message--sent' : 'message--received'}`}>
                            <div className="message-sender">{msg.sender}</div>
                            <div className="message-text">{msg.text}</div>
                            <div className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage} className="message-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        required
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Messenger;