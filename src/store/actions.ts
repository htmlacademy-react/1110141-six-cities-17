import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../const';

export const changeCity = createAction<Cities>('changeCity');
export const changeOffersByCity = createAction('changeOffersByCity');
