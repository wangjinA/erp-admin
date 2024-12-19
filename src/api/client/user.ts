import baseAxios from '..'
import { APIListResponse, APIResponse, IPageParams } from '../type'

export const userAPI = {
  /**
   * 发送验证码
   */
  sendCode(params: { tenantryPhone: string }) {
    return baseAxios.get<APIResponse<any>>(
      '/api/tenantry/short/letter',
      {
        params,
      },
    )
  },
  /**
   * 注册
   */
  register(body: {
    password: string
    tenantryPhone: string
    verificationCode: string
  }) {
    return baseAxios.post<APIResponse<any>>(
      '/api/tenantry/register',
      body,
    )
  },
  insertUser(body: Partial<ClientUserInfo>) {
    return baseAxios.post<APIResponse<any>>(
      '/api/tenantry/user/insert',
      body,
    )
  },
  enableUser(params: {
    id: number
    enable: number
  }) {
    return baseAxios.get('/api/tenantry/user/enable', { params })
  },
  removeUser(id) {
    return baseAxios.get(`/api/tenantry/user/remove/${id}`)
  },
  updateUser(body: Partial<ClientUserInfo>) {
    return baseAxios.post('/api/tenantry/user/update', body)
  },
  userList(body: Partial<ClientUserInfo> & IPageParams) {
    return baseAxios.post<APIListResponse<ClientUserInfo>>('/api/tenantry/user/list', body)
  },
}

export interface ClientUserInfo {

  createBy: number
  createTime: string
  deleteStatus: number
  id: number
  isAdmin: number
  remark: string
  roleIdList: any[]
  tenantryId: number
  updateBy: number
  updateTime: string
  userLoginAccount: string
  userName: string
  userPassword: string
  userStatus: number
}
