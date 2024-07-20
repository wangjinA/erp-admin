import React from 'react';
import FilterForm from '@/components/FilterForm';
import EntrepotRadio from '@/components/Selectors/EntrepotRadio';
import { DatePicker, Divider, Table } from '@arco-design/web-react';
import { DividerSchema } from '@/constants/schema/common';
export default () => {
  return (
    <div className="p-4 bg-white">
      <div>
        <FilterForm
          layout="inline"
          span={6}
          initialValues={{
            entrepot: '0',
          }}
          formItemConfigList={[
            {
              schema: {
                field: 'entrepot',
                label: '所属仓库',
                span: 24,
              },
              control: <EntrepotRadio></EntrepotRadio>,
            },
            DividerSchema,
            {
              schema: {
                label: '快递单号',
                field: 'deliveryNo',
              },
              control: 'input',
            },
            {
              schema: {
                label: '操作人',
                field: 'operatorName',
              },
              control: 'input',
            },
            {
              schema: {
                label: '扫码时间',
                field: 'scanTime',
              },
              control: (props: any) => (
                <DatePicker.RangePicker showTime={true} {...props} />
              ),
            },
          ]}
        ></FilterForm>
      </div>
      <Table
        className="mt-4"
        columns={[
          {
            title: '快递单号',
            dataIndex: 'deliveryNo',
          },
          {
            title: '仓库',
            dataIndex: 'entrepot',
          },
          {
            title: '说明',
            dataIndex: 'remark',
          },
          {
            title: '扫码时间',
            dataIndex: 'scanTime',
          },
          {
            title: '操作人',
            dataIndex: 'operatorName',
          },
          {
            title: '操作',
            dataIndex: 'operator',
          },
        ]}
        data={[
          {
            deliveryNo: '1234567890',
            entrepot: '仓库1',
            remark: '备注',
            scanTime: '2020-01-01 12:12:12',
            operatorName: '张三',
          },
          {
            deliveryNo: '1234567890',
            entrepot: '仓库1',
            remark: '备注',
            scanTime: '2020-01-01 12:12:12',
            operatorName: '张三',
          },
          {
            deliveryNo: '1234567890',
            entrepot: '仓库1',
            remark: '备注',
            scanTime: '2020-01-01 12:12:12',
            operatorName: '张三',
          },
        ]}
      ></Table>
    </div>
  );
};
