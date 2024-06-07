import { CreateFormItemType } from '@/components/CreateFormItem';
import { DatePicker, Input } from '@arco-design/web-react';
import React from 'react';

export const OrderFilter: CreateFormItemType[] = [
  {
    schema: {
      field: 'timeRange',
      label: '时间范围',
    },
    control: (props: any) => (
      <DatePicker.RangePicker showTime={true} {...props} />
    ),
  },
  {
    schema: {
      field: 'timeType',
      label: '订单类型',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '物流单号',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '快递单号',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '屋程物流',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '运输类型',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '所属站点名称',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '订单状态',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '卖家标识',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '卖家手机',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '打包时间',
    },
    control: (props: any) => (
      <DatePicker.RangePicker showTime={true} {...props} />
    ),
  },
  {
    schema: {
      field: 'timeType',
      label: '出库时间',
    },
    control: (props: any) => (
      <DatePicker.RangePicker showTime={true} {...props} />
    ),
  },
  {
    schema: {
      field: 'timeType',
      label: '交运时间',
    },
    control: (props: any) => (
      <DatePicker.RangePicker showTime={true} {...props} />
    ),
  },
  {
    schema: {
      field: 'timeType',
      label: '预刷时间',
    },
    control: (props: any) => (
      <DatePicker.RangePicker showTime={true} {...props} />
    ),
  },
  {
    schema: {
      field: 'timeType',
      label: '申请面单时间',
    },
    control: (props: any) => (
      <DatePicker.RangePicker showTime={true} {...props} />
    ),
  },
  {
    schema: {
      field: 'timeType',
      label: '发货类型',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '标签',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '仓位编码',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '店铺ID',
    },
    control: 'input',
  },
  {
    schema: {
      field: 'timeType',
      label: '商品ID',
    },
    control: 'input',
  },
];
