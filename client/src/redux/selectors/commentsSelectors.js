import { createSelector } from 'reselect';

// Basic selector to get comments from the state
const selectCommentsState = (state) => state.comments;

// Memoized selector to get comments for a specific post
export const makeSelectComments = () => createSelector(
  [selectCommentsState, (state, postId) => postId],
  (comments, postId) => comments[postId] || []
);