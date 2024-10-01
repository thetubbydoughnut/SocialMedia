import { createSlice } from '@reduxjs/toolkit';

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    items: [],
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
export default storiesSlice.reducer;