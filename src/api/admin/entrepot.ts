import baseAxios from '..'
import { APIListResponse, APIResponse, IPageParams } from '../type'

import { Order } from '@/types/order'

export interface Entrepot {
  consignee: string
  createBy: number
  createTime: string
  deleteStatus: number
  deliveryAddress: string
  detailedAddress: string
  entrepotName: string
  entrepotType: number
  id: number
  inventorySupported: number
  openUser: number
  qrCode: string
  remark: string
  storeType: string
  supportArea: string
  telephone: string
  updateBy: number
  updateTime: string
}

export interface EntrepotStorageRacks {
  available: number
  createBy: number
  createTime: string
  deleteStatus: number
  entrepotId: number
  id: number
  locationPrefix: string
  numberColumns: number
  numberFloors: number
  storageRacksCode: string
  storageRacksName: string
  storageRacksType: string
  updateBy: number
  updateTime: string
}

// 仓库
export const entrepotAPI = {
  setDefualt(entrepotId: any) {
    return baseAxios.get(`/api/tenantry/default/entrepot/insert/data/${entrepotId}`)
  },
  getList(body: Partial<Entrepot & IPageParams>) {
    return baseAxios.post<APIListResponse<Entrepot>>('/api/entrepot/list', {
      entrepotType: 1,
      ...body,
    })
  },
  getListAll(body: Partial<Entrepot & IPageParams>) {
    return baseAxios.post<APIListResponse<Entrepot>>('/api/entrepot/list/all', {
      entrepotType: 1,
      ...body,
    })
  },
  insert(body: Partial<Entrepot>) {
    return baseAxios.post<APIResponse>('/api/entrepot/insert', body)
  },
  remove(id) {
    return baseAxios.get(`/api/entrepot/remove/${id}`)
  },
  update(body: Partial<Entrepot>) {
    return baseAxios.post('/api/entrepot/update', body)
  },
  /**
   * 出库记录
   */
  getDeliveryHistory(body: Partial<DhParams>) {
    return baseAxios.post<APIListResponse<any>>('/api/logistics/order/out/record/list', body)
  },

  /**
   * 查询物流仓库寄件人列表--全部数据（安排出货时使用）
   */
  getSenderAll(body: {
    entrepotId: string
    // type: number
  }) {
    return baseAxios.post<APIListResponse<Sender>>('/api/entrepot/sender/list/all', body)
  },
  /**
   * 查询物流仓库寄件人列表
   */
  getSenderList(body: Partial<Sender & IPageParams>) {
    return baseAxios.post<APIListResponse<Sender>>('/api/entrepot/sender/list', body)
  },

  /**
   * 删除物流仓库寄件人
   */
  removeSender(id) {
    return baseAxios.get<APIResponse>(`/api/entrepot/sender/remove/${id}`)
  },
  /**
   * 新增物流仓库寄件人
   */
  insertSender(body: Partial<Sender>) {
    return baseAxios.post<APIResponse>('/api/entrepot/sender/insert', body)
  },
  /**
   * 更新物流仓库寄件人
   */
  updateSender(body: Partial<Sender>) {
    return baseAxios.post(`/api/entrepot/sender/update`, body)
  },
  /**
   * 修改默认物流仓库寄件人
   */
  updateSenderDefault(id: number, defaultStatus: boolean) {
    return baseAxios.post(`/api/entrepot/sender/update/default`, {
      id,
      defaultStatus,
    })
  },
}

// 仓位
export const racksAPI = {
  getList(body: Partial<EntrepotStorageRacks & IPageParams>) {
    return baseAxios.post<APIListResponse<EntrepotStorageRacks>>(
      '/api/racks/list',
      body,
    )
  },
  insert(body: Partial<EntrepotStorageRacks>) {
    return baseAxios.post<APIResponse>('/api/racks/insert', body)
  },
  remove(id) {
    return baseAxios.get<APIResponse>(`/api/racks/remove/${id}`)
  },
  update(body: Partial<EntrepotStorageRacks>) {
    return baseAxios.post<APIResponse>('/api/racks/update', body)
  },
}

export const scanAPI = {
  /** 获取扫码记录 */
  getRecord(body: Partial<ScanRecord> & IPageParams) {
    return baseAxios.post<APIListResponse<ScanRecord>>(
      '/api/scanning/record/list',
      body,
    )
  },
  /** 扫码入库 */
  scanPut(params: ScanParams) {
    return baseAxios.post<APIResponse<ScanResponse>>(
      '/api/business/operation/scan/put',
      params,
    )
  },
  /** 扫码签收 */
  scanSign(params: ScanParams) {
    return baseAxios.post<APIResponse<ScanSignResponse>>(
      '/api/business/operation/scan/sign',
      params,
    )
  },
  /** 扫码出库 */
  ScanOut(params: ScanParams) {
    return baseAxios.post<APIResponse<ScanResponse>>('/api/business/operation/scan/out/storage', params)
  },
  /** 批量出库 */
  outList(body: { orderIdList: any[] }) {
    return baseAxios.post<APIResponse<ScanResponse>>('/api/logistics/order/delivery/storage', body.orderIdList)
  },
  scanHistory(body: Partial<EntrepotStorageRacks & IPageParams>) {
    return baseAxios.post<APIListResponse<ScanRecord>>('/api/sign/record/list', body)
  },
}

export const costAPI = {
  /** 更新-添加仓库费用设置 */
  setConfig(body: { cost: number }) {
    return baseAxios.post<APIResponse<Partial<Cost>>>('/api/logistics/cost/config/update/or/insert', body)
  },

  /* 查询仓库费用设置详情 */
  getConfig(body: {
    entrepotId: number
    feeType: string
    membershipLevel: string
    platform: string
    region: string
  }) {
    return baseAxios.post<APIResponse<Cost>>('/api/logistics/cost/config/info', body)
  },

  /** 查询仓库费用设置列表 */
  getSetting(body: Partial<CostSetting>) {
    return baseAxios.post<APIListResponse<Cost>>('/api/logistics/cost/setting/list', body)
  },

  /** 修改仓库费用设置 */
  setSetting(body: Partial<Cost>) {
    return baseAxios.post<APIResponse<Partial<Cost>>>('/api/logistics/cost/setting/update/or/insert', body)
  },

}

export interface CostSetting {
  entrepotId: number
  feeType: string
  membershipLevel: string
  platform: string
  region: string
}

export interface Cost {
  createBy: number
  createTime: string
  entrepotId: number
  expense: number
  feeType: string
  id: number
  membershipLevel: string
  platform: string
  region: string
  settingItemValue: string
  updateBy: number
  updateTime: string
}

interface Sender {
  createBy: number
  createTime: string
  deleteStatus: number
  details: string
  entrepotId: number
  id: number
  isDefault: boolean
  state: boolean
  type: number
  updateBy: number
  updateTime: string
}

interface DhParams {
  businessType: string // 业务类型 字典值：business_type
  operatorUser: string // 打包员
  pageNum: number // 当前页
  pageSize: number // 每页大小
  region: string // 地区
  sendWarehouse: number // 送往仓库
  shippingCarrier: string // 运输承运商
  shopeeStatus: string // 虾皮订单状态 字典值
  shrimpOrderNo: string // 虾皮订单号
  stockRemovalEndTime: string // 出库时间--结束时间
  stockRemovalStartTime: string // 出库时间--开始时间
  storeType: string // 店铺类型 字典值：business_type
}

interface ScanRecord {
  createBy: number
  createTime: string
  deleteStatus: number
  id: number
  instructions: string
  scanningRecordId: number
  sendWarehouse: number
  sendWarehouseName: string
  signer: string
  trackingNumber: string
  updateBy: number
  updateTime: string
}

export interface ScanSignResponse {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  id: string
  trackingNumber: string
  sendWarehouse: number
  sendWarehouseName: string
  instructions: string
  problemStatus: false
  operator: string
  deleteStatus: number
}

export interface ScanResponse {
  orderType: string
  orderCount: number
  freightSpaceName: string
  signingTime: string
  orderItemInfoBgResultList: Omit<Order, 'orderProductList'> &
  {
    logisticsOrderProductList: LogisticsOrderProduct[]
  }[]
  logisticsEntrepot: Entrepot
}

export interface LogisticsOrderProduct {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  id: string
  tenantryId: string
  orderId: string
  freightSpaceName: string
  itemId: any
  orderItemId: any
  productImg: string[]
  productName: string
  sku: string
  globalArticleNo: string
  specificationName: string
  quantity: number
  unitPrice: number
  trackingNo: string
  actualQuantity: any
  holdStock: boolean
  trackingStatus: string
  deliveryMethod: string
  stockOutStatus: boolean
  purchaseStatus: boolean
  problemStatus: boolean
  customStatus: boolean
  checkStatus: any
  extraStatus: boolean
  remark: string
  deleteStatus: number
  signingTime: string
}

// const data = {
//   orderItemInfoBgResultList: [
//     {
//       createBy: '38803390127000130',
//       createTime: '2024-08-02 20:33:10',
//       updateBy: '0',
//       updateTime: '2024-08-02 20:33:10',
//       id: '42190330306000102',
//       tenantryId: '38803385032000196',
//       tenantryNo: '441114',
//       platformType: '0',
//       orderType: '0',
//       createType: '1',
//       platformShopId: null,
//       shrimpOrderNo: '0002',
//       shopeeStatus: null,
//       cod: false,
//       orderAmount: 888,
//       currency: null,
//       whetherPack: true,
//       transportType: '0',
//       sheetNumber: null,
//       sheetStatus: false,
//       shippingTime: '2024-07-20',
//       cancellationTime: '2024-07-31',
//       sendWarehouse: '38308930279000160',
//       orderTime: null,
//       packTime: null,
//       stockRemovalTime: null,
//       consignmentTime: null,
//       estimatedShippingFee: null,
//       actualShippingFee: null,
//       shipByDate: null,
//       buyerUsername: null,
//       recipients: '汪锦',
//       mobileNumber: '',
//       postcode: '00000',
//       region: 'TW',
//       province: '台湾省',
//       city: '宝莲',
//       area: '莲花湾',
//       town: '常平镇',
//       detailedAddress: '常平阳光大道666',
//       orderStatus: '0',
//       totalCost: 0,
//       packCost: 0,
//       firstLegCost: 0,
//       addedCost: 0,
//       appendCost: 0,
//       fillShipInfo: true,
//       urgentStatus: false,
//       problemStatus: false,
//       parcelType: null,
//       parcelWeight: 0,
//       parcelLength: 0,
//       parcelWide: 0,
//       parcelHigh: 0,
//       panelBarCode: null,
//       remark: '汪锦测试',
//       entrepotRemark: null,
//       label: null,
//       deleteStatus: 0,
//       logisticsOrderProductList: [
//         {
//           createBy: '38803390127000130',
//           createTime: '2024-08-02 20:33:10',
//           updateBy: '0',
//           updateTime: '2024-08-02 20:33:10',
//           id: '42190330454000104',
//           tenantryId: '38803385032000196',
//           orderId: '42190330306000102',
//           freightSpaceName: '汪04-03',
//           itemId: null,
//           orderItemId: null,
//           productImg: [''],
//           productName: '保时捷',
//           sku: 'A6',
//           globalArticleNo: '',
//           specificationName: '最新款',
//           quantity: 1,
//           unitPrice: 1200000,
//           trackingNo: '00100000',
//           actualQuantity: null,
//           holdStock: false,
//           trackingStatus: '1',
//           deliveryMethod: '',
//           stockOutStatus: false,
//           purchaseStatus: false,
//           problemStatus: false,
//           customStatus: false,
//           checkStatus: null,
//           extraStatus: false,
//           remark: null,
//           deleteStatus: 0,
//           signingTime: '2024-08-02 22:02:53',
//         },
//         {
//           createBy: '38803390127000130',
//           createTime: '2024-08-02 20:33:10',
//           updateBy: '0',
//           updateTime: '2024-08-02 20:33:10',
//           id: '42190330465000151',
//           tenantryId: '38803385032000196',
//           orderId: '42190330306000102',
//           freightSpaceName: null,
//           itemId: null,
//           orderItemId: null,
//           productImg: [''],
//           productName: '奥迪',
//           sku: 'A6',
//           globalArticleNo: '',
//           specificationName: '最新款',
//           quantity: 1,
//           unitPrice: 400000,
//           trackingNo: '00100002',
//           actualQuantity: null,
//           holdStock: false,
//           trackingStatus: '0',
//           deliveryMethod: '',
//           stockOutStatus: false,
//           purchaseStatus: false,
//           problemStatus: false,
//           customStatus: false,
//           checkStatus: null,
//           extraStatus: false,
//           remark: null,
//           deleteStatus: 0,
//           signingTime: null,
//         },
//       ],
//     },
//   ],
//   logisticsEntrepot: {
//     createBy: '1',
//     createTime: '2024-06-12 22:47:43',
//     updateBy: '1',
//     updateTime: '2024-06-12 22:47:43',
//     id: '37792003361000106',
//     entrepotName: '7666',
//     inventorySupported: 0,
//     inventoryStatus: 1,
//     entrepotType: 0,
//     storeType: '0',
//     supportArea: '',
//     consignee: '老吴头',
//     telephone: '',
//     deliveryAddress: '省市区',
//     detailedAddress: '详细地址哈哈哈',
//     qrCode:
//       'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2206469993218/O1CN01GgZIv21ZdtGVU5hF1_!!0-item_pic.jpg_.webp',
//     openUser: 1,
//     remark: '',
//     deleteStatus: 0,
//   },
// };
export interface ScanParams {
  sendWarehouse: string // 送往仓库
  trackingNo?: string // 快递单号
  shrimpOrderNo?: string // 订单号
}

// export interface OrderInfo {
//   addedCost: number; // 增值费用
//   appendCost: number; // 附加费用
//   area: string; // 区
//   cancellationTime: string; // 取消时间
//   city: string; // 城市
//   consignmentTime: string; // 交运时间
//   createBy: number; // 创建人
//   createTime: string; // 创建时间
//   createType: string; // 订单创建类型  字典值
//   deleteStatus: number; // 状态：默认为0；删除为1
//   detailedAddress: string; // 详细地址
//   entrepotRemark: string; // 仓库备注
//   fillShipInfo: boolean; // 是否未填写发货信息 false 否 true 是
//   firstLegCost: number; // 头程费用
//   id: number; // 主键
//   label: string; // 标签
//   logisticsChannel: string; // 物流渠道  字典值
//   mobileNumber: string; // 手机号码
//   orderAmount: number; // 订单金额
//   orderStatus: string; // 订单状态  字典值
//   orderTime: string; // 订单时间
//   orderType: string; // 订单类型  字典值
//   packCost: number; // 打包费用
//   packTime: string; // 打包时间
//   panelBarCode: string; // 面板条码
//   parcelHigh: number; // 包裹高度
//   parcelLength: number; // 包裹长度
//   parcelType: string; // 包裹类型  字典值
//   parcelWeight: number; // 包裹重量
//   parcelWide: number; // 包裹宽度
//   platformShopId: string; // 店铺id
//   platformType: string; // 平台类型  字典值
//   postcode: string; // 邮编
//   problemStatus: boolean; // 是否问题订单 false 否 true 是
//   province: string; // 省
//   recipients: string; // 收件人
//   region: string; // 地区
//   remark: string; // 备注
//   sendWarehouse: number; // 送往仓库
//   sheetFile: string; // 面单文件
//   sheetFileTime: string; // 面单申请时间
//   shippingTime: string; // 出货时间
//   shrimpOrderNo: string; // 虾皮订单号
//   shrimpWaybillNo: string; // 虾皮运单号
//   stockRemovalTime: string; // 出库时间
//   tenantryId: number; // 租户id
//   totalCost: number; // 总费用
//   town: string; // 镇
//   transportType: string; // 运输类型  字典值
//   updateBy: number; // 更新人
//   updateTime: string; // 更新时间
//   urgentStatus: boolean; // 是否加急 false 否 true 是
// }
