import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axiosInstance';

export const fetchItems = createAsyncThunk('marketplace/fetchItems', async (category) => {
    const response = await axiosInstance.get('/marketplace/posts', {
        params: { category: category !== 'All' ? category : undefined }
    });
    return response.data;
});

export const addItem = createAsyncThunk('marketplace/addItem', async (newItem) => {
    const response = await axiosInstance.post('/marketplace/posts', newItem, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
});

const marketplaceSlice = createSlice({
    name: 'marketplace',
    initialState: {
        items: [],
        selectedCategory: 'All',
        status: 'idle',
        error: null
    },
    reducers: {
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    }
});

export const { setSelectedCategory } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;