import baseAxios from '../index'
import { APIListResponse, APIResponse, IPageParams } from '../type'

export interface Tenantry {
  customerService: string
  endCumulativeRecharge: number
  endPointBalance: number
  pageNum: number
  pageSize: number
  registeredEndTime: string
  registeredStartTime: string
  startCumulativeRecharge: number
  startPointBalance: number
  tenantryName: string
  tenantryNo: string
  tenantryPhone: string
  wechatId: string
}

export const tenantryUserAPI = {
  getList(body?: Partial<Tenantry & IPageParams>) {
    return baseAxios.post<APIListResponse<Tenantry>>('/api/tenantry/list', body)
  },
  getDPList(body?: Partial<Tenantry & IPageParams>) {
    return baseAxios.post<APIListResponse<Tenantry>>('/api/tenantry/list/user', body)
  },
  get(id: number) {
    return baseAxios.get<APIResponse<Tenantry>>(`/api/tenantry/info/\${id}`)
  },
  create(body: Partial<Tenantry>) {
    return baseAxios.post<APIResponse>('/api/tenantry/insert', body)
  },
  update(body: Partial<Tenantry>) {
    return baseAxios.post<APIResponse>('/api/tenantry/update', body)
  },
  remove(id: number) {
    return baseAxios.get<APIResponse>(`/api/tenantry/remove/${id}`)
  },
}
