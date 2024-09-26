import { configureStore } from '@reduxjs/toolkit';
import marketplaceReducer from './slices/marketplaceSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        marketplace: marketplaceReducer,
        user: userReducer
    }
});

export default store;