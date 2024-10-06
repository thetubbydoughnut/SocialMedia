import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api'; // Adjust the path as necessary

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { getState }) => {
  const token = getState().auth.token;
  console.log('Fetching posts with token:', token); // Log the token
  const response = await api.get('/posts', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Fetched posts:', response.data); // Log the fetched posts
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  console.log('Creating post with data:', postData); // Log the post data
  const response = await api.post('/posts', postData);
  console.log('Created post:', response.data); // Log the created post
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
        console.log('Fetching posts pending'); // Log pending state
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log('Fetching posts fulfilled:', action.payload); // Log fulfilled state
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.error('Fetching posts rejected:', action.error.message); // Log rejected state
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        console.log('Post created:', action.payload); // Log post creation
        state.posts.unshift(action.payload);
      });
  },
});

export default postsSlice.reducer;