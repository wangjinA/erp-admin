import { SearchTableSchema } from '@/components/SearchTable'
import ShopRadio from '@/components/Selectors/ShopRadio'

export const OrderFilter: SearchTableSchema[] = [
  {
    schema: {
      field: 'platformShopId',
      label: '所属店铺',
      span: 24,
    },
    control: <ShopRadio></ShopRadio>,
    isSearch: true,
  },
  {
    schema: {
      field: 'selectLogisticsOrderVO.shrimpOrderNo',
      label: '订单编号',
    },
    controlProps: {
      placeholder: '请输入订单号，多个订单号用英文逗号\',\'或空格\' \'隔开',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'selectOrderProductVO.trackingNo',
      label: '物流单号',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'selectLogisticsOrderVO.packTimes',
      label: '打包时间',
    },
    control: 'datePickerRange',
  },
  {
    schema: {
      field: 'selectLogisticsOrderVO.stockRemovalTimes',
      label: '出库时间',
    },
    control: 'datePickerRange',
  },

  {
    schema: {
      field: 'selectOrderProductVO.productName',
      label: '商品名称',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'selectOrderProductVO.sku',
      label: '规格SKU',
    },
    control: 'input',
  },
  // {
  //   schema: {
  //     field: 'selectOrderProductVO.globalArticleNo',
  //     label: '全球货号',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'orderType',
  //     label: '订单类型',
  //   },
  //   control: <DictSelector dictCode="order_type"></DictSelector>,
  // },
  // {
  //   schema: {
  //     field: 'timeType3',
  //     label: '屋程物流',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'timeType4',
  //     label: '运输类型',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'timeType55',
  //     label: '所属站点名称',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'timeType6',
  //     label: '订单状态',
  //   },
  //   control: <DictSelector dictCode='order_status'></DictSelector>
  // },
  // {
  //   schema: {
  //     field: 'timeType7',
  //     label: '卖家标识',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'timeType8',
  //     label: '卖家手机',
  //   },
  //   control: 'input',
  // },

  // {
  //   schema: {
  //     field: 'timeType12',
  //     label: '交运时间',
  //   },
  //   control: (props: any) => (
  //     <DatePicker.RangePicker {...TimeRangeDefaultProps} {...props} />
  //   ),
  // },
  // {
  //   schema: {
  //     field: 'timeType13',
  //     label: '预刷时间',
  //   },
  //   control: (props: any) => (
  //     <DatePicker.RangePicker {...TimeRangeDefaultProps} {...props} />
  //   ),
  // },
  // {
  //   schema: {
  //     field: 'timeType14',
  //     label: '申请面单时间',
  //   },
  //   control: (props: any) => (
  //     <DatePicker.RangePicker {...TimeRangeDefaultProps} {...props} />
  //   ),
  // },
  // {
  //   schema: {
  //     field: 'timeType15',
  //     label: '发货类型',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'timeType16',
  //     label: '标签',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'timeType21',
  //     label: '仓位编码',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'timeType22',
  //     label: '店铺ID',
  //   },
  //   control: 'input',
  // },
  // {
  //   schema: {
  //     field: 'timeType23',
  //     label: '商品ID',
  //   },
  //   control: 'input',
  // },
]
