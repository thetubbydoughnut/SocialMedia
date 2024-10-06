import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectCommentsState = (state: RootState) => state.comments.byPostId;

export const makeSelectCommentsByPostId = () =>
  createSelector(
    [selectCommentsState, (_: RootState, postId: number) => postId],
    (comments, postId): any[] => comments[postId] || []
  );