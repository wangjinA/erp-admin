import { APIListResponse, APIResponse, IPageParams, SorterReq } from '../type'

import { ProcessInfo, ShipmentUpdateBody, UpdateItemResult } from './types'

import shopeeUtilsAxios from '.'

export const shipmentAPI = {
  /**
   * 修改出货
   */
  update(body: ShipmentUpdateBody) {
    return shopeeUtilsAxios.post('/shipment/update', body)
  },

  /**
   * 查看修改进度
   */
  getProcess(body: {
    shopIds: any[]
    userLoginAccount: string
  }) {
    return shopeeUtilsAxios.post<APIResponse<ProcessInfo>>('/shipment/process', body)
  },

  getConsumerList(params: { userLoginAccount?: string, searchAll?: boolean, sorter?: SorterReq } & IPageParams) {
    return shopeeUtilsAxios.post<APIListResponse<ConsumerInfo>>('/consumer', params)
  },

  apply(body: { userLoginAccount, shopId }) {
    return shopeeUtilsAxios.post<APIResponse>('/consumer/apply', body)
  },
  agree(body: { userLoginAccount, shopId, expiredDate }) {
    return shopeeUtilsAxios.post<APIResponse>('/consumer/agree', body)
  },
  refuse(body: { userLoginAccount, shopId }) {
    return shopeeUtilsAxios.post<APIResponse>('/consumer/refuse', body)
  },
  // updateShipmentByError(body: ShipmentUpdateBody) {
  //   return shopeeUtilsAxios.post<APIResponse>('/shipment/updateShipmentByError', body)
  // },
  saveCategortyAttribute(params: SaveCategortyAttributeParams) {
    return shopeeUtilsAxios.post<APIResponse>('/shipment/saveCategortyAttribute', params)
  },
  changeCategorty(params: {
    userLoginAccount: string
    itemIds: number[]
    shopId: string
    categoryId?: number
    isToCurrentCategoryOther?: boolean
  }) {
    return shopeeUtilsAxios.post<APIResponse<UpdateItemResult[]>>('/shipment/changeCategorty', params)
  },
  deleteItems(params: DeleteItemsParams) {
    return shopeeUtilsAxios.post<APIResponse>('/shipment/deleteItems', params)
  },

}

interface SaveCategortyAttributeParams {
  userLoginAccount: string

  data: Record<
    string,
    {
      original_attribute_name: string
      value_id: number
    }[]
  >
}

export interface ConsumerInfo {
  id: number
  userLoginAccount: string

  shopId: string

  platformShopId: number

  expiredDate: Date

  // 申请时间
  applyForDate: Date

  // 激活时间
  activateDate: Date

  status: string // 0 未激活 1 激活 2 过期

  remark: string
}

export interface UpdateAttributeItem {
  attribute_id: number
  attribute_value_list: UpdateAttributeValueItem[]
}

export interface UpdateAttributeValueItem {
  value_id: number
  original_value_name?: string
  value_unit?: string // kg; - 属性值的单位 （仅限 quantitative 属性）。
}

export interface DeleteItemsParams {
  userLoginAccount: string
  itemIds: number[]
  shopId: string
}
