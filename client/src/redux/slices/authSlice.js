import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; // Use the centralized Axios instance

// Async thunks
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    return thunkAPI.rejectWithValue({ message });
  }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Registration failed';
    return thunkAPI.rejectWithValue({ message });
  }
});

export const getProfile = createAsyncThunk('auth/getProfile', async (_, thunkAPI) => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch profile';
    return thunkAPI.rejectWithValue({ message });
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, thunkAPI) => {
  try {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to update profile';
    return thunkAPI.rejectWithValue({ message });
  }
});

export const changePassword = createAsyncThunk('auth/changePassword', async (passwordData, thunkAPI) => {
  try {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to change password';
    return thunkAPI.rejectWithValue({ message });
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, thunkAPI) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to initiate password reset';
    return thunkAPI.rejectWithValue({ message });
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetData, thunkAPI) => {
  try {
    const response = await api.post('/auth/reset-password', resetData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to reset password';
    return thunkAPI.rejectWithValue({ message });
  }
});

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (token, thunkAPI) => {
  try {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to verify email';
    return thunkAPI.rejectWithValue({ message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    isAuthenticated: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError(state) {
      state.hasError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.errorMessage = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload.message;
        state.isAuthenticated = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
      // ... handle other thunks ...
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;