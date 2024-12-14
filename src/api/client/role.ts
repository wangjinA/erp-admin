import { random } from 'lodash'

import baseAxios from '..'
import { APIListResponse, APIResponse, IPageParams } from '../type'

export interface Role {
  createBy: number
  createTime: string
  deleteStatus: number
  id: number
  menuIds: number[]
  roleUserInfoVOList: {
    userId: number
    userName: string
  }[]
  remark: string
  roleCode: string
  roleName: string
  systemAcquiesce: number
  tenantryId: number
  updateBy: number
  updateTime: string
}

export const roleAPI = {
  get(body?: Partial<Role & IPageParams>) {
    return baseAxios.post<APIListResponse<Role>>('/api/tenantry/role/list', body)
  },
  create(body: Partial<Role>) {
    return baseAxios.post<APIResponse>('/api/tenantry/role/insert', {
      menuIds: [],
      roleCode: random(0, 1000).toString(),
      systemAcquiesce: 0,
      tenantryId: 0,
      ...body,
    })
  },
  remove(id) {
    return baseAxios.get<APIResponse>(`/api/tenantry/role/remove/${id}`)
  },
  update(body: Partial<Role>) {
    return baseAxios.post<APIResponse>('/api/tenantry/role/update', body)
  },
  info(id: any) {
    return baseAxios.get<APIResponse>(`/api/tenantry/role/info/${id}`)
  },
  getRoleUsers(roleId: any) {
    return baseAxios.get<APIResponse>(`/api/tenantry/role/user/info/${roleId}`)
  },
  /**
   * 保存角色菜单
   */
  saveRoleMenu(body: {
    roleId: number
    menuIdList: number[]
  }) {
    return baseAxios.post<APIResponse>('/api/tenantry/role/menu/save/or/update', body)
  },
  /**
   * 保存角色用户
   */
  saveRoleUser(body: {
    roleId: number
    userIdList: number[]
  }) {
    return baseAxios.post<APIResponse>('/api/tenantry/role/user/save/or/update', body)
  },

  /**
   * 保存角色用户 by admin
   */
  saveRoleUserByAdmin(body: {
    roleId: number
    userIdList: number[]
  }) {
    return baseAxios.post<APIResponse>('/api/tenantry/role/save/or/update/user', body)
  },

  saveRoleMenuByAdmin(body: {
    roleId: number
    menuIdList: number[]
  }) {
    return baseAxios.post<APIResponse>('/api/tenantry/role/save/or/update/menu', body)
  },

}
