import { Message } from '@arco-design/web-react';
import axios from 'axios';

export const baseURL = import.meta.env.DEV ? '' : 'http://121.37.10.68:8081';

const baseAxios = axios.create({
  baseURL,
  timeout: 10 * 1000,
});

export const TokenKey = 'erp-token';

baseAxios.interceptors.request.use((config) => {
  config.headers['token'] = localStorage.getItem(TokenKey);
  return config;
});

export const SuccessCode = 200;

export default baseAxios;
