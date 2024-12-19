import baseAxios from '..'
import { MenuItem } from '../menu'
import { APIListResponse, IPageParams } from '../type'

export const menuAPI = {
  list(body: Partial<MenuItem> & IPageParams) {
    return baseAxios.post<APIListResponse<MenuItem>>('/api/menu/list', body)
  },
  create(body: MenuItem) {
    return baseAxios.post('/api/menu/insert', body)
  },
  update(body: MenuItem) {
    return baseAxios.post('/api/menu/update', body)
  },
  remove(id: number) {
    return baseAxios.get(`/api/menu/remove/${id}`)
  },
}

export const clientMenuAPI = {
  list(body: Partial<MenuItem> & IPageParams) {
    return baseAxios.post<APIListResponse<MenuItem>>('/api/tenantry/menu/list', body)
  },
  create(body: MenuItem) {
    return baseAxios.post('/api/tenantry/menu/insert', body)
  },
  update(body: MenuItem) {
    return baseAxios.post('/api/tenantry/menu/update', body)
  },
  remove(id: number) {
    return baseAxios.get(`/api/tenantry/menu/remove/${id}`)
  },
}
