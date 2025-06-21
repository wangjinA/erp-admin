import React from 'react';
import ScanCommon, { ScanMinWidth } from '../ScanCommon';
import FilterForm from '@/components/FilterForm';
import dayjs from 'dayjs';
export default function returnToShelves() {

  

  return (
    <div className="p-4 bg-white">
      <ScanCommon isAuto={true} placeholder="扫描单号或者输入单号" showAlert={false} onScan={(v) => {
        console.log(v)
      }}></ScanCommon>
      <FilterForm 
      className="mx-auto w-1/2 mt-4" 
      style={{
        minWidth: ScanMinWidth,
      }} 
      initialValues={{
        startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
      }}
      formItemConfigList={[{
        schema: {
          label: '上架时间',
          field: 'startTime',
          span: 12,
          required: true
        },
        control: 'datePicker',
      }, {
        schema: {
          label: '下架时间',
          field: 'endTime',
          span: 12,
          required: true,
        },
        control: 'datePicker',
      }]}></FilterForm>
    </div>
  );
};
