import baseAxios from '..'
import { APIListResponse, APIResponse, IPageParams } from '../type'

export const StockAPI = {
  /**
   * 查询商品信息详情
   */
  productInfo(id: string) {
    return baseAxios.get<APIResponse<any>>(`/api/logistics/product/info/${id}`)
  },
  /**
   * 新增商品信息
   */
  addGoodsInfo(body: Partial<ProductItem>) {
    return baseAxios.post<APIResponse<any>>('/api/logistics/product/insert', body)
  },
  addGoodsInfoBatch(body: Partial<ProductItem>[]) {
    return baseAxios.post<APIResponse<any>>('/api/logistics/product/insertBatch', body)
  },
  /**
   * 查询商品
   */
  getProductList(body: Partial<ProductItem> & IPageParams) {
    return baseAxios.post<APIListResponse<ProductItem>>('/api/logistics/product/list', body)
  },

  /**
   * 删除商品信息
   */
  deleteGoodsInfo(id: string) {
    return baseAxios.get<APIResponse<any>>(`/api/logistics/product/remove/${id}`)
  },

  /**
   * 同步指定商品
   */
  synchronousGoodsInfo(body: {
    platformIds: string
    storeId: number
  }) {
    return baseAxios.post<APIResponse<any>>(`/api/logistics/product/synchronous/assignment/product`, body)
  },

  /**
   * 同步商品
   */
  synchronousGoods(body: {
    productUpdateEndTime: string
    productUpdateStartTime: string
    storeId: any[]
  }) {
    return baseAxios.post<APIResponse<any>>('/api/logistics/product/synchronous/product', body)
  },

  /**
   * 修改商品信息
   */
  updateGoodsInfo(body: Partial<ProductItem>) {
    return baseAxios.post<APIResponse<any>>('/api/logistics/product/update', body)
  },
  getLogs(body: Partial<StockLogItem> & IPageParams) {
    return baseAxios.post<APIResponse<any>>('/api/stock/log/list', body)
  },
}

/**
 * 入库申请API
 */
export const WarehousingApplyAPI = {
  getList(body: Partial<WarehousingApply> & IPageParams) {
    return baseAxios.post<APIListResponse<WarehousingApply>>('/api/stock/apply/list', body)
  },

  insert(body: Partial<StockApplyInsert>) {
    return baseAxios.post('/api/stock/apply/insert', body)
  },

  remove(id) {
    return baseAxios.get(`/api/stock/apply/remove/${id}`)
  },

  logs(id) {
    return baseAxios.get(`/api/stock/apply/log/list/${id}`)
  },
  /**
   * 入库
   */
  warehousing(body: WarehousingBody) {
    return baseAxios.post('/api/stock/apply/put/storage', body)
  },
}

export interface WarehousingBody {
  applyId: number
  putStorageProductVOS: [
    {
      id: number
      logisticsProductId: number
      productStorageId: number
      receiveProductCount: number
    },
  ]
  sendWarehouse: number
  serviceCharge: number
}

// 库存列表接口
export const StockListAPI = {
// /api/stock/product/list
// /api/stock/product/remove/{id}
// /api/stock/product/info/{id}
  getList(body: Partial<StockItem> & IPageParams) {
    return baseAxios.post<APIListResponse<StockItem>>('/api/stock/product/list', body)
  },
  remove(id: string) {
    return baseAxios.get<APIResponse<any>>(`/api/stock/product/remove/${id}`)
  },
  info(id: string) {
    return baseAxios.get<APIResponse<any>>(`/api/stock/product/info/${id}`)
  },
}

export interface StockStorageApplyProductList {
  createBy: number
  createTime: string
  deleteStatus: number
  id: number
  logisticsProductId: number
  productStorageId: number
  receiveProductCount: number
  remark: string
  sendProductCount: number
  tenantryId: number
  updateBy: number
  updateTime: string
}

export interface StockApplyInsert {
  auditStatus: number
  createBy: number
  createTime: string
  deleteStatus: number
  expressNo: string
  id: number
  sendWarehouse: string
  serviceCharge: number
  stockStorageApplyProductList: StockStorageApplyProductList[]
  storageCode: string
  storageStatus: number
  tenantryId: number
  updateBy: number
  updateTime: string
  whetherAllStatus: boolean
}

export interface StockLogItem {
  changeQuantity: number
  createBy: number
  createTime: string
  deleteStatus: number
  id: number
  logType: string
  pageNum: number
  pageSize: number
  productCode: string
  productCost: number
  productImg: string
  productImgCos: string
  productName: string
  remark: string
  sendWarehouse: number
  sku: string
  surplusStock: number
  tenantryId: number
  unitPrice: number
  updateBy: number
  updateTime: string
}

export interface StockItem {
  applyProductId: number
  chargingPeriodUnitQuantity: number
  createBy: number
  createTime: string
  deleteStatus: number
  freezeQuantity: number
  id: number
  lastCheckInTime: string
  lastFeeDeductionAmount: number
  lastFeeDeductionTime: string
  logisticsProductId: number
  productStorageId: number
  quantity: number
  seatCode: string
  seatId: number
  sendWarehouse: number
  tenantryId: number
  updateBy: number
  updateTime: string
}

export interface WarehousingApply {
  auditStatus: number
  createBy: number
  createTime: string
  deleteStatus: number
  expressNo: string
  id: number
  pageNum: number
  pageSize: number
  productName: string
  sendWarehouse: number
  serviceCharge: number
  storageCode: string
  storageStatus: number
  tenantryId: number
  updateBy: number
  updateTime: string
  whetherAllStatus: boolean
  selectApplyUser: {
    account: string // 申请人
    number: string // 用户标识
  }
}

export interface ProductItem {
  createBy: number
  createTime: string
  currency: string
  deleteStatus: number
  id: number
  platformItemId: number
  platformShopId: number
  productCode: string
  productCost: number
  productImg: string
  productImgCos: string
  productName: string
  quantity: number
  remark: string
  sku: string
  tenantryId: number
  unitPrice: number
  updateBy: number
  updateTime: string
  num: number;
}

export interface StockApplyAdmin {
  auditStatus: number
  createBy: number
  createTime: string
  deleteStatus: number
  expressNo: string
  id: number
  sendWarehouse: string
  serviceCharge: number
  logisticsProductList: ProductItem[]
  storageCode: string
  storageStatus: number
  tenantryId: number
  updateBy: number
  updateTime: string
  whetherAllStatus: boolean
}
