import { createAction } from '@reduxjs/toolkit';
import { Cities, SortTypes } from '../const';

export const changeCity = createAction<Cities>('changeCity');
export const changeOffersByCity = createAction('changeOffersByCity');
export const changeActiveSort = createAction<SortTypes>('changeActiveSort');
