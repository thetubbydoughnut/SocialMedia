import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/auth/me');
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error gracefully
            return rejectWithValue('Unauthorized');
        }
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout(state) {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;