import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus, Cities, SortTypes } from '../const';

import { changeActiveSort, changeCity, loadComments, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus } from './actions';

import { CompactOffers } from '../types/offers';
import { SortElement } from '../types/sort';
import { Comments } from '../types/comments';

type InitialState = {
  city: Cities;
  offers: CompactOffers;
  sort: SortElement[];
  authorizationStatus: AuthorizationStatus;
  comments: Comments;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  city: Cities.Paris,
  offers: [],
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
  comments: [],
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
