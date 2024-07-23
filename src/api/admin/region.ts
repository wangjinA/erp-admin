import baseAxios from '..';

// 省市区选择
export const regionAPI = {
  get() {
    return baseAxios.get('/api/region/list/1');
  },
};
