import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean; // Add this line
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { getState }) => {
    const { auth } = getState() as { auth: AuthState };
    const response = await api.get('/auth/profile', {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: Partial<User>, { getState }) => {
    const { auth } = getState() as { auth: AuthState };
    const response = await api.put('/auth/profile', profileData, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData: { currentPassword: string; newPassword: string }, { getState }) => {
    const { auth } = getState() as { auth: AuthState };
    const response = await api.put('/auth/change-password', passwordData, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: Partial<User> & { password: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token: string) => {
    const response = await api.post(`/auth/verify-email/${token}`);
    return response.data;
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData: { token: string; newPassword: string }) => {
    const response = await api.post('/auth/reset-password', resetData);
    return response.data;
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false, // Add this line
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Add this line
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true; // Add this line
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false; // Add this line
      })
      // Add cases for other async thunks (getProfile, updateProfile, etc.) here
      // ...
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;