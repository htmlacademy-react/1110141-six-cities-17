import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities, SortTypes } from '../const';
import { CompactOffers, DetailedOffer } from '../types/offers';
import { Comments } from '../types/comments';
import { UserData } from '../types/userData';

export const changeCity = createAction<Cities>('app/changeCity');
export const changeActiveSort = createAction<SortTypes>('app/changeActiveSort');
export const loadOffers = createAction<CompactOffers>('data/loadOffers');
export const loadDetailedOffer = createAction<DetailedOffer>('data/loadDetailedOffer');
export const loadNearbyOffers = createAction<CompactOffers>('data/loadNearbyOffers');
export const loadOfferComments = createAction<Comments>('data/loadOfferComments');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const loadComments = createAction<Comments>('comments/loadComments');
export const setError = createAction<string | null>('app/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setUserData = createAction<UserData | null>('user/setUserData');
