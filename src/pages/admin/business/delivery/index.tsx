import { Spin } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import React, { useState } from 'react'

import OrderTable from '../../components/OrderTable'
import ScanCommon from '../ScanCommon'

import { ScanParams, scanAPI } from '@/api/admin/entrepot'
import { showMessage } from '@/utils'

export default function Delivery() {
  const { run, data, loading } = useRequest(
    async (params: ScanParams) => {
      const res = await showMessage(() => scanAPI.ScanOut(params))
      return res.data.data
    },
    {
      manual: true,
    },
  )

  const [trackingNo, setTrackingNo] = useState<string>()
  return (
    <div className="bg-white py-6 px-4">
      <ScanCommon
        placeholder="扫描或输入订单号"
        onScan={(info) => {
          run({
            shrimpOrderNo: info.trackingNo,
            sendWarehouse: info.sendWarehouse,
          })
          setTrackingNo(info.trackingNo)
        }}
      >
      </ScanCommon>
      {console.log(loading)}
      <div>
        {data
          ? (
              <>
                {data.orderItemInfoBgResultList
                  ? (
                      <OrderTable
                        className="mt-10 text-left"
                        data={{
                          list: data.orderItemInfoBgResultList.map<any>(item => ({
                            ...item,
                            orderProductVOList: item.logisticsOrderProductList,
                            orderPackageList: [],
                          })),
                          pageNum: 1,
                          pageSize: data.orderItemInfoBgResultList.length,
                          total: data.orderItemInfoBgResultList.length,
                        }}
                        dictCode="order_status"
                        loading={false}
                      >
                      </OrderTable>
                    )
                  : null}
              </>
            )
          : loading ? <Spin className="block text-center pt-10" /> : null}
      </div>
    </div>
  )
}
