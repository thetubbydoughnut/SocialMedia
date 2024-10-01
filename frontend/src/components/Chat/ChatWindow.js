import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, addMessage } from '../../slices/messagesSlice';
import axios from 'axios';
import socket from '../../socket';
import './ChatWindow.css';

function ChatWindow() {
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.chats.activeChat);
  const messages = useSelector((state) => state.messages.items[activeChat?.id] || []);
  const user = useSelector((state) => state.auth.user);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (activeChat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/chats/${activeChat.id}/messages`);
          dispatch(setMessages({ chatId: activeChat.id, messages: response.data }));
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [activeChat, dispatch]);

  useEffect(() => {
    if (activeChat) {
      // Join chat room
      socket.emit('join_chat', activeChat.id);

      // Listen for new messages
      socket.on('new_message', (message) => {
        if (message.chat_id === activeChat.id) {
          dispatch(addMessage({ chatId: activeChat.id, message }));
        }
      });
    }

    return () => {
      if (activeChat) {
        socket.emit('leave_chat', activeChat.id);
        socket.off('new_message');
      }
    };
  }, [activeChat, dispatch]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    try {
      await axios.post(`/chats/${activeChat.id}/messages`, { content: input });
      setInput('');
      // The new message will be received via Socket.io
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!activeChat) {
    return <div className="chat-window">Select a chat to start messaging.</div>;
  }

  return (
    <div className="chat-window">
      <h3>{activeChat.is_group ? activeChat.name : `Chat with User ID: ${activeChat.id}`}</h3>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender_id === user.id ? 'sent' : 'received'}`}>
            <p>{msg.content}</p>
            <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;