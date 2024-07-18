import { random } from 'lodash';
import adminAxios from '.';
import { APIListResponse, APIResponse, IPageParams } from './type';
interface Role {
  createBy: number;
  createTime: string;
  deleteStatus: number;
  id: number;
  menuIds: number[];
  remark: string;
  roleCode: string;
  roleName: string;
  systemAcquiesce: number;
  tenantryId: number;
  updateBy: number;
  updateTime: string;
}

export const roleAPI = {
  get(body?: Partial<Role & IPageParams>) {
    return adminAxios.post<APIListResponse<Role>>('/api/role/list', body);
  },
  create(body: Partial<Role>) {
    return adminAxios.post<APIResponse>('/api/role/insert', {
      menuIds: [1],
      roleCode: random(0, 1000).toString(),
      systemAcquiesce: 0,
      tenantryId: 0,
      ...body,
    });
  },
};
