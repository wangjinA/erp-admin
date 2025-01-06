import baseAxios from '..'
import { APIListResponse, APIResponse, IPageParams } from '../type'

import { OrderResponseItem } from '@/types/order'

export const orderAPI = {
  // 获取订单列表
  getList(body: Partial<SearchOrderParams & IPageParams>) {
    return baseAxios.post<APIListResponse<SearchOrderParams>>(
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
  cancel(orderIdList: any[]) {
    return baseAxios.post('/api/logistics/order/batch/cancel/order', {
      orderIdList,
    })
  },
  refresh(orderIdList: number[]) {
    return baseAxios.post(`/api/logistics/order/batch/update/order`, orderIdList)
  },

  /**
   * 安排出货
   */
  shipment(body: {
    orderId: number
    /** 寄件人姓名 */
    senderRealName: string
    /** 快递单号 */
    trackingNo: string
  }) {
    return baseAxios.post(`/api/logistics/order/arrange/shipment`, body)
  },

  /**
   * 获取发货时所需要填写的数据
   */
  getShippingParameter(orderId: number) {
    return baseAxios.get<APIResponse<getShippingParameterRes>>(`/api/logistics/order/get/shipping/parameter/${orderId}`)
  },
  createShellOrder(orderId) {
    return baseAxios.get<APIResponse<{
      list: string[]
    }>>(`/api/logistics/order/get/tracking/number/${orderId}`)
  },
  saveOrder(orderItem: OrderResponseItem) {
    return baseAxios.post('/api/logistics/order/save/data', orderItem)
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
  pickUp: null
  deleteStatus: number
}

interface InfoNeeded {
  dropoff: ('sender_real_name' | 'tracking_no')[]
}

export interface SearchOrderParams extends IPageParams {
  // 订单信息
  selectLogisticsOrderVO: {
    createType: string // 订单创建类型
    label: string // 标签
    logisticsChannel: string // 物流渠道
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
    sortType: number // 查询排序 0 按打包时间排序 1 按紧急程度排序
    stockRemovalEndTime: string // 出库结束时间
    stockRemovalStartTime: string // 出库开始时间
    tenantryNo: string // 用户标识
    tenantryPhone: string // 手机号
    transportType: string // 运输类型
  }
  selectOrderProductVO: {
    // 物流商品信息
    deliveryMethod: string // 发货方式
    freightSpaceName: string // 仓位编码
    itemId: string // 平台商品id
    trackingNo: string // 快递单号
  }
}
