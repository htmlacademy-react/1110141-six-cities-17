import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus, Cities, SortTypes } from '../const';

import { changeActiveSort, changeCity, changeOffersByCity, loadComments, loadOffers, requireAuthorization, setError } from './actions';

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
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    const payload: Cities = action.payload;
    if (action.payload && Object.values(Cities).includes(payload)) {
      state.city = payload;
    }
  })
    .addCase(changeOffersByCity, (state) => {
      state.offers = state.offers.filter((offer) => offer.city.name as Cities === state.city);
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
    });
});
