import { AxiosResponse } from 'axios';
import baseAxios from '..';
import { APIListResponse, APIResponse, IPageParams } from '../type';
export interface Dict {
  id: number;
  createBy: string; // "创建人",
  createTime: string; // "创建时间",
  deleteStatus: number; // "删除状态：0.正常，1.删除",
  dictCode: string; // "字典标识",
  dictName: string; // "字典名称",
  dictStatus: number; // "字典状态：0.正常，1.异常",
  remark: string; // "字典备注",
  sequenceNo: number; // "序号",
  updateBy: string; // "更新人",
  updateTime: string; // "更新时间",
}

export const dictAPI = {
  getList(body?: Partial<Dict & IPageParams>) {
    return baseAxios.post<APIListResponse<Dict>>('/api/dict/list', body);
  },
  get(id: number) {
    return baseAxios.get<APIResponse<Dict>>(`/api/dict/info/${id}`);
  },
  create(body: Partial<Dict>) {
    return baseAxios.post<APIResponse>('/api/dict/insert', body);
  },
  update(body: Partial<Dict>) {
    return baseAxios.post<APIResponse>('/api/dict/update', body);
  },
  remove(id: number) {
    return baseAxios.get<APIResponse>(`/api/dict/remove/${id}`);
  },
};

export type DictChild = {
  id: number; //	主键
  createBy: number; //	创建人
  createTime: string; //	创建时间
  deleteStatus: number; //	删除状态：0.正常，1.删除
  dictChildDesc: string; //	字典值描述
  dictChildStatus: number; //	字典值状态：0.正常，1.禁用
  dictCode: string; //	字典标识
  dictId: number; //	所属字典id
  dictValue: string; //	字典值
  displayName: string; //	字典名称
  sequenceNo: number; //	序号
  updateBy: number; //	更新人
  updateTime: string; //	更新时间
};

//! cache记得补一下
const cacheMap = new Map<
  string,
  Promise<AxiosResponse<APIResponse<DictChild>>>
>();

export const dictChildAPI = {
  getList(body?: Partial<DictChild & IPageParams>) {
    return baseAxios.post<APIListResponse<DictChild>>(
      '/api/dict/child/list',
      body
    );
  },
  get(id: number) {
    // const target =
    const pm = baseAxios.get<APIResponse<DictChild>>(
      `/api/dict/child/info/${id}`
    );
    return pm;
  },
  create(body: Partial<DictChild>) {
    return baseAxios.post<APIResponse>('/api/dict/child/insert', body);
  },
  update(body: Partial<DictChild>) {
    return baseAxios.post<APIResponse>('/api/dict/child/update', body);
  },
  remove(id: number) {
    return baseAxios.get<APIResponse>(`/api/dict/child/remove/${id}`);
  },
};
