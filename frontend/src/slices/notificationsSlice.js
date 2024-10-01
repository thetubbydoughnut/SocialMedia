import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    unreadCount: 0,
  },
  reducers: {
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const notification = state.items.find((n) => n.id === action.payload);
      if (notification) {
        notification.is_read = true;
        state.unreadCount = Math.max(state.unreadCount - 1, 0);
      }
    },
    setNotifications: (state, action) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.is_read).length;
    },
  },
});

export const { addNotification, markAsRead, setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;