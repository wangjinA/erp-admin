import { CreateFormItemType } from '@/components/CreateFormItem';
import DictSelector from '@/components/Selectors/DictSelector';
import EntrepotSelector from '@/components/Selectors/EntrepotSelector';
import React from 'react';

export const OrderCreateSchema1: CreateFormItemType[] = [
  {
    schema: {
      field: 'platformType',
      label: '平台类型',
    },
    control: <DictSelector dictCode="platform_type"></DictSelector>,
  },
  {
    schema: {
      field: 'orderType',
      label: '订单类型',
    },
    control: <DictSelector dictCode="order_type"></DictSelector>,
  },
  {
    schema: {
      field: 'shrimpOrderNo',
      label: '订单编号',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'packagenumber',
      label: '物流单号',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'orderAmount',
      label: '订单金额',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'transportType',
      label: '运输类型',
    },
    control: <DictSelector dictCode="transport_type"></DictSelector>,
  },
  {
    schema: {
      field: 'shippingCarrier',
      label: '物流渠道',
    },
    control: <DictSelector dictCode="logistics_channel"></DictSelector>,
  },
  {
    schema: {
      field: 'shippingTime',
      label: '出货时间',
    },
    control: 'datePicker',
  },
  {
    schema: {
      field: 'cancellationTime',
      label: '取消时间',
    },
    control: 'datePicker',
  },
  {
    schema: {
      field: 'sendWarehouse',
      label: '送往仓库',
    },
    control: <EntrepotSelector />,
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
];

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
    },
    control: 'input',
  },
  {
    schema: {
      field: 'quantity',
      label: '数量',
    },
    control: 'number',
  },
  {
    schema: {
      field: 'unitPrice',
      label: '单价',
    },
    control: 'number',
  },
];
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
      field: 'mobilenumber',
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
    },
    control: <DictSelector dictCode="region"></DictSelector>,
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
];
