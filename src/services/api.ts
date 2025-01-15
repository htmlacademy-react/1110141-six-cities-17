import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';


const BACKEND_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

/** Создаёт экземпляр axios с предустановленными параметрами */
export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  /** Добавляет интерсептор который вмешивается в каждый запрос */
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      /** Получает токен и добавляет его в заголовок x-token */
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
