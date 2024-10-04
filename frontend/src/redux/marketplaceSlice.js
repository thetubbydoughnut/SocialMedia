import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const fetchListings = createAsyncThunk('marketplace/fetchListings', async () => {
  const response = await axios.get('/marketplace');
  return response.data;
});

export const createListing = createAsyncThunk('marketplace/createListing', async (listingData) => {
  const response = await axios.post('/marketplace', listingData);
  return response.data;
});

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState: {
    listings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.listings = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.listings.unshift(action.payload);
      });
  },
});

export default marketplaceSlice.reducer;