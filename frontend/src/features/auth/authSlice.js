import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token'),
    adminName: localStorage.getItem('adminName'),
};

const authSlice = createSlice({
    name: 'auth',

    initialState,

    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.adminName = action.payload.adminName;
        },

        logout: (state) => {
            state.token = null;
            state.adminName = null;
        },
    },
});

export const {
    login,
    logout,
} = authSlice.actions;

export default authSlice.reducer;