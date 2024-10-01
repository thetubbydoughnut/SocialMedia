import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, addChat } from '../../slices/chatSlice';
import { axiosInstance } from '../../utils/axiosInstance';
import socket from '../../socket';
import './ChatList.css';

function ChatList() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items || []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get('/chats');
        dispatch(setChats(response.data));
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();

    // Listen for new chats
    socket.on('new_chat', (chat) => {
      dispatch(addChat(chat));
    });

    return () => {
      socket.off('new_chat');
    };
  }, [dispatch]);

  return (
    <div className="chat-list">
      <h3>Chats</h3>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            {/* Render chat details */}
            {chat.participants.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;