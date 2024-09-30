import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/profile/me');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addFriend = createAsyncThunk('user/addFriend', async (friendId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/friends/${friendId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null,
        location: 'US',
        isNavbarVisible: true,
        allProfiles: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setNavbarVisibility: (state, action) => {
            state.isNavbarVisible = action.payload;
        },
        updateProfilePhoto: (state, action) => {
            if (state.user) {
                state.user.profilePhoto = action.payload;
            }
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

export const { setUser, setToken, logout, setLocation, setNavbarVisibility, updateProfilePhoto } = userSlice.actions;
export const selectAllProfiles = (state) => state.user.allProfiles;
export default userSlice.reducer;