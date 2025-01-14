import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities, SortTypes } from '../const';
import { CompactOffers } from '../types/offers';

export const changeCity = createAction<Cities>('app/changeCity');
export const changeOffersByCity = createAction('app/changeOffersByCity');
export const changeActiveSort = createAction<SortTypes>('app/changeActiveSort');
export const loadOffers = createAction<CompactOffers>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

