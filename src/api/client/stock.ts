import baseAxios from '..'
import { APIListResponse, APIResponse, IPageParams } from '../type'

export const StockAPI = {
  /**
   * 查询商品信息详情
   */
  productInfo(id: string) {
    return baseAxios.get<APIResponse<any>>(`/api/logistics/product/info/${id}`)
  },
  /**
   * 新增商品信息
   */
  addGoodsInfo(body: Partial<ProductInfo>) {
    return baseAxios.post<APIResponse<any>>('/api/logistics/product/insert', body)
  },
  /**
   * 查询商品
   */
  getProductList(body: Partial<ProductInfo> & IPageParams) {
    return baseAxios.post<APIListResponse<ProductInfo>>('/api/logistics/product/list', body)
  },

  /**
   * 删除商品信息
   */
  deleteGoodsInfo(id: string) {
    return baseAxios.get<APIResponse<any>>(`/api/logistics/product/remove/${id}`)
  },

  /**
   * 同步指定商品
   */
  synchronousGoodsInfo(body: {
    platformIds: string
    storeId: number
  }) {
    return baseAxios.post<APIResponse<any>>(`/api/logistics/product/synchronous/assignment/product`, body)
  },

  /**
   * 同步商品
   */
  synchronousGoods(body: {
    productUpdateEndTime: string
    productUpdateStartTime: string
    storeId: any[]
  }) {
    return baseAxios.post<APIResponse<any>>('/api/logistics/product/synchronous/product', body)
  },

  /**
   * 修改商品信息
   */
  updateGoodsInfo(body: Partial<ProductInfo>) {
    return baseAxios.post<APIResponse<any>>('/api/logistics/product/update', body)
  },
}

export interface ProductInfo {
  createBy: number
  createTime: string
  currency: string
  deleteStatus: number
  id: number
  platformItemId: number
  platformShopId: number
  productCode: string
  productCost: number
  productImg: string
  productName: string
  quantity: number
  remark: string
  sku: string
  tenantryId: number
  unitPrice: number
  updateBy: number
  updateTime: string
}
