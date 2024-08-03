import React, { useState } from 'react';
import ScanCommon from '../ScanCommon';
import { useRequest } from 'ahooks';
import { ScanParams, scanAPI } from '@/api/admin/entrepot';
import { showMessageStatus } from '@/utils';
import { Alert, Spin, Table } from '@arco-design/web-react';
import dayjs from 'dayjs';

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
  const [trackingNo, setTrackingNo] = useState<string>();
  const { run, data, loading } = useRequest(
    async (params: ScanParams) => {
      const res = await scanAPI.scanSign(params);
      showMessageStatus(res.data);
      return res.data.data;
    },
    {
      manual: true,
    }
  );
  return (
    <div className="bg-white p-4">
      <ScanCommon
        onScan={(info) => {
          setTrackingNo(info.trackingNo);
          run(info);
        }}
      ></ScanCommon>
      {trackingNo ? (
        <Spin loading={loading} className='block'>
          <Alert
            className="mt-4"
            type="success"
            title={<div>快递单号：【{data?.trackingNumber || '-'}】</div>}
            content={
              <div>
                {data?.instructions || '-'}，签收时间：{data?.createTime || dayjs().format('YYYY-MM-DD HH:mm:ss')}
              </div>
            }
          />
        </Spin>
      ) : null}
      {/* {data && <Table data={data} columns={columns}></Table>} */}
    </div>
  );
};
