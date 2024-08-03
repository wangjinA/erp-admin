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
  // 编辑订单
  update(body: Partial<Order>) {
    return baseAxios.post('/api/logistics/order/update', body);
  },
  // 修改快递状态
  updateExpressStatus(params: {
    orderProductId: number;
    trackingStatus: string;
  }) {
    return baseAxios.get('/api/logistics/order/update/order/product/status', {
      params,
    });
  },
  // 退件操作
  returnOperation(body: Partial<ReturnOperationInfo>) {
    return baseAxios.post('/api/return/management/insert', body);
  },
};

export interface ReturnOperationInfo {
  recipientsInfo: string; //	收件信息,用英文逗号隔开
  sendWarehouse: string; //	送往仓库
  storeRemark: string; //	店铺退件备注
  trackingNo: string; //	快递单号，添加多个请使用英文逗号隔开
}
export interface 未知 {
  chargeMethod: string; //	收费方式 字典值
  id: number; //	主键
  logisticsCompany: string; //	物流公司
  logisticsTrackingNumber: string; //	退件物流单号
  platformRemark: string; //	平台退件备注
  returnLogisticsCosts: number; //	退件物流费用
}

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
