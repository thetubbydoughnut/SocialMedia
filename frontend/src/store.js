import { configureStore } from '@reduxjs/toolkit';
import marketplaceReducer from './slices/marketplaceSlice';
import userReducer from './slices/userSlice';
import locationReducer from './slices/locationSlice';

const store = configureStore({
    reducer: {
        marketplace: marketplaceReducer,
        user: userReducer,
        location: locationReducer,
    }
});

export default store;