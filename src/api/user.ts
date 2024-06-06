import baseAxios, { baseURL } from '.';

export const login = (params) => {
  const { userLoginAccount, userLoginPassword, captcha } = params;
  return baseAxios.post('/api/system/login', {
    captcha,
    userLoginAccount,
    userLoginPassword,
  });
};

export const captcha = () => {
  return baseURL + '/api/code/captcha.jpg';
};
