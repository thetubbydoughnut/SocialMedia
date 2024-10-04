import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

// Async thunk to handle user registration
export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post('/auth/register', userData);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
});

// Async thunk to handle user login
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data.user;
});

// Async thunk to fetch current user (optional)
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token found');
    
    const response = await axios.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
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
      localStorage.removeItem('token');
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
      })
      
      // Handle rejected current user
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.status = 'failed';
        localStorage.removeItem('token');
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;