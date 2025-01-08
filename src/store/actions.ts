import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities, SortTypes } from '../const';
import { CompactOffers } from '../types/offers';

export const changeCity = createAction<Cities>('changeCity');
export const changeOffersByCity = createAction('changeOffersByCity');
export const changeActiveSort = createAction<SortTypes>('changeActiveSort');
export const loadOffers = createAction<CompactOffers>('loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

