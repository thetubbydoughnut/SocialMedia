import { configureStore } from '@reduxjs/toolkit';
import marketplaceReducer from './slices/marketplaceSlice';
import userReducer from './slices/userSlice';
import locationReducer from './slices/locationSlice';
import friendsReducer from './slices/friendsSlice';

const store = configureStore({
    reducer: {
        marketplace: marketplaceReducer,
        user: userReducer,
        location: locationReducer,
        friends: friendsReducer,
    }
});

export default store;