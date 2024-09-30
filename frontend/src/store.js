import { configureStore } from '@reduxjs/toolkit';
import marketplaceReducer from './slices/marketplaceSlice';
import userReducer from './slices/userSlice';
import friendsReducer from './slices/friendsSlice';

const store = configureStore({
    reducer: {
        marketplace: marketplaceReducer,
        user: userReducer,
        friends: friendsReducer,
    }
});

export default store;