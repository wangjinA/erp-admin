import { OrderPageType } from '.'

import { SearchTableSchema } from '@/components/SearchTable'
import { TimeRangeDisabledDateProps } from '@/constants'
import { isAdmin, isClient } from '@/routes'
import { showObj } from '@/utils'

interface OrderPageParams {
  type: OrderPageType
}

export const getOrderFilter: (params?: OrderPageParams) => SearchTableSchema[] = (params) => {
  const shopSchema: SearchTableSchema = {
    schema: {
      field: 'selectLogisticsOrderVO.platformShopId',
      label: '所属店铺',
      span: 24,
    },
    control: 'shopRadio',
    isSearch: true,
  }
  const sendWarehouse: SearchTableSchema = {
    schema: {
      label: '仓库',
      field: 'selectLogisticsOrderVO.sendWarehouse',
      span: 24,
    },
    control: 'entrepotRadio',
  }
  const consignmentStatus: SearchTableSchema = {
    schema: {
      label: '交运状态',
      field: 'selectLogisticsOrderVO.consignmentStatus',
      span: 24,
    },
    control: 'radio',
    controlProps: {
      options: [{
        label: '全部',
        value: null,
      }, {
        label: '交运中',
        value: true,
      }, {
        label: '已交运',
        value: 1,
      }],
    },
  }
  const list: SearchTableSchema[] = [
    ...showObj(isClient(), shopSchema),
    ...showObj(isAdmin(), sendWarehouse),
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
        label: '快递单号',
      },
      control: 'input',
    },
    {
      schema: {
        field: 'selectLogisticsVO.trackingNumber',
        label: '物流单号',
      },
      control: 'input',
    },
    {
      schema: {
        field: 'selectLogisticsOrderVO.shopeeStatus',
        label: '订单状态',
      },
      control: 'dictSelector',
      controlProps: {
        dictCode: 'shopee_status',
      },
    },
    {
      schema: {
        field: 'selectLogisticsOrderVO.reissued',
        label: '换单重出',
      },
      control: 'radio',
      controlProps: {
        options: [{
          label: '全部',
          value: null,
        }, {
          label: '是',
          value: 1,
        }, {
          label: '否',
          value: 0,
        }],
      },
    },
    {
      schema: {
        field: 'selectLogisticsOrderVO.createdTimes',
        label: '创建时间',
      },
      control: 'datePickerRange',
      controlProps: TimeRangeDisabledDateProps,
    },
    {
      schema: {
        field: 'selectLogisticsOrderVO.packTimes',
        label: '打包时间',
      },
      control: 'datePickerRange',
      controlProps: TimeRangeDisabledDateProps,
    },
    {
      schema: {
        field: 'selectLogisticsOrderVO.stockRemovalTimes',
        label: '出库时间',
      },
      control: 'datePickerRange',
      controlProps: TimeRangeDisabledDateProps,
    },
    {
      schema: {
        field: 'sheetFileTime',
        label: '申请面单时间',
      },
      control: 'datePickerRange',
      controlProps: TimeRangeDisabledDateProps,
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
        field: 'selectLogisticsVO.shippingCarrier',
        label: '承运商',
      },
      control: 'dictSelector',
      controlProps: {
        dictCode: 'logistics_channel',
        mode: 'multiple',
      },
    },
    {
      schema: {
        field: 'selectLogisticsOrderVO.remainShippingTime',
        label: '剩余发货时间',
      },
      control: 'radio',
      controlProps: {
        options: [
          {
            label: '不限',
            value: null,
          },
          {
            label: '不足24小时',
            value: 24,
          },
          {
            label: '不足48小时',
            value: 48,
          },
          {
            label: '不足72小时',
            value: 72,
          },
        ],
      },
    },
    ...(isAdmin()
      ? [{
          schema: {
            field: 'selectLogisticsOrderVO.tenantryNo',
            label: '用户编号',
          },
        }]
      : []),
    {
      schema: {
        field: 'selectOrderProductVO.deliveryMethod',
        label: '发货类型',
      },
      control: 'radio',
      controlProps: {
        options: [
          {
            label: '全部',
            value: null,
          },
          {
            label: '快递',
            value: '0',
          },
          {
            label: '库存',
            value: '1',
          },
        ],
      },
    },
    ...showObj(isAdmin(), consignmentStatus),
    // {
    //   schema: {
    //     field: 'selectOrderProductVO.sku',
    //     label: '规格SKU',
    //   },
    //   control: 'input',
    // },
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
  return list
}
