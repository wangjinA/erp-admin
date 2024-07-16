import React from 'react';
import FilterForm from '@/components/FilterForm';
import EntrepotRadio from '@/components/Selectors/EntrepotRadio';
import { DividerSchema } from '@/constants/schema/common';
import { DatePicker, Table } from '@arco-design/web-react';
import { TimeRangeDefaultProps } from '@/constants';
export default () => {
  return (
    <div className="p-4 bg-white">
      <div>
        <FilterForm
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
                label: '订单编号',
                field: 'orderNo',
              },
              control: 'input',
            },
            {
              schema: {
                label: '重出编号',
                field: 'reOrderNo',
              },
              controlProps: {
                placeholder: '请输入重出订单编号',
              },
              control: 'input',
            },
            {
              schema: {
                label: '站点名称',
                field: 'siteName',
              },
              controlProps: {
                placeholder: '请输入所属站点名称',
              },
              control: 'input',
            },
            {
              schema: {
                label: '卖家标识',
                field: 'sellerId',
              },
              control: 'input',
            },
            {
              schema: {
                label: '上架时间',
                field: 'shelfTime',
                span: 6,
              },
              control: (props: any) => (
                <DatePicker.RangePicker {...TimeRangeDefaultProps} {...props} />
              ),
            },
            {
              schema: {
                label: '过期时间',
                field: 'expireTime',
                span: 6,
              },
              control: (props: any) => (
                <DatePicker.RangePicker {...TimeRangeDefaultProps} {...props} />
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
