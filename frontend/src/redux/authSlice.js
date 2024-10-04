import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

// Async thunk to handle user registration
export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post('/auth/register', userData);
  return response.data;
});

// Async thunk to handle user login
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
});

// Async thunk to fetch current user (optional)
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const response = await axios.get('/auth/me');
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // Synchronous logout action
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle user registration
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      
      // Handle user login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      
      // Handle fetching current user
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;