import { LoginResponse } from '@/types/user';
import adminAxios,{ adminRequestEndInfo }  from '.';
import { APIListResponse, APIResponse } from './type';

export const login = (params) => {
  const { userLoginAccount, userLoginPassword, captcha } = params;
  return adminAxios.post<APIResponse<LoginResponse>>('/api/system/login', {
    captcha,
    userLoginAccount,
    userLoginPassword,
  });
};
export const loginExit = () => {
  return adminAxios.post<APIResponse<LoginResponse>>('/api/system/exit');
};

export const getCaptcha = (randomVal?: any) => {
  const val = randomVal ? `?${randomVal}` : '';
  return adminRequestEndInfo.baseUrl + '/api/code/captcha.jpg' + val; //! todo 确定一下
};

export interface UserInfo {
  createBy: number;
  createTime: string;
  deleteStatus: number;
  deptId: number;
  deptName: string;
  headImg: string;
  id: number;
  isAdmin: number;
  remark: string;
  roleIds: number[];
  roleName: string[];
  telephone: string;
  tenantryId: number;
  updateBy: number;
  updateTime: string;
  userLoginAccount: string;
  userName: string;
  userPassword: string;
  userSex: number;
  userStatus: number;
}

export const userAPI = {
  personalCenter() {
    return adminAxios.get<APIListResponse<UserInfo>>('/api/user/personalCenter');
  },
  updateSelf(body: Partial<UserInfo>) {
    return adminAxios.post<APIResponse>('/api/user/updateSelf', body);
  },
};
