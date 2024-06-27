import React from 'react';
import ScanCommon from '../ScanCommon';
import { useRequest } from 'ahooks';
import { ScanParams, scanAPI } from '@/api/entrepot';
import { showMessageStatus } from '@/utils';
import { Table } from '@arco-design/web-react';

const columns = [
  {
    title: '快递单号',
    field: '快递单号',
  },
  {
    title: '仓库',
    field: '仓库',
  },
  {
    title: '说明',
    field: '说明',
  },
  {
    title: '扫码时间',
    field: '扫码时间',
  },
  {
    title: '操作人',
    field: '操作人',
  },
];

export default () => {
  const { run } = useRequest(
    async (data: ScanParams) => {
      console.log(data);

      const res = await scanAPI.scanSign(data);
      showMessageStatus(res.data);
    },
    {
      manual: true,
    }
  );
  return (
    <div>
      <ScanCommon
        onScan={(info) => {
          run(info);
        }}
      ></ScanCommon>
      <Table data={[]} columns={columns}></Table>
    </div>
  );
};
