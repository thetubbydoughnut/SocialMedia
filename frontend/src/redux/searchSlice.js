import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const searchUsers = createAsyncThunk('search/users', async (query) => {
  const response = await axios.get(`/search/users?q=${query}`);
  return response.data;
});

export const searchPosts = createAsyncThunk('search/posts', async (query) => {
  const response = await axios.get(`/search/posts?q=${query}`);
  return response.data;
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    users: [],
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      });
  },
});

export default searchSlice.reducer;