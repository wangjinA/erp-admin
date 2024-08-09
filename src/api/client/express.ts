import baseAxios from '..';
import { APIListResponse, APIResponse, IPageParams } from '../type';

export const expressAPI = {
  /**
   * 包裹认领列表
   */
  getClaimList(body: Partial<ClaimParams> & IPageParams) {
    return baseAxios.post<APIListResponse<ClaimParams>>(
      '/api/parcel/management/claim/list',
      body
    );
  },
  /**
   * 问题包裹列表
   */
  getProblemList(body: Partial<ProblemParams> & IPageParams) {
    return baseAxios.post<APIListResponse<ProblemParams>>(
      '/api/parcel/management/problem/list',
      body
    );
  },
  /**
   * 快递拒收列表
   */
  getRejectList(body: Partial<ExpressRejectParams> & IPageParams) {
    return baseAxios.post<APIListResponse<ExpressRejectParams>>(
      '/api/reject/management/list',
      body
    );
  },
  /**
   * 新增拒收
   */
  addReject(body: AddRejectParam) {
    return baseAxios.post<APIResponse>('/api/reject/management/insert', body);
  },
  /**
   * 退件列表
   */
  getReturnList(body: Partial<ReturnParams> & IPageParams) {
    return baseAxios.post<APIListResponse<ReturnParams>>(
      '/api/return/management/list',
      body
    );
  },
  /**
   * 认领操作
   */
  claimHandle(body: { trackingNo: string; sendWarehouse: string }) {
    return baseAxios.post<APIResponse>('666666666666666', body);
  },

  // 修改快递状态
  updateExpressStatus(params: {
    orderProductId: number;
    trackingStatus: string;
  }) {
    return baseAxios.post(
      '/api/logistics/order/update/order/product/status',
      params
    );
  },
  // 退件操作
  returnOperation(body: Partial<ReturnOperationInfo>) {
    return baseAxios.post('/api/return/management/insert', body);
  },
};

export interface ReturnOperationInfo {
  recipientsInfo: string; // 收件信息,用英文逗号隔开
  sendWarehouse: string; // 送往仓库
  storeRemark: string; // 店铺退件备注
  trackingNo: string; // 快递单号，添加多个请使用英文逗号隔开
}

export interface ReturnParams {
  address: string;
  applyEndTime: string;
  applyStartTime: string;
  applyTime: string;
  chargeMethod: string;
  createBy: number;
  createTime: string;
  deleteStatus: number;
  freightSpaceName: string;
  id: number;
  logisticsCompany: string;
  logisticsTrackingNumber: string;
  orderProductId: number;
  platformRemark: string;
  recipients: string;
  recipientsPhone: string;
  returnEndTime: string;
  returnLogisticsCosts: number;
  returnStartTime: string;
  returnStatus: string;
  returnTime: string;
  sendWarehouse: number;
  storeRemark: string;
  tenantryId: number;
  tenantryNo: string;
  trackingNo: string;
  updateBy: number;
  updateTime: string;
}

export interface AddRejectParam {
  sendWarehouse: string;
  trackingNo: string;
}

export interface ExpressRejectParams {
  applyEndTime: string;
  applyStartTime: string;
  applyTime: string;
  applyUser: string;
  createBy: number;
  createTime: string;
  deleteStatus: number;
  id: number;
  orderProductId: number;
  rejectionEndTime: string;
  rejectionStartTime: string;
  rejectionStatus: string;
  rejectionTime: string;
  sendWarehouse: number;
  tenantryId: number;
  tenantryNo: string;
  trackingNo: string;
  updateBy: number;
  updateTime: string;
}

export interface ClaimParams {
  sendWarehouse: number; // 送往仓库
  shelfEndTime: string; // 签收时间--结束时间
  shelfStartTime: string; // 签收时间--开始时间
  trackingNo: string; // 快递单号
}

export interface ProblemParams extends ClaimParams {}
