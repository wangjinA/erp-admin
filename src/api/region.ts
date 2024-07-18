import adminAxios from '.';

// 省市区选择
export const regionAPI = {
  get() {
    return adminAxios.get('/api/region/list/1');
  },
};
