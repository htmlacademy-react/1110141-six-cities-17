import { createReducer } from '@reduxjs/toolkit';

import { offers } from '../mocks/offers';

import { Cities, SortTypes } from '../const';

import { changeActiveSort, changeCity, changeOffersByCity } from './actions';

import { CompactOffers } from '../types/offers';
import { SortElement } from '../types/sort';

type InitialState = {
  city: Cities;
  offers: CompactOffers;
  sort: SortElement[];
}

const initialState: InitialState = {
  city: Cities.Paris,
  offers: offers.filter((offer) => offer.city.name as Cities === Cities.Paris),
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
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    const payload: Cities = action.payload;
    if (action.payload && Object.values(Cities).includes(payload)) {
      state.city = payload;
    }
  })
    .addCase(changeOffersByCity, (state) => {
      state.offers = offers.filter((offer) => offer.city.name as Cities === state.city);
    })
    .addCase(changeActiveSort, (state, action) => {
      const currentSort = action.payload;
      state.sort.map((item) => {
        item.isActive = item.title === currentSort;
      });
    });
});
