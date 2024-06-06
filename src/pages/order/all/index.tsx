import { CreateFormItemType } from '@/components/CreateFormItem';
import FilterForm from '@/components/FilterForm';
import { DatePicker } from '@arco-design/web-react';
import React from 'react';
export const EchartCommonFilter: CreateFormItemType[] = [
  {
    schema: {
      field: 'timeRange',
      label: '时间范围:',
    },
    control: (props: any) => (
      <DatePicker.RangePicker
        style={{ width: '100%' }}
        allowClear={false}
        showTime={true}
        {...props}
      />
    ),
  },
  {
    schema: {
      field: 'timeType',
      label: '聚合方式:',
    },
  },
];

export default () => {
  return (
    <div className="bg-white">
      <FilterForm formItemConfigList={EchartCommonFilter}></FilterForm>
    </div>
  );
};
