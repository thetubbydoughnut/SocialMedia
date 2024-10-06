import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// {{ edit_2 }} Add async thunk for fetching comments
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => {
    const response = await api.get(`/comments/post/${postId}`);
    return response.data;
  }
);

// {{ edit_3 }} Add async thunk for adding a new comment
export const addComment = createAsyncThunk(
  'comments/addComment',
  async (newComment) => {
    const response = await api.post('/comments', newComment);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [], // Ensure this is defined
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // {{ edit_4 }} Handle fetchComments fulfilled
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // {{ edit_5 }} Handle addComment fulfilled
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
      // Optionally handle pending and rejected states
  },
});

export default commentsSlice.reducer;