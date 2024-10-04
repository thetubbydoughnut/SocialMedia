import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const fetchFriends = createAsyncThunk('friends/fetchFriends', async () => {
  const response = await axios.get('/friends');
  return response.data;
});

export const sendFriendRequest = createAsyncThunk('friends/sendFriendRequest', async (userId) => {
  const response = await axios.post(`/friends/request/${userId}`);
  return response.data;
});

export const acceptFriendRequest = createAsyncThunk('friends/acceptFriendRequest', async (requestId) => {
  const response = await axios.post(`/friends/accept/${requestId}`);
  return response.data;
});

export const removeFriend = createAsyncThunk('friends/removeFriend', async (friendId) => {
  await axios.delete(`/friends/${friendId}`);
  return friendId;
});

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    friendRequests: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.friends = action.payload.friends;
        state.friendRequests = action.payload.friendRequests;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.friendRequests.push(action.payload);
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.friends.push(action.payload);
        state.friendRequests = state.friendRequests.filter(request => request.id !== action.payload.id);
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.friends = state.friends.filter(friend => friend.id !== action.payload);
      });
  },
});

export default friendsSlice.reducer;