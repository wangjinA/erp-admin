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
    return shopeeUtilsAxios.post<APIResponse<Record<string, string>>>('/shipment/process', body)
  },
}

export interface ShipmentUpdateBody {
  userLoginAccount: string
  shopId: string
  day: number
}
