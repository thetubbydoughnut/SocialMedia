import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

export const fetchUser = createAsyncThunk('user/fetchUser', async (username, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/profile/${username}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        status: 'idle',
        error: null,
        location: 'US',
        isNavbarVisible: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setNavbarVisibility: (state, action) => {
            state.isNavbarVisible = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setUser, setToken, logout, setLocation, setNavbarVisibility } = userSlice.actions;
export default userSlice.reducer;