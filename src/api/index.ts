import axios from 'axios';

export const baseURL = import.meta.env.DEV ? '' : 'http://121.37.10.68:8081';

const baseAxios = axios.create({
  baseURL,
  timeout: 10 * 1000,
});

export const SuccessCode = 200;

export default baseAxios;
