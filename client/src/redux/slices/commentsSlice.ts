import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';

interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
}

interface FetchCommentsResponse {
  postId?: number;
  comments: Comment[];
}

export const fetchComments = createAsyncThunk<FetchCommentsResponse, number | undefined>(
  'comments/fetchComments',
  async (postId?: number) => {
    if (postId) {
      const response = await api.get<Comment[]>(`/comments/post/${postId}`);
      return { postId, comments: response.data };
    } else {
      const response = await api.get<Comment[]>('/comments');
      return { comments: response.data };
    }
  }
);

interface AddCommentPayload {
  postId: number;
  content: string;
}

export const addComment = createAsyncThunk<Comment, AddCommentPayload>(
  'comments/addComment',
  async ({ postId, content }) => {
    const response = await api.post<Comment>('/comments', { postId, content });
    return response.data;
  }
);

interface CommentsState {
  byPostId: Record<number, Comment[]>;
  allComments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  byPostId: {},
  allComments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<FetchCommentsResponse>) => {
        state.loading = false;
        if (action.payload.postId !== undefined) {
          state.byPostId[action.payload.postId] = action.payload.comments;
        } else {
          state.allComments = action.payload.comments;
        }
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        const { postId } = action.payload;
        if (!state.byPostId[postId]) {
          state.byPostId[postId] = [];
        }
        state.byPostId[postId].unshift(action.payload);
      });
  },
});

export default commentsSlice.reducer;