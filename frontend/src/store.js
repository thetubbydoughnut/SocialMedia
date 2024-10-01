import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import friendReducer from './slices/friendSlice';
import searchReducer from './slices/searchSlice';
import marketplaceReducer from './slices/marketplaceSlice';
import notificationsReducer from './slices/notificationsSlice';
import storiesReducer from './slices/storiesSlice';
import chatsReducer from './slices/chatSlice';
import messagesReducer from './slices/messagesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    friends: friendReducer,
    search: searchReducer,
    marketplace: marketplaceReducer,
    notifications: notificationsReducer,
    stories: storiesReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  }
});

export default store;