import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus, Cities, SortTypes } from '../const';

import { changeActiveSort, changeCity, loadOfferComment, loadDetailedOffer, loadNearbyOffers, loadOfferComments, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData } from './actions';

import { CompactOffers, DetailedOffer } from '../types/offers';
import { SortElement } from '../types/sort';
import { Comments } from '../types/comments';
import { UserData } from '../types/user-data';

type InitialState = {
  city: Cities;
  offers: CompactOffers;
  detailedOffer: DetailedOffer | null;
  nearbyOffers: CompactOffers | null;
  offerComments: Comments | null;
  sort: SortElement[];
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  city: Cities.Paris,
  offers: [],
  detailedOffer: null,
  nearbyOffers: null,
  offerComments: [],
  sort: [
    {
      'title': SortTypes.Popular,
      'isActive': true,
    },
    {
      'title': SortTypes.PriceToHigh,
      'isActive': false,
    },
    {
      'title': SortTypes.PriceToLow,
      'isActive': false,
    },
    {
      'title': SortTypes.Top,
      'isActive': false,
    },
  ],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  error: null,
  isOffersDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    const payload: Cities = action.payload;
    if (action.payload && Object.values(Cities).includes(payload)) {
      state.city = payload;
    }
  })
    .addCase(changeActiveSort, (state, action) => {
      const currentSort = action.payload;
      state.sort.map((item) => {
        item.isActive = item.title === currentSort;
      });
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadDetailedOffer, (state, action) => {
      state.detailedOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadOfferComments, (state, action) => {
      state.offerComments = action.payload;
    })
    .addCase(loadOfferComment, (state, action) => {
      state.offerComments = [...(state.offerComments || []), action.payload];
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
