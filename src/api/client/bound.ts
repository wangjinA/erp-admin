import baseAxios from '..'
import { APIListResponse, APIResponse } from '../type'

export interface LogisticsBoundInfo {
  id: string
  userName: string
  headImg: string
  telephone: string
}

export const boundAPI = {
  // 查看已经绑定的物流商
  getBoundInfo() {
    return baseAxios.get<APIResponse<LogisticsBoundInfo>>('/api/tenantry/look/bound')
  },

  // 查看可以绑定的物流商
  getLogisticsList() {
    return baseAxios.get<APIListResponse<LogisticsBoundInfo>>('/api/tenantry/look/can/bound/logistics')
  },

  // 绑定物流商
  bindLogistics(logisticsAdminUserId: string) {
    return baseAxios.get(`/api/tenantry/bound/logistics/${logisticsAdminUserId}`)
  },
}
