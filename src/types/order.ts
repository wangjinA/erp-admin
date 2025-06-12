export interface OrderProductList {
  actualQuantity: number // 实际收货数量
  checkStatus: boolean // 核对状态
  createBy: number // 创建人
  createTime: string // 创建时间
  customStatus: boolean // 是否为自定义订单：默认为空
  deleteStatus: number // 状态：默认为0；删除为1
  deliveryMethod: string // 发货方式
  globalArticleNo: string // 全球货号
  holdStock: boolean // 是否保留库存：默认为
  id: number // 主键
  itemId: number // 虾皮平台商品id
  orderId: number // 订单id
  orderItemId: number // 虾皮平台订单商品id
  problemStatus: boolean // 是否为问题订单：默认为空
  productImg: string // 商品图片
  productName: string // 商品名称
  purchaseStatus: boolean // 是否采购：默认为
  quantity: number // 数量
  remark: string // 备注
  sku: string // SKU
  specificationName: string // 规格名称
  freightSpaceName: string // 仓位
  stockOutStatus: boolean // 是否缺货打包：默认为
  tenantryId: number // 租户id
  trackingNo: string // 快递单号
  trackingStatus: string // 快递状态
  unitPrice: number // 单价
  updateBy: number // 更新人
  updateTime: '' // 更新时间
}
export interface Order {
  actualShippingFee: number // 实际运费
  addedCost: number // 增值费用
  appendCost: number // 附加费用
  area: string // 区
  cancellationTime: string // 取消时间
  city: string // 城市
  cod: boolean // 是否货到付款
  consignmentTime: string // 交运时间
  createBy: number // 创建人
  createTime: string // 创建时间
  createType: string // createType字典值
  currency: string // 货币
  deleteStatus: number // 状态：默认为0；删除为1
  detailedAddress: string // 详细地址
  entrepotRemark: string // 仓库备注
  estimatedShippingFee: number // 预计运费
  fillShipInfo: boolean // 是否未填写发货信息
  firstLegCost: number // 头程费用
  id: string // 主键
  label: string // 标签
  mobileNumber: string // 手机号码
  orderAmount: number // 订单金额
  needFill: number // 刷新列表，当订单数据的needFill为true 已出库的物流单号这里则是安排出货
  orderProductList: OrderProductList[]
  logisticsOrderProductList?: OrderProductList[]
  orderStatus: string // 订单状态 字典值
  shopeeStatus: string // 虾皮订单状态 字典值
  orderTime: string // 订单时间
  orderType: string // 订单类型 字典值
  packCost: number // 打包费用
  packTime: string // 打包时间
  packageNumber: string // 包裹编号
  panelBarCode: string // 面板条码
  parcelHigh: number // 包裹高度
  parcelLength: number // 包裹长度
  parcelType: string // 包裹类型 字典值
  parcelWeight: number // 包裹重量
  parcelWide: number // 包裹宽度
  platformShopId: number // 店铺id
  platformType: string // 平台类型 字典值
  postcode: string // 邮编
  problemStatus: boolean // 是否问题订单 false 否 true 是
  province: string // 省
  recipients: string // 收件人
  region: string // 地区
  remark: string // 备注
  sendWarehouse: string // 送往仓库字典
  clickPack: boolean // 是否一键打包，false就是编辑 true就是打包
  sheetnumber: string // 面单条码
  sheetStatus: boolean // 面单申请状态 false 没有申请 true 已经申请
  shipByDate: string // 最后发货日期
  shippingCarrier: string // 物流类型
  shippingTime: string // 出货时间
  shrimpOrderNo: string // 虾皮订单号
  shrimpStatus: string // 虾皮订单状态
  stockRemovalTime: string // 出库时间
  tenantryId: number // 租户id
  tenantryNo: string // 卖家标识
  totalCost: number // 总费用
  town: string // 镇
  transportType: string // 运输类型 字典值
  updateBy: number // 更新人
  updateTime: string // 更新时间
  urgentStatus: boolean // 是否加急 false 否 true 是
  whetherPack: boolean // 是否打包 false 否（待处理） true 已打包
}

export interface OrderResponseItem extends Omit<Order, 'orderProductList'> {
  orderProductVOList: (Omit<OrderProductList, 'productImg'> & {
    productImg: string[]
  })[]
  orderPackageList: {
    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
    id: string
    tenantryId: string
    orderId: number
    shrimpOrderNo: string
    packageNumber: string
    logisticsStatus: string
    shippingCarrier: string
    noPlasticPacking: number
    parcelChargeableWeight: number
    groupShipmentId: number
    virtualContactNumber: string
    packageQueryNumber: string
    goodsJson: string
    documentImgUrl?: string
    documentUrl?: string // html文档url
    applyTime: null
    trackingNumber?: string // 物流单号
    deleteStatus: number
  }[]
}
