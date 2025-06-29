import { Modal } from '@arco-design/web-react'
import axios, { AxiosResponse } from 'axios'
import { chunk, debounce } from 'lodash'

import { WhitePathList } from '@/constants/login'
import { EndType, getEndType, isLoginPage, toLoginPage } from '@/routes'
import { APIResponse } from './type'

interface RequestEndTypeInfo {
  baseUrl: string
  tokenKey: string
  loginInfoKey: string
}

// 域名
export const Domain = 'https://logistics.suyunbaoo.com'

const AdminRequestEndInfo: RequestEndTypeInfo = {
  baseUrl: import.meta.env.DEV
    ? '/prod-admin'
    : `${Domain}/prod-admin`,
  tokenKey: 'erp-admin-token',
  loginInfoKey: 'lg-admin-if',
}

const ClientRequestEndInfo: RequestEndTypeInfo = {
  baseUrl: import.meta.env.DEV
    ? '/prod-user'
    : `${Domain}/prod-user`,
  tokenKey: 'erp-user-token',
  loginInfoKey: 'lg-client-if',
}

// export const EndInfo = {
//   [EndType.ADMIN]: AdminRequestEndInfo,
//   [EndType.CLIENT]: ClientRequestEndInfo
// }

export const requestEndInfo
  = getEndType() === EndType.ADMIN ? AdminRequestEndInfo : ClientRequestEndInfo

const timeout = 2 * 60 * 1000

const baseAxios = axios.create({
  baseURL: requestEndInfo.baseUrl,
  timeout,
})

const whiteList = [
  '/api/tenantry/register',
  '/api/tenantry/short/letter',
  '/api/tenantry/login',
  '/api/tenantry/refresh',
]

baseAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem(requestEndInfo.tokenKey)
  if (token && !whiteList.includes(config.url!)) {
    config.headers.token = token
  }
  // config.headers = {
  //   ...config.headers,
  //   // deptId: '0',
  //   // identification: '1',
  //   // tenantryId: '38909991126000134',
  // } as any;
  return config
})

const loginModal = debounce((msg) => {
  if (!isLoginPage() && !WhitePathList.includes(location.pathname)) {
    Modal.confirm({
      title: '温馨提示',
      content: msg || '登录失效！',
      okText: '前往登陆',
      onOk() {
        toLoginPage()
      },
    })
  }
}, 300)

const errorMgsMap = {
  'Invalid access_token': '店铺授权过期，请重新授权',
  'Start time must be earlier than end time and diff in 15days': '时间范围要在15天内',
}

baseAxios.interceptors.response.use((res) => {
  if ([30010, 20].includes(res.data.code)) {
    loginModal(res.data.msg)
  }
  for (const key in errorMgsMap) {
    if (res.data.msg?.includes(key)) {
      res.data.msg = errorMgsMap[key]
    }
  }
  return res
})

export const SuccessCode = 200


export async function requestPoolLimit(requestList: (() => Promise<AxiosResponse<APIResponse<any>>>)[]) {
  const requestListGroup = chunk(requestList, 2)
  const resultList: AxiosResponse<APIResponse<any>>[] = []
  for await (const requestTwo of requestListGroup) {
    try {
      const res = await Promise.all(requestTwo.map(item => item()))
      resultList.push(...res);
    } catch (error) {
      resultList.push(error as AxiosResponse<APIResponse<any>>)
      console.error('error', error);
    }
  }
  const error = resultList.find(o => o.data.code !== SuccessCode);
  return error || resultList[0];
}

export default baseAxios
