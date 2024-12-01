import baseAxios from '..'
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

export interface MenuItem {
  cacheStatus: string
  createBy: number
  createTime: string
  menuAdminType: number
  menuComponent: string
  menuDataType: number
  menuIcon: string
  menuId: number
  menuName: string
  menuPath: string
  menuPerms: string
  menuSort: number
  menuStatus: string
  menuType: string
  parentId: string
  remark: string
  showStatus: string
  updateBy: number
  updateTime: string
}
