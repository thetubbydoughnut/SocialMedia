import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './redux/postsSlice';
import authReducer from './redux/authSlice';
import notificationsReducer from './redux/notificationsSlice'; // Create this file if it doesn't exist
import userReducer from './redux/userSlice'; // Add this line
import friendsReducer from './redux/friendsSlice'; // Add this line

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    notifications: notificationsReducer,
    user: userReducer,
    friends: friendsReducer, // Add this line
  },
});

export default store;