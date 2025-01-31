import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities, SortTypes } from '../const';
import { CompactOffers, DetailedOffer, OfferId } from '../types/offers';
import { Comments, Comment } from '../types/comments';
import { UserData } from '../types/user-data';

export const changeCity = createAction<Cities>('app/changeCity');
export const changeActiveSort = createAction<SortTypes>('app/changeActiveSort');
export const loadOffers = createAction<CompactOffers>('data/loadOffers');
export const loadDetailedOffer = createAction<DetailedOffer>('data/loadDetailedOffer');
export const loadNearbyOffers = createAction<CompactOffers>('data/loadNearbyOffers');
export const toggleFavoriteStatus = createAction<OfferId>('data/toggleFavoriteStatus');
export const loadOfferComments = createAction<Comments>('data/loadOfferComments');
export const loadOfferComment = createAction<Comment>('comments/loadOfferComment');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('app/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setUserData = createAction<UserData | null>('user/setUserData');
