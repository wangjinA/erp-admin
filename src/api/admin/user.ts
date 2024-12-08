import baseAxios, { requestEndInfo } from '..'
import { APIListResponse, APIResponse } from '../type'

import { isClient } from '@/routes'
import { LoginResponse } from '@/types/user'

export function login(params, sessionId) {
  const { userLoginAccount, userLoginPassword, captcha } = params
  return baseAxios.post<APIResponse<LoginResponse>>('/api/system/login', {
    captcha,
    userLoginAccount,
    userLoginPassword,
  }, {
    headers: {
      sessionId,
    },
  })
}

export function loginExit() {
  return baseAxios.post<APIResponse<LoginResponse>>('/api/system/exit')
}

export function getCaptcha(randomVal: any) {
  const val = randomVal ? `?sessionId=${randomVal}` : ''
  return `${requestEndInfo.baseUrl}/api/code/captcha.jpg${val}`
}

export interface UserInfo {
  createBy: number
  createTime: string
  deleteStatus: number
  deptId: number
  deptName: string
  headImg: string
  id: number
  isAdmin: number
  remark: string
  roleIds: number[]
  roleName: string[]
  telephone: string
  tenantryId: number
  updateBy: number
  updateTime: string
  userLoginAccount: string
  userName: string
  userPassword: string
  userSex: number
  userStatus: number
}

export const userAPI = {
  personalCenter() {
    if (isClient()) {
      return baseAxios.get<APIListResponse<UserInfo>>('/api/tenantry/user/personalCenter')
    }
    return baseAxios.get<APIListResponse<UserInfo>>('/api/user/personalCenter')
  },
  updateSelf(body: Partial<UserInfo>) {
    return baseAxios.post<APIResponse>('/api/user/updateSelf', body)
  },

  list(body) {
    return baseAxios.post('/api/user/list', body)
  },

  create(body) {
    return baseAxios.post('/api/user/insert', body)
  },
  update(body) {
    return baseAxios.post('/api/user/update', body)
  },
  remove(id) {
    return baseAxios.get(`/api/user/remove/${id}`)
  },
}
