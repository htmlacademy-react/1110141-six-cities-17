import { createAction } from '@reduxjs/toolkit';
import { Cities, SortTypes } from '../const';
import { Offers } from '../types/offers';

export const changeCity = createAction<Cities>('changeCity');
export const changeOffersByCity = createAction('changeOffersByCity');
export const changeActiveSort = createAction<SortTypes>('changeActiveSort');
export const loadOffers = createAction<Offers>('changeActiveSort');

