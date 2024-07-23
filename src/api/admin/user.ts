import { LoginResponse } from '@/types/user';
import baseAxios,{ getRequestEndInfo }  from '..';
import { APIListResponse, APIResponse } from '../type';
import { EndType, getEndType } from '@/routes';

export const login = (params) => {
  const { userLoginAccount, userLoginPassword, captcha } = params;
  return baseAxios.post<APIResponse<LoginResponse>>('/api/system/login', {
    captcha,
    userLoginAccount,
    userLoginPassword,
  });
};
export const loginExit = () => {
  return baseAxios.post<APIResponse<LoginResponse>>('/api/system/exit');
};

export const getCaptcha = (randomVal?: any) => {
  const val = randomVal ? `?${randomVal}` : '';
  return getRequestEndInfo.baseUrl + '/api/code/captcha.jpg' + val; //! todo 确定一下
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
    if(getEndType() === EndType.CLIENT){
      return baseAxios.get<APIListResponse<UserInfo>>('/api/tenantry/user/personalCenter');
    }
    return baseAxios.get<APIListResponse<UserInfo>>('/api/user/personalCenter');
  },
  updateSelf(body: Partial<UserInfo>) {
    return baseAxios.post<APIResponse>('/api/user/updateSelf', body);
  },
};
