import React, { useState } from 'react';
import ScanCommon from '../ScanCommon';
import { useRequest } from 'ahooks';
import { ScanParams, ScanSignResponse, scanAPI } from '@/api/admin/entrepot';
import { showMessageStatus } from '@/utils';
import {
  Alert,
  Message,
  Spin,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import dayjs from 'dayjs';

const columns: TableColumnProps[] = [
  {
    title: '快递单号',
    dataIndex: 'trackingNumber',
  },
  {
    title: '仓库',
    dataIndex: 'sendWarehouseName',
  },
  {
    title: '说明',
    dataIndex: 'instructions',
  },
  {
    title: '扫码时间',
    dataIndex: 'createTime',
    render(c) {
      return c || dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '操作人',
    dataIndex: 'operator',
  },
];

export default () => {
  const [trackingNo, setTrackingNo] = useState<string>();
  const [list, setList] = useState<ScanSignResponse[]>([]);
  const { run, data, loading } = useRequest(
    async (params: ScanParams) => {
      if (list.some((item) => item.trackingNumber === trackingNo)) {
        Message.error('该快递单号已扫码，请勿重复扫码');
        return;
      }
      const res = await scanAPI.scanSign(params);
      showMessageStatus(res.data);
      setList([res.data.data, ...list]);
    },
    {
      manual: true,
    }
  );
  console.log(list);
  return (
    <div className="bg-white p-4">
      <ScanCommon
        onScan={(info) => {
          console.log(info.trackingNo);
          setTrackingNo(info.trackingNo);
          setTimeout(() => {
            run(info);
          });
        }}
      ></ScanCommon>
      {/* {trackingNo ? (
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
      ) : null} */}
      {list?.length ? (
        <Table loading={loading} data={list} columns={columns}></Table>
      ) : null}
    </div>
  );
};
