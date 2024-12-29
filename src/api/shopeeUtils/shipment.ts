import { APIListResponse, APIResponse, IPageParams, SorterReq } from '../type'

import { ProcessInfo, ShipmentUpdateBody } from './types'

import shopeeUtilsAxios from '.'

export const shipmentAPI = {
  /**
   * 修改出货
   */
  update(body: ShipmentUpdateBody) {
    return shopeeUtilsAxios.post('/shipment/update', body)
  },

  /**
   * 查看修改进度
   */
  getProcess(body: {
    shopIds: any[]
    userLoginAccount: string
  }) {
    return shopeeUtilsAxios.post<APIResponse<ProcessInfo>>('/shipment/process', body)
  },

  getConsumerList(params: { userLoginAccount?: string, searchAll?: boolean, sorter?: SorterReq } & IPageParams) {
    return shopeeUtilsAxios.post<APIListResponse<ConsumerInfo>>('/consumer', params)
  },

  apply(body: { userLoginAccount, shopId }) {
    return shopeeUtilsAxios.post<APIResponse>('/consumer/apply', body)
  },
  agree(body: { userLoginAccount, shopId, expiredDate }) {
    return shopeeUtilsAxios.post<APIResponse>('/consumer/agree', body)
  },
  refuse(body: { userLoginAccount, shopId }) {
    return shopeeUtilsAxios.post<APIResponse>('/consumer/refuse', body)
  },
}

export interface ConsumerInfo {
  id: number
  userLoginAccount: string

  shopId: string

  platformShopId: number

  expiredDate: Date

  // 申请时间
  applyForDate: Date

  // 激活时间
  activateDate: Date

  status: string // 0 未激活 1 激活 2 过期

  remark: string
}
