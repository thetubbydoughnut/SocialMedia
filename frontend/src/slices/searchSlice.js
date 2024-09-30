import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axiosInstance';

// Async Thunks
export const searchProfiles = createAsyncThunk(
  'search/searchProfiles',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/profile/search/profiles?query=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Search Profiles
    builder
      .addCase(searchProfiles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const searchSelectors = {
  selectSearchResults: (state) => state.search.searchResults,
  selectSearchStatus: (state) => state.search.status,
  selectSearchError: (state) => state.search.error,
};

export default searchSlice.reducer;