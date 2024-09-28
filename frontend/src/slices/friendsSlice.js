import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

export const fetchFriends = createAsyncThunk(
    'friends/fetchFriends',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/profile/${username}/friends`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch friends');
        }
    }
);

const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriends.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFriends.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.friends = action.payload;
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default friendsSlice.reducer;