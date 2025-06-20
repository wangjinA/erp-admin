import { CreateFormItemType } from '@/components/CreateFormItem'

export const OrderCreateSchema1: CreateFormItemType[] = [
  {
    schema: {
      field: 'platformType',
      label: '平台类型',
      defaultValue: '0'
    },
    control: 'dictSelector',
    controlProps: {
      dictCode: 'platform_type',
    },
  },
  {
    schema: {
      field: 'orderType',
      label: '订单类型',
      defaultValue: '0'
    },
    control: 'dictSelector',
    controlProps: {
      dictCode: 'order_type',
    },
  },
  {
    schema: {
      field: 'shrimpOrderNo',
      label: '订单编号',
      required: true,
    },
    control: 'input',
  },
  {
    schema: {
      field: 'trackingNumber',
      label: '运单号',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'orderAmount',
      label: '订单(代收)金额',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'transportType',
      label: '运输类型',
      defaultValue: 'KY'
    },
    control: 'dictSelector',
    controlProps: {
      dictCode: 'transport_type',
    },
  },
  {
    schema: {
      field: 'shippingCarrier',
      label: '承运商',
    },
    control: 'dictSelector',
    controlProps: {
      dictCode: 'logistics_channel',
    },
  },
  // {
  //   schema: {
  //     field: 'shippingTime',
  //     label: '出货时间',
  //   },
  //   control: 'datePicker',
  // },
  // {
  //   schema: {
  //     field: 'cancellationTime',
  //     label: '取消时间',
  //   },
  //   control: 'datePicker',
  // },
  {
    schema: {
      required: true,
      field: 'sendWarehouse',
      label: '送往仓库',
    },
    control: 'entrepotSelector',
  },
  {
    schema: {
      field: 'remark',
      label: '备注',
    },
    control: 'input',
  },
  // {
  //   schema: {
  //     field: 'timeType8',
  //     label: '面单文件',
  //   },
  //   controlProps: {
  //     autoCard: true,
  //   },
  //   control: 'upload',
  // },
]

export const OrderCreateSchema2: CreateFormItemType[] = [
  {
    schema: {
      field: 'productImg',
      label: '商品图片',
    },
    controlProps: {
      autoCard: true,
    },
    control: 'upload',
  },
  {
    schema: {
      required: true,
      field: 'productName',
      label: '商品名称',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'trackingNo',
      label: '快递单号',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'sku',
      label: 'SKU',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'specificationName',
      label: '规格名称',
      defaultValue: '默认'
    },
    control: 'input',
  },
  {
    schema: {
      field: 'deliveryMethod',
      label: '发货方式',
      required: true,
    },
    control: 'dictSelector',
    controlProps: {
      dictCode: 'delivery_method',
    },
  },
  {
    schema: {
      field: 'quantity',
      label: '数量',
      defaultValue: 1
    },
    control: 'number',
  },
  {
    schema: {
      field: 'unitPrice',
      label: '单价',
      defaultValue: 0
    },
    control: 'number',
  },
]
export const OrderCreateSchema3: CreateFormItemType[] = [
  {
    schema: {
      field: 'recipients',
      label: '收件人',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'mobileNumber',
      label: '手机号码',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'postcode',
      label: '邮编',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'region',
      label: '地区',
      defaultValue: 'TW'
    },
    control: 'dictSelector',
    controlProps: {
      dictCode: 'region',
    },
  },
  {
    schema: {
      field: 'province',
      label: '省',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'city',
      label: '城市',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'area',
      label: '区',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'town',
      label: '镇',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'detailedAddress',
      label: '详细地址',
    },
    control: 'input',
  },
]
