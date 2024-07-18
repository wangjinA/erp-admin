import adminAxios from '.';

export const menuAPI = {
  get() {
    return adminAxios.get('/api/menu/insert');
  },
};
