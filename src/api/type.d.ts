export interface IPageParams {
  pageNum: number;
  pageSize: number;
}

export interface APIResponse<T = null> {
  code: number;
  msg: string;
  data: T;
}

export interface APIListResponse<T = null>
  extends APIResponse<{
    list: T[];
    pageNum: number;
    pageSize: number;
    total: number;
  }> {}
