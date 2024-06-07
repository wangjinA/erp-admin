import axios from 'axios';

export const baseURL = '';

const baseAxios = axios.create({
  baseURL,
  timeout: 10 * 1000,
});

export const SuccessCode = 200;

export default baseAxios;
