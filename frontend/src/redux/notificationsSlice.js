import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    markAsRead: (state, action) => {
      const notification = state.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
  },
});

export const { addNotification, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;