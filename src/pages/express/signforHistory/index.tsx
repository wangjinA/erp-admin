import React from 'react';
import FilterForm from '@/components/FilterForm';
import EntrepotRadio from '@/components/Selectors/EntrepotRadio';
import { DividerSchema } from '@/constants/schema/common';
import { DatePicker, Table } from '@arco-design/web-react';
import { WhetherOptions } from '@/constants';

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
                label: '快递单号',
                field: 'deliveryNo',
              },
              control: 'input',
            },
            {
              schema: {
                label: '仓位',
                field: 'operatorName',
              },
              control: 'input',
            },
            {
              schema: {
                label: '状态',
                field: 'operatorName1',
              },
              control: 'input',
            },
            {
              schema: {
                label: '签收时间',
                field: 'scanTime',
              },
              control: (props: any) => (
                <DatePicker.RangePicker showTime={true} {...props} />
              ),
            },
            {
              schema: {
                label: '问题件',
                field: 'ss',
              },
              control: 'select',
              controlProps: {
                options: WhetherOptions,
                placeholder: '请选择是否为问题件',
              },
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
            title: '仓位/仓库',
            dataIndex: 'entrepot',
          },
          {
            title: '签收人',
            dataIndex: 'remark',
          },
          {
            title: '状态',
            dataIndex: 'scanTime',
          },
          {
            title: '重量',
            dataIndex: 'operatorName',
          },
          {
            title: '包裹年龄',
            dataIndex: 'operator0',
          },
          {
            title: '上架时间',
            dataIndex: 'operator1',
          },
          {
            title: '操作',
            dataIndex: 'operator',
          },
        ]}
        data={[
          {
            deliveryNo: '78424545902096',
            entrepot: '408-02 / 凤凰国际仓',
            remark: '吴大发',
            scanTime: '已出库',
            operatorName: '2kg',
            operator0: '9分钟前 2024-06-16 18:35:02',
            operator1: '2024-06-16 18:35:02',
          },
          {
            deliveryNo: '78424545902096',
            entrepot: '408-02 / 凤凰国际仓',
            remark: '吴大发',
            scanTime: '已出库',
            operatorName: '2kg',
            operator0: '9分钟前 2024-06-16 18:35:02',
            operator1: '2024-06-16 18:35:02',
          },
          {
            deliveryNo: '78424545902096',
            entrepot: '408-02 / 凤凰国际仓',
            remark: '吴大发',
            scanTime: '已出库',
            operatorName: '2kg',
            operator0: '9分钟前 2024-06-16 18:35:02',
            operator1: '2024-06-16 18:35:02',
          },
          {
            deliveryNo: '78424545902096',
            entrepot: '408-02 / 凤凰国际仓',
            remark: '吴大发',
            scanTime: '已出库',
            operatorName: '2kg',
            operator0: '9分钟前 2024-06-16 18:35:02',
            operator1: '2024-06-16 18:35:02',
          },
        ]}
      ></Table>
    </div>
  );
};
