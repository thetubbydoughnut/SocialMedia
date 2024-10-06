import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api'; // Adjust the path as necessary

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await api.get('/posts', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await api.post('/posts', postData); // Ensure 'api' is defined
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      });
  },
});

export default postsSlice.reducer;