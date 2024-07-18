import adminAxios from '.';
import { APIListResponse, APIResponse, IPageParams } from './type';

export interface Entrepot {
  consignee: string;
  createBy: number;
  createTime: string;
  deleteStatus: number;
  deliveryAddress: string;
  detailedAddress: string;
  entrepotName: string;
  entrepotType: number;
  id: number;
  inventorySupported: number;
  openUser: number;
  qrCode: string;
  remark: string;
  storeType: string;
  supportArea: string;
  telephone: string;
  updateBy: number;
  updateTime: string;
}

export interface EntrepotStorageRacks {
  available: number;
  createBy: number;
  createTime: string;
  deleteStatus: number;
  entrepotId: number;
  id: number;
  locationPrefix: string;
  numberColumns: number;
  numberFloors: number;
  storageRacksCode: string;
  storageRacksName: string;
  storageRacksType: string;
  updateBy: number;
  updateTime: string;
}

// 仓库
export const entrepotAPI = {
  getList(body: Partial<Entrepot & IPageParams>) {
    return adminAxios.post<APIListResponse<Entrepot>>('/api/entrepot/list', {
      entrepotType: 1,
      ...body,
    });
  },
  getListAll(body: Partial<Entrepot & IPageParams>) {
    return adminAxios.post<APIListResponse<Entrepot>>('/api/entrepot/list/all', {
      entrepotType: 1,
      ...body,
    });
  },
  insert(body: Partial<Entrepot>) {
    return adminAxios.post<APIResponse>('/api/entrepot/insert', body);
  },
  remove(id) {
    return adminAxios.get(`/api/entrepot/remove/${id}`);
  },
  update(body: Partial<Entrepot>) {
    return adminAxios.post('/api/entrepot/update', body);
  },
  
};

// 仓位
export const racksAPI = {
  getList(body: Partial<EntrepotStorageRacks & IPageParams>) {
    return adminAxios.post<APIListResponse<EntrepotStorageRacks>>(
      '/api/racks/list',
      body
    );
  },
  insert(body: Partial<EntrepotStorageRacks>) {
    return adminAxios.post<APIResponse>('/api/racks/insert', body);
  },
  remove(id) {
    return adminAxios.get<APIResponse>(`/api/racks/remove/${id}`);
  },
  update(body: Partial<EntrepotStorageRacks>) {
    return adminAxios.post<APIResponse>('/api/racks/update', body);
  },
};

export const scanAPI = {
  // 获取扫码记录
  getRecord() {
    return adminAxios.get('/api/scanning/record/list');
  },
  // 扫码入库
  scanPut(params: ScanParams) {
    return adminAxios.post('/api/business/operation/scan/put', params);
  },
  // 扫码签收
  scanSign(params: ScanParams) {
    return adminAxios.post('/api/business/operation/scan/sign', params);
  },
};

export interface ScanParams {
  sendWarehouse: number; // 送往仓库
  trackingNo: string; // 快递单号
}

export interface OrderInfo {
  addedCost: number; // 增值费用
  appendCost: number; // 附加费用
  area: string; // 区
  cancellationTime: string; // 取消时间
  city: string; // 城市
  consignmentTime: string; // 交运时间
  createBy: number; // 创建人
  createTime: string; // 创建时间
  createType: string; // 订单创建类型  字典值
  deleteStatus: number; // 状态：默认为0；删除为1
  detailedAddress: string; // 详细地址
  entrepotRemark: string; // 仓库备注
  fillShipInfo: boolean; // 是否未填写发货信息 false 否 true 是
  firstLegCost: number; // 头程费用
  id: number; // 主键
  label: string; // 标签
  logisticsChannel: string; // 物流渠道  字典值
  mobileNumber: string; // 手机号码
  orderAmount: number; // 订单金额
  orderStatus: string; // 订单状态  字典值
  orderTime: string; // 订单时间
  orderType: string; // 订单类型  字典值
  packCost: number; // 打包费用
  packTime: string; // 打包时间
  panelBarCode: string; // 面板条码
  parcelHigh: number; // 包裹高度
  parcelLength: number; // 包裹长度
  parcelType: string; // 包裹类型  字典值
  parcelWeight: number; // 包裹重量
  parcelWide: number; // 包裹宽度
  platformShopId: string; // 店铺id
  platformType: string; // 平台类型  字典值
  postcode: string; // 邮编
  problemStatus: boolean; // 是否问题订单 false 否 true 是
  province: string; // 省
  recipients: string; // 收件人
  region: string; // 地区
  remark: string; // 备注
  sendWarehouse: number; // 送往仓库
  sheetFile: string; // 面单文件
  sheetFileTime: string; // 面单申请时间
  shippingTime: string; // 出货时间
  shrimpOrderNo: string; // 虾皮订单号
  shrimpWaybillNo: string; // 虾皮运单号
  stockRemovalTime: string; // 出库时间
  tenantryId: number; // 租户id
  totalCost: number; // 总费用
  town: string; // 镇
  transportType: string; // 运输类型  字典值
  updateBy: number; // 更新人
  updateTime: string; // 更新时间
  urgentStatus: boolean; // 是否加急 false 否 true 是
}
