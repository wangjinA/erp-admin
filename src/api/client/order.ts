import baseAxios from '..'
import { APIListResponse, APIResponse, IPageParams } from '../type'

import { Order, OrderProductList, OrderResponseItem } from '@/types/order'

export const orderAPI = {
  // 获取订单列表
  getList(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIListResponse<OrderResponseItem>>(
      '/api/logistics/order/list',
      body,
    )
  },

  // 获取订单详情
  getDetail(id: number) {
    return baseAxios.get(`/api/logistics/order/info/${id}`)
  },

  insert(body) {
    return baseAxios.post('/api/logistics/order/insert', body)
  },

  refresh(id: number) {
    return baseAxios.get(`/api/logistics/order/update/shopee/${id}`)
  },

  remove(id: number) {
    return baseAxios.get(`/api/logistics/order/remove/${id}`)
  },

  getSheet(id: number) {
    return baseAxios.get(`/api/logistics/order/view/sheet/${id}`)
  },

  getLog(orderId: number) {
    return baseAxios.post<APIListResponse<OrderLogItem>>(`/api/logistics/order/log/list`, {
      pageNum: 1,
      pageSize: 30,
      orderId,
    })
  },

  // 编辑订单
  update(body: Partial<Order>) {
    return baseAxios.post('/api/logistics/order/update', body)
  },

  // 取消打包
  cancelPack(id: any) {
    return baseAxios.get(`/api/logistics/order/cancel/${id}`)
  },

  getShopOrderCount(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIResponse<Record<string, number>>>('/api/logistics/order/fetch/store/count', body)
  },

  getPackCount(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIResponse<Record<string, number>>>('/api/logistics/order/fetch/package/count', body)
  },

  // 添加商品
  addProduct(body: Partial<OrderProductList>) {
    return baseAxios.post('/api/logistics/order/add/product', body)
  },

  syncOrder(body: SyncOrderParams) {
    const key = JSON.stringify(body.storeId)
    const gapTime = 10 * 60 * 1000 // 10分钟
    const sessionKey = 'SyncTimeCache'
    const SyncTimeCache = sessionStorage.getItem(sessionKey) ? JSON.parse(sessionStorage.getItem(sessionKey)) : {}
    const cacheTime = SyncTimeCache[key]
    const now = Date.now()
    if (!cacheTime || ((now - cacheTime) > gapTime)) {
      SyncTimeCache[key] = now
      sessionStorage.setItem(sessionKey, JSON.stringify(SyncTimeCache))
      return baseAxios.post('/api/logistics/order/synchronous/order', body, {
        timeout: 1000 * 60 * 5,
      })
        .then(r => r)
        .catch((e) => {
          SyncTimeCache[key] = 0
          sessionStorage.setItem(sessionKey, JSON.stringify(SyncTimeCache))
          throw new Error(e.response.data.message)
        })
    }
    throw new Error('10分钟内不可重复操作')
  },
}

export interface SyncOrderParams {
  orderUpdateEndTime: string
  orderUpdateStartTime: string
  storeId: number[]
}

export interface ReturnOperationInfo {
  recipientsInfo: string // 收件信息,用英文逗号隔开
  sendWarehouse: string // 送往仓库
  storeRemark: string // 店铺退件备注
  trackingNo: string // 快递单号，添加多个请使用英文逗号隔开
}

export interface OrderLogItem {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  id: string
  tenantryId: string
  orderId: string
  operationProcedure: string
  operationContent: string
  operatorUser: string
  deleteStatus: number
}

// export interface 未知 {
//   chargeMethod: string // 收费方式 字典值
//   id: number // 主键
//   logisticsCompany: string // 物流公司
//   logisticsTrackingNumber: string // 退件物流单号
//   platformRemark: string // 平台退件备注
//   returnLogisticsCosts: number // 退件物流费用
// }

export interface SearchOrderParams extends IPageParams {
  selectLogisticsOrderVO: {
    fillShipInfo: boolean
    label: string
    orderStatus: string
    packEndTime: string
    packStartTime: string
    platformShopId: string
    problemStatus: boolean
    remark: string
    shrimpOrderNo: string
    sortType: number
    stockRemovalEndTime: string
    stockRemovalStartTime: string
    whetherPack: boolean
  }
  selectOrderProductVO: {
    globalArticleNo: string
    productName: string
    purchaseStatus: boolean
    sku: string
    stockOutStatus: boolean
    trackingNo: string
  }
  trackingNumber: string
}
