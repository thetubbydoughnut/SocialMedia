import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './redux/postsSlice';
import authReducer from './redux/authSlice'; // Import the authReducer

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer, // Add the auth slice to the store
    // Add other reducers here if needed
  },
});

export default store;