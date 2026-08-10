import { configureStore } from '@reduxjs/toolkit';
import foodsReducer from '../features/foods/foodsSlice.js';

export const store = configureStore({
    reducer: {
        foods: foodsReducer,
    },
});