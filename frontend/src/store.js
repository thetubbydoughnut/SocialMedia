import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './redux/postsSlice';
import authReducer from './redux/authSlice';
import notificationsReducer from './redux/notificationsSlice'; // Create this file if it doesn't exist

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    notifications: notificationsReducer, // Add this line
  },
});

export default store;