import axios from 'axios'

import { isProd } from '@/utils'

const timeout = 20 * 1000

const shopeeUtilsAxios = axios.create({
  baseURL: isProd() ? 'http://81.71.146.181:3001/shopee' : 'http://localhost:3001/shopee',
  timeout,
})

// shopeeUtilsAxios.interceptors.response.use((res) => {
//   return {
//     ...res,
//     data: {
//       ...res.data,
//       code: res.data.code,
//       message: res.data.msg,
//       ...res.data.data
//     },
//   }
// })

export default shopeeUtilsAxios
