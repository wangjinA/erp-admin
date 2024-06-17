import baseAxios from '.';

export const regionAPI = {
  get() {
    return baseAxios.get('/api/region/list/1');
  },
};
