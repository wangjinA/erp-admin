import React from 'react';
import ScanCommon from '../ScanCommon';
import { Alert } from '@arco-design/web-react';
import OrderTable from '@/components/OrderTable';
export default () => {
  return (
    <div>
      <ScanCommon></ScanCommon>
      <div>
        <Alert
          className="mt-4"
          type="success"
          title={<div>快递单号：【1212121】</div>}
          content={
            <div>
              匹配1个订单，分配仓位为：405-08，签收时间：2024-06-0520：16：08
            </div>
          }
        />
        <Alert
          className="mt-4"
          type="success"
          title={<div>快递单号：【1212121】</div>}
          content={
            <div>
              匹配1个订单，分配仓位为：405-08，签收时间：2024-06-0520：16：08
            </div>
          }
        />
      </div>
      <OrderTable className="mt-4"></OrderTable>
    </div>
  );
};
