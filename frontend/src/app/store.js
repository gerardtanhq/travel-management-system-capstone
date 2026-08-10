import { configureStore } from '@reduxjs/toolkit';
import foodsReducer from '../features/foods/foodsSlice.js';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        foods: foodsReducer,
        auth: authReducer,
    },
});