import { APIResponse } from '../type'

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
}

export interface ProcessInfo {
  userLoginAccount: string
  erpToken: string
  progress: Record<string, string>
  storeId: number
  accessToken: string
  error: string
  duration: number
  goodsTotal: number
}

export interface ShipmentUpdateBody {
  userLoginAccount: string
  shopId: string
  day: number
}
