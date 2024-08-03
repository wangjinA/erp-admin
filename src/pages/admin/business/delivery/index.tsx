import React, { useMemo, useState } from 'react';
import ScanCommon from '../ScanCommon';
import { Alert, Spin } from '@arco-design/web-react';
import OrderTableOld from '@/components/OrderTable';
import { useRequest } from 'ahooks';
import { ScanParams, scanAPI } from '@/api/admin/entrepot';
import { showMessageStatus } from '@/utils';
import OrderTable from '../../components/OrderTable';
import { OrderResponseItem } from '@/types/order';
export default () => {
  const { run, data, loading } = useRequest(
    async (params: ScanParams) => {
      const res = await scanAPI.ScanOut(params);
      showMessageStatus(res.data);
      return res.data.data;
    },
    {
      manual: true,
    }
  );
  console.log(data);

  const [trackingNo, setTrackingNo] = useState<string>();
  const list = useMemo(() => {
    return (
      data?.orderItemInfoBgResultList.flatMap((item) =>
        item.logisticsOrderProductList.filter(
          (oitem) => oitem.trackingNo === trackingNo
        )
      ) || []
    );
  }, [data]);
  return (
    <div>
      <ScanCommon
        onScan={(info) => {
          run(info);
          setTrackingNo(info.trackingNo);
        }}
      ></ScanCommon>
      {/* {trackingNo ? (
        <Spin loading={loading} className="block text-center pt-10">
          {data ? (
            <>
              <Alert
                className="mt-4"
                type="success"
                title={<div>快递单号：【{trackingNo}】</div>}
                content={
                  <div>
                    匹配 <b>{list.length}</b> 个订单，分配仓位为：
                    {data?.freightSpaceName}，签收时间：{data?.signingTime}
                  </div>
                }
              />
              <OrderTable
                className="mt-4"
                data={{
                  list: data?.orderItemInfoBgResultList.map<any>((item) => ({
                    ...item,
                    orderProductVOList: item.logisticsOrderProductList,
                    orderPackageList: [],
                  })),
                  pageNum: 1,
                  pageSize: data?.orderItemInfoBgResultList.length,
                  total: data?.orderItemInfoBgResultList.length,
                }}
                dictCode="order_status"
                loading={false}
              ></OrderTable>
              <OrderTableOld className="mt-4"></OrderTableOld>
            </>
          ) : null}
        </Spin>
      ) : null} */}
    </div>
  );
};
