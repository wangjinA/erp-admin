import baseAxios from ".";
import { APIListResponse, IPageParams } from "./type";

export const shopStoreAPI = {
  // 获取店铺列表
  getList(body: Partial<ShopStore> & IPageParams) {
    return baseAxios.post<APIListResponse<ShopStore>>('/api/tenantry/store/list', body);
  },
};

export interface ShopStore {
  accessToken: string; //	凭证
  accessTokenExpireTime: string; //	凭证过期时间(date-time)
  anotherName: string; //	别名
  authExpireTime: string; //	授权过期时间(date-time)
  authTime: string; //	授权时间(date-time)
  createBy: number; //	创建人
  createTime: string; //	创建时间(date-time)
  deleteStatus: number; //	状态：默认为0；删除为1
  id: number; //	主键
  mainAccountId: string; //	开发者的主账号
  platformShopId: number; //	平台id
  refreshToken: string; //	刷新凭证
  refreshTokenExpireTime: string; //	刷新凭证过期时间(date-time)
  region: string; //	地区
  shopName: string; //	店铺名
  status: string; //	授权状态 字典值
  storeType: boolean; // 	店铺类型 false 本土 true 跨境		false
  tenantryId: number; //	租户id
  tenantryNo: string; //	卖家标识
  updateBy: number; //	更新人
  updateTime: string; //	更新时间(date-time)
}
