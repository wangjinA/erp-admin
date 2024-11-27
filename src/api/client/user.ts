import baseAxios from '..'
import { APIResponse } from '../type'

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
}
