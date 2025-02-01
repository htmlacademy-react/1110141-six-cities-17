import { createSelector } from '@reduxjs/toolkit';
import { State } from './types/state';

const selectSort = (state: State) => state.sort;

export const selectCurrentSort = createSelector(
  [selectSort],
  (sort) => sort.find((item) => item.isActive === true)
);
