import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

// Async Thunks
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

export const addFriend = createAsyncThunk(
    'friends/addFriend',
    async (friendId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/friends/${friendId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Adding friend failed');
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
            })
            .addCase(addFriend.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.friends = action.payload;
            })
            .addCase(addFriend.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const friendSelectors = {
    selectFriends: (state) => state.friends.friends,
    selectFriendStatus: (state) => state.friends.status,
    selectFriendError: (state) => state.friends.error,
};

export default friendsSlice.reducer;