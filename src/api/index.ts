import { Modal } from '@arco-design/web-react';
import axios from 'axios';
import { debounce } from 'lodash';

export const baseURL = import.meta.env.DEV ? '' : 'https://logistics.drcstudio.cn';

const baseAxios = axios.create({
  baseURL,
  timeout: 10 * 1000,
});

export const TokenKey = 'erp-token';

baseAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    token: localStorage.getItem(TokenKey),
    // deptId: '0',
    // identification: '1',
    // tenantryId: '0',
  } as any;
  return config;
});

const loginModal = debounce((msg) => {
  Modal.confirm({
    title: '温馨提示',
    content: msg || '登录失效！',
    okText: '前往登陆',
    onOk() {
      window.location.href = '/login';
    },
  });
}, 300);

baseAxios.interceptors.response.use((res) => {
  if (res.data.code === 30010) {
    loginModal(res.data.msg);
  }
  return res;
});

export const SuccessCode = 200;

export default baseAxios;
