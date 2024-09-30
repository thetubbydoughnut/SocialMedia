import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import friendReducer from './slices/friendSlice';
import searchReducer from './slices/searchSlice';
import marketplaceReducer from './slices/marketplaceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    friends: friendReducer,
    search: searchReducer,
    marketplace: marketplaceReducer,
  }
});

export default store;