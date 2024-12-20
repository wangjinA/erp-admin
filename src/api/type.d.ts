export interface IPageParams {
  pageNum: number
  pageSize: number
}

export interface APIResponse<T = null> {
  code: number
  msg: string
  data: T
}

export interface ListResponse<T = null> {
  list: T[]
  pageNum: number
  pageSize: number
  total: number
}

export interface APIListResponse<T = null>
  extends APIResponse<ListResponse<T>> {}
