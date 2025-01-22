import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducer';

import { createAPI } from '../services/api';

/** Создаёт экземпляр axios с указанным baseURL и timeout */
const api = createAPI();

export const store = configureStore(
  {
    reducer: reducer,
    /** Добавляет middleware и конфигурирует redux thunk передавая ему экземпляр axios */
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api
        },
      })
  }
);
