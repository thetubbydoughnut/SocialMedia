import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: {}, // key: chatId, value: array of messages
  },
  reducers: {
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.items[chatId] = messages;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.items[chatId]) {
        state.items[chatId] = [];
      }
      state.items[chatId].push(message);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;