import { ShopStore } from '../client/shopStore'
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
  remarks: string
}

export const tenantryUserAPI = {
  getList(body?: Partial<Tenantry & IPageParams>) {
    return baseAxios.post<APIListResponse<Tenantry>>('/api/tenantry/list', body)
  },
  getDPList(body?: Partial<Tenantry & IPageParams>) {
    return baseAxios.post<APIListResponse<Tenantry>>('/api/tenantry/list/user', body)
  },
  listByCurrentUser(body?: Partial<Tenantry & IPageParams>) {
    return baseAxios.post<APIListResponse<Tenantry>>('/api/tenantry/listByCurrentUser', body)
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
  /**
   * 获取用户店铺列表
   */
  getUserStoreList: cache((params: { id: any }) => {
    return baseAxios.get<APIListResponse<ShopStore>>('/api/tenantry/list/store', { params })
  }),

  /**
   * 设置备注
   */
  setRemark(body: {
    id: any
    remarks: string
  }) {
    return baseAxios.post('/api/tenantry/set/remark', body)
  },

  /**
   * 设置会员备注
   */
  setLogisticsRemark(body: {
    id: any
    logisticsRemark: string
  }) {
    return baseAxios.post('/api/tenantry/set/logisticsRemark', body)
  },
}

export function cache<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}
