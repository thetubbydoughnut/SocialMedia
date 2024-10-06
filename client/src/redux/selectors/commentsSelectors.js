import { createSelector } from '@reduxjs/toolkit';

// Basic selector to get comments from the state
const selectCommentsState = state => state.comments;

// Memoized selector to get comments for a specific post
export const makeSelectCommentsByPostId = () =>
  createSelector(
    [selectCommentsState, (_, postId) => postId],
    (comments, postId) => comments[postId] || []
  );