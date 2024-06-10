import { APIResponse, LoginResponse } from '@/types/user';
import baseAxios, { baseURL } from '.';

export const login = (params) => {
  const { userLoginAccount, userLoginPassword, captcha } = params;
  return baseAxios.post<APIResponse<LoginResponse>>('/api/system/login', {
    captcha,
    userLoginAccount,
    userLoginPassword,
  });
};

export const getCaptcha = (randomVal?: any) => {
  const val = randomVal ? `?${randomVal}` : '';
  return baseURL + '/api/code/captcha.jpg' + val;
};
