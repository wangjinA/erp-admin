import { Alert, Spin } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import React, { useState } from 'react'

import OrderTable from '../../components/OrderTable'
import ScanCommon from '../ScanCommon'

import {
  ScanParams,
  ScanResponse,
  scanAPI,
} from '@/api/admin/entrepot'
import { tryFn } from '@/utils'

function ShowAlert(props: {
  data: ScanResponse
  trackingNo: string
}) {
  const { data, trackingNo } = props
  switch (data.orderType) {
    case '2':
      return (
        <Alert
          className="mt-4"
          type="warning"
          title={(
            <div>
              快递单号：【
              {trackingNo}
              】问题件
            </div>
          )}
          content={(
            <div>
              匹配
              {' '}
              <b>{data.orderCount || 0}</b>
              {' '}
              个订单，分配仓位为：
              {data.freightSpaceName}
              ，签收时间：
              {data.signingTime}
            </div>
          )}
        />
      )
    case '3':
      return (
        <Alert
          className="mt-4"
          type="error"
          title={(
            <div>
              快递单号：【
              {trackingNo}
              】拒收件
            </div>
          )}
          content={(
            <div>
              匹配
              {' '}
              <b>{data.orderCount || 0}</b>
              {' '}
              个订单
            </div>
          )}
        />
      )
    case '4':
      return (
        <Alert
          className="mt-4"
          type="error"
          title={(
            <div>
              快递单号：【
              {trackingNo}
              】已拒收
            </div>
          )}
        />
      )
    default:
      return (
        <Alert
          className="mt-4"
          type="success"
          title={(
            <div>
              快递单号：【
              {trackingNo}
              】
            </div>
          )}
          content={(
            <div>
              匹配
              {' '}
              <b>{data.orderCount || 0}</b>
              {' '}
              个订单，分配仓位为：
              {data.freightSpaceName}
              ，签收时间：
              {data.signingTime}
            </div>
          )}
        />
      )
  }
}

export default () => {
  const { run, data, loading } = useRequest(
    async (params: ScanParams) => {
      const res = await tryFn(() => scanAPI.scanPut(params))
      return res.data.data
    },
    {
      manual: true,
    },
  )
  console.log(data)

  const [trackingNo, setTrackingNo] = useState<string>()

  return (
    <div className="bg-white py-6 px-4">
      <ScanCommon
        onScan={(info) => {
          run(info)
          setTrackingNo(info.trackingNo)
        }}
      >
      </ScanCommon>
      {trackingNo
        ? (
            <Spin loading={loading} className="block text-center pt-10">
              {data
                ? (
                    <>
                      <ShowAlert data={data} trackingNo={trackingNo} />
                      {data.orderItemInfoBgResultList
                        ? (
                            <OrderTable
                              className="mt-4 text-left"
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
                      {/* <OrderTableOld className="mt-4"></OrderTableOld> */}
                    </>
                  )
                : null}
            </Spin>
          )
        : null}
    </div>
  )
}
