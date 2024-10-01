import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    items: [],
    activeChat: null,
  },
  reducers: {
    setChats: (state, action) => {
      state.items = action.payload;
    },
    addChat: (state, action) => {
      state.items.push(action.payload);
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
});

export const { setChats, addChat, setActiveChat } = chatsSlice.actions;
export default chatsSlice.reducer;