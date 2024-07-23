
import baseAxios from '..';
import { APIResponse } from '../type';

export const shopeeAPI = {
  // 获取订单列表
  create() {
    return baseAxios.post<APIResponse>(
      '/api/tenantry/store/create/accredit/url'
    );
  },
  // 获取订单详情
  getDetail(id: number) {
    return baseAxios.get(`/api/logistics/order/info/${id}`);
  },
  insert(body) {
    return baseAxios.post('/api/logistics/order/insert', body);
  },
};