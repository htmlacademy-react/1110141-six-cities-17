import { createSelector } from '@reduxjs/toolkit';
import { store } from './store';
import { Cities } from './const';
import { CompactOffers } from './types/offers';

/**
 * Входной селектор для получения списка предложений из глобального хранилища.
 *
 * @returns {Array} Список предложений (offers) из состояния Redux.
 */
const selectOffers = (): CompactOffers => store.getState().offers;

/**
 * Входной селектор для получения текущего города из глобального хранилища.
 *
 * @returns {Cities} Текущий выбранный город из состояния Redux.
 */
const selectCity = (): Cities => store.getState().city;

/**
 * Результирующий селектор для получения списка предложений, отфильтрованных по текущему городу.
 *
 * Селектор создан с использованием функции `createSelector`, что обеспечивает мемоизацию.
 * Это означает, что если входные данные (`offers` или `city`) не изменились,
 * результирующий селектор возвращает мемоизированный результат без пересчёта.
 *
 * @returns {Array} Массив предложений, отфильтрованных по текущему городу.
 */
export const selectFilteredOffers = createSelector(
  [selectOffers, selectCity], // Входные селекторы
  (offers, city) => offers.filter((offer) => offer.city.name === Cities[city]) // Результирующая логика
);
