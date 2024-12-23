import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { Cities } from '../const';
import { changeCity, changeOffersByCity } from './actions';

const initialState = {
  city: Cities.Paris,
  offers: offers.filter((offer) => offer.city.name as Cities === Cities.Paris),
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
    });
});
