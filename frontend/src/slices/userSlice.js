import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import fakeProfiles from '../data/fakeProfile';

export const fetchUser = createAsyncThunk('user/fetchUser', async (username, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/profile/${username}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
});

export const addFriend = createAsyncThunk(
  'user/addFriend',
  async (friendId, { getState }) => {
    const { user } = getState().user;
    const updatedFriends = [...user.friends, friendId];
    // In a real app, you'd make an API call here
    // For now, we'll just return the updated friends list
    return updatedFriends;
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        status: 'idle',
        error: null,
        location: 'US',
        isNavbarVisible: true,
        allProfiles: fakeProfiles,
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
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.friends = action.payload;
                }
            });
    },
});

export const { setUser, setToken, logout, setLocation, setNavbarVisibility } = userSlice.actions;
export const selectAllProfiles = (state) => state.user.allProfiles;
export default userSlice.reducer;