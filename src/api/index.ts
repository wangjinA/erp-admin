import { Modal } from '@arco-design/web-react';
import axios from 'axios';
import { debounce } from 'lodash';

interface RequestEndTypeInfo {
  baseUrl: string;
  tokenKey: string;
}

//! 通过url path 判断 return reuqestendinfo

export const adminRequestEndInfo: RequestEndTypeInfo = {
  baseUrl: import.meta.env.DEV
    ? '/admin'
    : 'https://logistics.drcstudio.cn/prod-admin',
  tokenKey: 'erp-admin-token',
};

export const userRequestEndInfo: RequestEndTypeInfo = {
  baseUrl: import.meta.env.DEV
    ? '/user'
    : 'https://logistics.drcstudio.cn/prod-user',
  tokenKey: 'erp-user-token',
};

const timeout = 5 * 1000;

const adminAxios = axios.create({
  baseURL: adminRequestEndInfo.baseUrl,
  timeout,
});
// export const TokenKey = 'erp-token';

adminAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    token: localStorage.getItem(adminRequestEndInfo.tokenKey),
    // deptId: '0',
    // identification: '1',
    // tenantryId: '38909991126000134',
  } as any;
  return config;
});

const userAxios = axios.create({
  baseURL: userRequestEndInfo.baseUrl,
  timeout,
});

userAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    token: localStorage.getItem(userRequestEndInfo.tokenKey),
    // deptId: '0',
    // identification: '1',
    // tenantryId: '38909991126000134',
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

adminAxios.interceptors.response.use((res) => {
  if (res.data.code === 30010) {
    loginModal(res.data.msg);
  }
  return res;
});

export const SuccessCode = 200;

export default adminAxios;
