import baseAxios from '.';

export const menuAPI = {
  get() {
    return baseAxios.get('/api/menu/insert');
  },
};
