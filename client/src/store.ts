import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './redux/slices/postsSlice';
import commentsReducer from './redux/slices/commentsSlice';
import authReducer from './redux/slices/authSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;