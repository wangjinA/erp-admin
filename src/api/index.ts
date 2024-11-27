import { Modal } from '@arco-design/web-react'
import axios from 'axios'
import { debounce } from 'lodash'

import { EndType, getEndType, toLoginPage } from '@/routes'

interface RequestEndTypeInfo {
  baseUrl: string
  tokenKey: string
}

const adminRequestEndInfo: RequestEndTypeInfo = {
  baseUrl: import.meta.env.DEV
    ? '/prod-admin'
    : 'https://logistics.drcstudio.cn/prod-admin',
  tokenKey: 'erp-admin-token',
}

const userRequestEndInfo: RequestEndTypeInfo = {
  baseUrl: import.meta.env.DEV
    ? '/prod-user'
    : 'https://logistics.drcstudio.cn/prod-user',
  tokenKey: 'erp-user-token',
}

export const getRequestEndInfo
  = getEndType() === EndType.ADMIN ? adminRequestEndInfo : userRequestEndInfo

const timeout = 20 * 1000

const baseAxios = axios.create({
  baseURL: getRequestEndInfo.baseUrl,
  timeout,
})

const whiteList = [
  '/api/tenantry/register',
  '/api/tenantry/short/letter',
  '/api/tenantry/login',
  '/api/tenantry/refresh',
]

baseAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem(getRequestEndInfo.tokenKey)
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
  Modal.confirm({
    title: '温馨提示',
    content: msg || '登录失效！',
    okText: '前往登陆',
    onOk() {
      toLoginPage()
    },
  })
}, 300)

baseAxios.interceptors.response.use((res) => {
  if ([30010, 20].includes(res.data.code)) {
    loginModal(res.data.msg)
  }
  return res
})

export const SuccessCode = 200

export default baseAxios
