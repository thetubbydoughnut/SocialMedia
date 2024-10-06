import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// {{ edit_2 }} Add async thunk for fetching comments
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => {
    const response = await api.get(`/comments/post/${postId}`);
    return { postId, comments: response.data };
  }
);

// {{ edit_3 }} Add async thunk for adding a new comment
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, content }) => {
    const response = await api.post('/comments', { postId, content });
    return { postId, comment: response.data };
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      // {{ edit_4 }} Handle fetchComments fulfilled
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state[postId] = comments;
      })
      // {{ edit_5 }} Handle addComment fulfilled
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        if (!state[postId]) {
          state[postId] = [];
        }
        state[postId].unshift(comment);
      });
  },
});

export default commentsSlice.reducer;