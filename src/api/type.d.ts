export interface IPageParams {
  pageNum: number;
  pageSize: number;
}

export interface APIResponse<T = null> {
  code: number;
  msg: string;
  data: T;
}

export interface APIListResponse<T = null> extends APIResponse<> {
  code: number;
  msg: string;
  data: {
    list: T[];
    pageNum: number;
    pageSize: number;
    pages: APIListResponse;
    total: number;
  };
}
