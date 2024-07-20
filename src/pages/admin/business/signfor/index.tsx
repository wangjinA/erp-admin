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
  const { run, data } = useRequest(
    async (params: ScanParams) => {
      const res = await scanAPI.scanSign(params);
      showMessageStatus(res.data);
      return data;
    },
    {
      manual: true,
    }
  );
  return (
    <div className="bg-white p-4">
      <ScanCommon
        onScan={(info) => {
          run(info);
        }}
      ></ScanCommon>
      {data && <Table data={data} columns={columns}></Table>}
    </div>
  );
};
