import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  username: string;
  likes: number;
  isLiked: boolean;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { getState }) => {
  const { auth } = getState() as { auth: { token: string } };
  console.log('Fetching posts with token:', auth.token);
  const response = await api.get<Post[]>('/posts', {
    headers: { Authorization: `Bearer ${auth.token}` },
  });
  console.log('Fetched posts:', response.data);
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData: Omit<Post, 'id'>) => {
  console.log('Creating post with data:', postData);
  const response = await api.post<Post>('/posts', postData);
  console.log('Created post:', response.data);
  return response.data;
});

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        console.log('Fetching posts pending');
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        console.log('Fetching posts fulfilled:', action.payload);
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.error('Fetching posts rejected:', action.error.message);
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        console.log('Post created:', action.payload);
        state.posts.unshift(action.payload);
      });
  },
});

export default postsSlice.reducer;