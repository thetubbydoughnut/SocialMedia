import { createSlice, createSelector } from '@reduxjs/toolkit';

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    items: [], // Initialize as an empty array
  },
  reducers: {
    setStories: (state, action) => {
      state.items = action.payload;
    },
    addStory: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { setStories, addStory } = storiesSlice.actions;

export const selectStories = (state) => state.stories.items;

export const selectMemoizedStories = createSelector(
  [selectStories],
  (items) => items
);

export default storiesSlice.reducer;