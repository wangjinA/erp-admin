import { Order } from '@/types/order';
import baseAxios from '..';
import { APIListResponse, IPageParams } from '../type';

export const orderAPI = {
  // 获取订单列表
  getList(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIListResponse<Order>>(
      '/api/logistics/order/list',
      body
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

export interface SearchOrderParams extends IPageParams {
  selectLogisticsOrderVO: {
    fillShipInfo: boolean;
    label: string;
    orderStatus: string;
    packEndTime: string;
    packStartTime: string;
    platformShopId: string;
    problemStatus: boolean;
    remark: string;
    shrimpOrderNo: string;
    sortType: number;
    stockRemovalEndTime: string;
    stockRemovalStartTime: string;
    whetherPack: boolean;
  };
  selectOrderProductVO: {
    globalArticleNo: string;
    productName: string;
    purchaseStatus: boolean;
    sku: string;
    stockOutStatus: boolean;
    trackingNo: string;
  };
  trackingNumber: string;
}
