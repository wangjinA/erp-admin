import { EndType, getEndType, toLoginPage } from '@/routes';
import { Modal } from '@arco-design/web-react';
import axios from 'axios';
import { debounce } from 'lodash';

interface RequestEndTypeInfo {
  baseUrl: string;
  tokenKey: string;
}

const adminRequestEndInfo: RequestEndTypeInfo = {
  baseUrl: import.meta.env.DEV
    ? '/prod-admin'
    : 'https://logistics.drcstudio.cn/prod-admin',
  tokenKey: 'erp-admin-token',
};

const userRequestEndInfo: RequestEndTypeInfo = {
  baseUrl: import.meta.env.DEV
    ? '/prod-user'
    : 'https://logistics.drcstudio.cn/prod-user',
  tokenKey: 'erp-user-token',
};

export const requestEndInfo =
  getEndType() === EndType.ADMIN ? adminRequestEndInfo : userRequestEndInfo;

const timeout = 5 * 1000;

const baseAxios = axios.create({
  baseURL: requestEndInfo.baseUrl,
  timeout,
});

baseAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    token: localStorage.getItem(requestEndInfo.tokenKey),
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
      toLoginPage();
    },
  });
}, 300);

baseAxios.interceptors.response.use((res) => {
  console.log(res);

  if ([30010].includes(res.data.code)) {
    loginModal(res.data.msg);
  }
  return res;
});

export const SuccessCode = 200;

export default baseAxios;
