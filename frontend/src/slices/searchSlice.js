import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axiosInstance';

export const searchProfiles = createAsyncThunk('search/searchProfiles', async (query) => {
  const response = await axiosInstance.get(`/search/profiles?q=${query}`);
  return response.data;
});

export const searchPosts = createAsyncThunk('search/searchPosts', async (query) => {
  const response = await axiosInstance.get(`/search/posts?q=${query}`);
  return response.data;
});

export const searchHashtags = createAsyncThunk('search/searchHashtags', async (query) => {
  const response = await axiosInstance.get(`/search/hashtags?q=${query}`);
  return response.data;
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    searchStatus: 'idle',
    searchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProfiles.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchProfiles.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload.map((profile) => ({ ...profile, type: 'profile' }));
      })
      .addCase(searchProfiles.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message;
      })
      .addCase(searchPosts.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = [...state.searchResults, ...action.payload.map((post) => ({ ...post, type: 'post' }))];
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message;
      })
      .addCase(searchHashtags.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchHashtags.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = [...state.searchResults, ...action.payload.map((hashtag) => ({ ...hashtag, type: 'hashtag' }))];
      })
      .addCase(searchHashtags.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message;
      });
  },
});

export const searchSelectors = {
  selectSearchResults: (state) => state.search.searchResults,
  selectSearchStatus: (state) => state.search.searchStatus,
  selectSearchError: (state) => state.search.searchError,
};

export default searchSlice.reducer;