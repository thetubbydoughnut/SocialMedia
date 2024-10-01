import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axiosInstance';
import { saveAuthToken, clearAuthToken } from '../utils/authUtils';

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/register', { username, email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // Perform any logout operations here if necessary
  clearAuthToken();
});

// Async thunk for fetching user profile
export const fetchCurrentUserProfile = createAsyncThunk(
  'auth/fetchCurrentUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/me');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        saveAuthToken(action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('username', action.payload.user.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        saveAuthToken(action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('username', action.payload.user.username);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      clearAuthToken();
      localStorage.removeItem('user');
      localStorage.removeItem('username');
    });

    builder
      .addCase(fetchCurrentUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch profile';
      });
  },
});

export const { loginSuccess } = authSlice.actions;

export const authSelectors = {
  selectUser: (state) => state.auth.user,
  selectAuthStatus: (state) => state.auth.status,
  selectAuthError: (state) => state.auth.error,
};

export default authSlice.reducer;