import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (username) => {
  const response = await axios.get(`/users/${username}`);
  return response.data;
});

export const updateUserProfile = createAsyncThunk('user/updateProfile', async (profileData) => {
  const response = await axios.put('/users/profile', profileData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      });
  },
});

export default userSlice.reducer;