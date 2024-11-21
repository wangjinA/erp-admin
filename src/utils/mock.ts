import { AxiosResponse } from 'axios'

import { SuccessCode } from '@/api'
import { APIListResponse } from '@/api/type'

export function mockListData(list: any[]): Promise<AxiosResponse<APIListResponse<any>>> {
  const data: APIListResponse = {
    code: SuccessCode,
    msg: '',
    data: {
      list,
      total: list.length,
      pageNum: 1,
      pageSize: 10,
    },
  }
  return Promise.resolve({
    data: {
      data,
    },
  } as any)
}
