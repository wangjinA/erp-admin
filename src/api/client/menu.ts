import baseAxios from '..'
import { MenuItem } from '../menu'
import { APIListResponse } from '../type'

export const menuAPI = {
  list() {
    return baseAxios.get<APIListResponse<MenuItem>>('/api/tenantry/menu/list/all')
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
