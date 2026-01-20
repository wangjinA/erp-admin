import baseAxios from '..'
import { APIListResponse, APIResponse, IPageParams } from '../type'

import { ScanResponse } from './entrepot'

import { OrderResponseItem } from '@/types/order'

export const orderAPI = {
  // 获取订单列表
  getList(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIListResponse<OrderResponseItem>>(
      '/api/logistics/order/list',
      body,
    )
  },
  // 获取订单详情
  getDetail(id: string) {
    return baseAxios.get(`/api/logistics/order/info/${id}`)
  },
  insert(body) {
    return baseAxios.post('/api/logistics/order/insert', body)
  },
  cancel(orderIdList: any[]) {
    return baseAxios.post('/api/logistics/order/batch/cancel/order', {
      orderIdList,
    })
  },
  /**
   * 批量获取面单号
   */
  batchGetTrackingNumber(shrimpOrderNos: string[]) {
    return baseAxios.post('/api/logistics/order/get/tracking/number/batch', shrimpOrderNos)
  },
  refresh(orderIdList: string[]) {
    return baseAxios.post(`/api/logistics/order/batch/update/order`, orderIdList)
  },
  updateParameter(data) {
    return baseAxios.post<APIResponse>(`/api/logistics/order/update/shipping/parameter`, data)
  },

  /**
   * 安排出货
   */
  shipment(body: {
    orderId: string
    /** 寄件人姓名 */
    senderRealName: string
    /** 快递单号 */
  }) {
    return baseAxios.post('/api/logistics/order/arrange/shipment', body)
  },
  /**
   * 安排出货批量
   */
  shipmentBatch(body: {
    orderId: string
    /** 寄件人姓名 */
    senderRealName: string
    /** 快递单号 */
    trackingNo?: string
  }[]) {
    return baseAxios.post<APIResponse<{
      list: {
        msg: string
        orderId: string
      }[]
    }>>('/api/logistics/order/arrange/shipmentBatch', body)
  },

  /**
   * 获取发货时所需要填写的数据
   */
  getShippingParameter(orderId: string) {
    return baseAxios.get<APIResponse<getShippingParameterRes>>(`/api/logistics/order/get/shipping/parameter/${orderId}`)
  },
  createShellOrder(orderId) {
    return baseAxios.get<APIResponse<{
      list: string[]
    }>>(`/api/logistics/order/get/tracking/number/${orderId}`)
  },
  saveOrder(orderItem: any) {
    return baseAxios.post('/api/logistics/order/save/data', orderItem)
  },
  // 订单导出
  exportOrderList(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post('/api/logistics/order/exportXls', body, {
      responseType: 'blob',
    })
  },
  // 获取面单信息
  getDownloadSheetFile(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIResponse<{
      list: {
        orderNo: string
        orderId: string
        documentUrl: string
      }[]
    }
    >>('/api/logistics/order/getDownloadSheetFile', body)
  },
  // 统计下载面单数量
  countSheetFile(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIResponse<{
      abnormalSheetData: { orderId: string, orderNo: string }[]
      total: number
      count: number
    }
    >>('/api/logistics/order/countSheetFile', body)
  },
  // 异常搁置
  exceptionOnHold(params: {
    id: string
    abeyanceStatus: number
  }) {
    return baseAxios.get(`/api/logistics/order/mark/abeyance`, {
      params,
    })
  },
  // 海外仓退件列表
  overseasWarehouseReturnList(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIListResponse<SearchOrderParams>>(
      '/api/logistics/order/overseasWarehouseReturn/list',
      body,
    )
  },
  // 海外仓退件数量
  overseasWarehouseReturnCount(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIResponse<{
      total: number
      count: number
    }
    >>('/api/logistics/order/overseasWarehouseReturn/count', body)
  },
  // 撤销海外退件订单
  overseasWarehouseReturnRevocation(id: string) {
    return baseAxios.get(`/api/logistics/order/overseasWarehouseReturn/revocation/${id}`)
  },
  // 销毁海外退件订单 api/logistics/order/overseasWarehouseReturn/destroy/{id}
  overseasWarehouseReturnDestroy(id: string) {
    return baseAxios.get(`/api/logistics/order/overseasWarehouseReturn/destroy/${id}`)
  },
  // 批量销毁海外退件订单
  overseasWarehouseReturnDestroyBatch(body: string[]) {
    return baseAxios.post('/api/logistics/order/overseasWarehouseReturn/destroy/batch', body)
  },
  // 换单重出
  overseasWarehouseReturnReOutOverseasWarehouseReturnOrder(params: {
    id: string
    orderNo: string
  }) {
    return baseAxios.get('/api/logistics/order/overseasWarehouseReturn/reOutOverseasWarehouseReturnOrder', {
      params,
    })
  },
  // 修改快递拣货状态
  updatePickingStatus(params: {
    productId: number
    pickingStatus: number
  }) {
    return baseAxios.get(`/api/logistics/order/mark/pickingProduct?productId=${params.productId}&pickingStatus=${params.pickingStatus}`)
  },
  // 修改交运状态
  updateConsignmentStatus(params: {
    orderNo: string
    consignmentStatus: boolean
  }) {
    return baseAxios.get<APIResponse<ScanResponse>>(`/api/logistics/order/mark/delivery?orderNo=${params.orderNo}&consignmentStatus=${params.consignmentStatus}`)
  },

  // 更新仓库备注
  updateRemark(params: {
    orderId: string
    remark: string
  }) {
    return baseAxios.get(`/api/logistics/order/stash/remark?id=${params.orderId}&remark=${params.remark}`)
  },
}

interface getShippingParameterRes {
  createBy: null
  createTime: string
  updateBy: null
  updateTime: string
  id: string
  logisticsOrderId: number
  shrimpOrderNo: string
  infoNeeded: InfoNeeded
  dropoff: string
  pickUp: any
  deleteStatus: number
}

interface InfoNeeded {
  dropoff: ('sender_real_name' | 'tracking_no')[]
  pickUp: any
}

export interface SearchOrderParams extends IPageParams {
  // 订单信息
  selectLogisticsOrderVO: {
    createType: string // 订单创建类型
    label: string // 标签
    logisticsChannel: string // 承运商
    orderStatus: string // 订单状态
    packEndTime: string // 打包结束时间
    packStartTime: string // 打包开始时间
    platformShopId: string // 店铺id
    problemStatus: boolean // 是否问题订单 null 全部  否 true 是
    region: string // 地区
    sendWarehouse: number // 送往仓库
    sheetFileEndTime: string // 面单申请结束时间
    sheetFileStartTime: string // 面单申请开始时间
    shrimpOrderNo: string // 虾皮订单号，查询多个用英文逗号隔开
    shrimpWaybillNo: string // 虾皮运单号
    sortType: number // 查询排序 0 按打包时间排序 1 按紧急程度排序 2 按订单创建时间排序
    stockRemovalEndTime: string // 出库结束时间
    stockRemovalStartTime: string // 出库开始时间
    tenantryNo: string // 用户标识
    tenantryPhone: string // 手机号
    transportType: string // 运输类型
    abeyanceStatus: number
    shrimpStatus: string
    storeFlag: boolean
  }
  selectOrderProductVO: {
    // 物流商品信息
    deliveryMethod: string // 发货方式
    freightSpaceName: string // 仓位编码
    itemId: string // 平台商品id
    trackingNo: string // 快递单号
  }
}
