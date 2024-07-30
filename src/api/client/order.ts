import { Order, OrderResponseItem } from '@/types/order';
import baseAxios from '..';
import { APIListResponse, IPageParams } from '../type';

export const orderAPI = {
  // 获取订单列表
  getList(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIListResponse<OrderResponseItem>>(
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
  refresh(id: number) {
    return baseAxios.get(`/api/logistics/order/update/shopee/${id}`);
  },
  remove(id: number) {
    return baseAxios.get(`/api/logistics/order/remove/${id}`);
  },
  getSheet(id: number) {
    return baseAxios.get(`/api/logistics/order/view/sheet/${id}`);
  },
  getLog(orderId: number) {
    return baseAxios.post(`/api/logistics/order/log/list`, {
      pageNum: 1,
      pageSize: 50,
      orderId,
    });
  },
  update(body: Partial<Order>) {
    return baseAxios.post('/api/logistics/order/update', body);
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
