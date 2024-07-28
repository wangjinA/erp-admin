import React from 'react';
import ScanCommon from '../ScanCommon';
import { Alert } from '@arco-design/web-react';
import OrderTable from '@/components/OrderTable';
import { useRequest } from 'ahooks';
import { ScanParams, scanAPI } from '@/api/admin/entrepot';
import { showMessageStatus } from '@/utils';
export default () => {
  const { run, data } = useRequest(
    async (params: ScanParams) => {
      const res = await scanAPI.scanPut(params);
      showMessageStatus(res.data);
      return data;
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
      <div>
        <Alert
          className="mt-4"
          type="success"
          title={<div>快递单号：【1212121】</div>}
          content={
            <div>
              匹配 <b>1</b> 个订单，分配仓位为：405-08，签收时间：2024-07-25 22:52:50
            </div>
          }
        />
        <Alert
          className="mt-4"
          type="success"
          title={<div>快递单号：【1212121】</div>}
          content={
            <div>
              匹配 <b>1</b> 个订单，分配仓位为：405-08，签收时间：2024-07-25 22:52:50
            </div>
          }
        />
      </div>
      <OrderTable className="mt-4"></OrderTable>
    </div>
  );
};
