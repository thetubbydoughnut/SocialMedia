import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setActiveChat } from '../../slices/chatSlice';
import axios from 'axios';
import './ChatList.css';

function ChatList() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/chats');
        dispatch(setChats(response.data));
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [dispatch]);

  const handleSelectChat = (chat) => {
    dispatch(setActiveChat(chat));
  };

  return (
    <div className="chat-list">
      <h3>Chats</h3>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => handleSelectChat(chat)}>
            {chat.is_group ? chat.name : `Chat with User ID: ${chat.id}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;