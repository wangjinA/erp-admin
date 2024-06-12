import React from 'react';
import FilterForm from '@/components/FilterForm';
import {
  Button,
  DatePicker,
  Message,
  Space,
  Switch,
  Table,
} from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import PopconfirmDelete from '@/components/PopconfirmDelete';

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
            title: '序号',
            key: 'index',
            render(col, row, index) {
              return index + 1;
            },
          },
          {
            title: '员工姓名',
            dataIndex: 'employeeName',
          },
          {
            title: '登录账号',
            dataIndex: 'loginAccount',
          },
          {
            title: '用户组',
            dataIndex: 'userGroup',
          },
          {
            title: '状态',
            dataIndex: 'status',
            render(col) {
              return (
                <Switch
                  checked={col}
                  type="line"
                  checkedText="启用"
                  uncheckedText="禁用"
                ></Switch>
              );
            },
          },
          {
            title: '操作',
            dataIndex: 'operator',
            render() {
              return (
                <Space>
                  <Button
                    icon={<IconEdit></IconEdit>}
                    type="primary"
                    size="mini"
                  >
                    编辑
                  </Button>
                  <PopconfirmDelete
                    onOk={() => {
                      Message.success('删除成功');
                    }}
                    buttonProps={{
                      size: 'mini',
                    }}
                  ></PopconfirmDelete>
                </Space>
              );
            },
          },
        ]}
        data={[
          {
            key: 1,
            employeeName: '1234567890',
            loginAccount: '仓库1',
            userGroup: '备注',
            status: true,
          },
          {
            key: 2,
            employeeName: '1234567890',
            loginAccount: '仓库1',
            userGroup: '备注',
            status: false,
          },
          {
            key: 3,
            employeeName: '1234567890',
            loginAccount: '仓库1',
            userGroup: '备注',
            status: true,
          },
        ]}
      ></Table>
    </div>
  );
};
