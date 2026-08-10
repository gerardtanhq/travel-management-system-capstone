import { configureStore } from '@reduxjs/toolkit';
import travelReducer from '../features/travel/travelSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        travel: travelReducer,
        auth: authReducer,
    },
});