import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, State } from '../types/state';
import { CompactOffers, DetailedOffer, OfferId } from '../types/offers';
import { Comments, Comment, PostComment } from '../types/comments';
import { AuthData } from '../types/authData';
import { UserData } from '../types/userData';

import { AxiosInstance } from 'axios';

import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';

import { loadDetailedOffer, loadNearbyOffers, loadOfferComment, loadOfferComments, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData } from './actions';

import { dropToken, saveToken } from '../services/token';

import { store } from '../store';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<CompactOffers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchDetailedOfferAction = createAsyncThunk<DetailedOffer, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, { dispatch, extra: api }) => {
    const offerEndpoint = `/${id}`;
    const { data } = await api.get<DetailedOffer>(APIRoute.Offers + offerEndpoint);
    dispatch(loadDetailedOffer(data));
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<CompactOffers, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (id, { dispatch, extra: api }) => {
    const offerEndpoint = `/${id}`;
    const nearbyEndpoint = '/nearby';
    const { data } = await api.get<CompactOffers>(APIRoute.Offers + offerEndpoint + nearbyEndpoint);
    dispatch(loadNearbyOffers(data));
    return data;
  },
);

export const fetchOfferCommentsAction = createAsyncThunk<Comments, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferComments',
  async (id, { dispatch, extra: api }) => {
    const offerEndpoint = `/${id}`;
    const { data } = await api.get<Comments>(APIRoute.Comments + offerEndpoint);
    dispatch(loadOfferComments(data));
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<CompactOffers>(APIRoute.Favorite);
    dispatch(loadOffers(data));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Comments>(APIRoute.Comments);
    dispatch(loadOfferComments(data));
  },
);

export const postCommentAction = createAsyncThunk<void, { offerId: OfferId; comment: PostComment }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({ offerId, comment }, { dispatch, extra: api }) => {
    const offerEndpoint = `/${offerId}`;
    const { data } = await api.post<Comment>(APIRoute.Comments + offerEndpoint, comment);
    dispatch(loadOfferComment(data));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { name, avatarUrl, isPro, token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData({ name, avatarUrl, isPro, token, email }));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserData(null));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
  },
);

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR);
  }
);
