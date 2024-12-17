import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { Cities } from '../const';
import { changeCity, changeOffersByCity } from './actions';

const initialState = {
  city: Cities.Amsterdam,
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    if (action.payload && Object.values(Cities).includes(action.payload)) {
      state.city = action.payload;
    }
  })
    .addCase(changeOffersByCity, (state, action) => {
      if (action.payload) {
        state.offers = action.payload;
      }
    });
});
