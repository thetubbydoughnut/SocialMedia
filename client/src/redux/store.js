import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import commentsReducer from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;