import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './redux/slices/postsSlice';
import commentsReducer from './redux/slices/commentsSlice';
import authReducer from './redux/slices/authSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    auth: authReducer,
  },
});