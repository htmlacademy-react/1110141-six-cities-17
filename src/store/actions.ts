import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities, SortTypes } from '../const';
import { CompactOffers } from '../types/offers';
import { Comments } from '../types/comments';

export const changeCity = createAction<Cities>('app/changeCity');
export const changeOffersByCity = createAction('app/changeOffersByCity');
export const changeActiveSort = createAction<SortTypes>('app/changeActiveSort');
export const loadOffers = createAction<CompactOffers>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const loadComments = createAction<Comments>('comments/loadComments');
export const setError = createAction<string | null>('app/setError');
