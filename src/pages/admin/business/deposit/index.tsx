import { Alert, Spin } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import React, { useMemo, useState } from 'react'

import OrderTable from '../../components/OrderTable'
import ScanCommon from '../ScanCommon'

import { ScanParams, scanAPI } from '@/api/admin/entrepot'
import OrderTableOld from '@/components/OrderTable'

import { showMessageStatus } from '@/utils'

export default () => {
  const { run, data, loading } = useRequest(
    async (params: ScanParams) => {
      const res = await scanAPI.scanPut(params)
      showMessageStatus(res.data)
      return res.data.data
    },
    {
      manual: true,
    },
  )
  console.log(data)

  const [trackingNo, setTrackingNo] = useState<string>()
  const list = useMemo(() => {
    return (
      data?.orderItemInfoBgResultList?.flatMap(item =>
        item.logisticsOrderProductList.filter(
          oitem => oitem.trackingNo === trackingNo,
        ),
      ) || []
    )
  }, [data])
  return (
    <div>
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
                      {data.orderType === '2'
                        ? (
                            <Alert
                              className="mt-4"
                              type="success"
                              title={(
                                <div>
                                  问题件
                                </div>
                              )}
                              content={(
                                <div>
                                  匹配
                                  {' '}
                                  <b>{list.length}</b>
                                  {' '}
                                  个订单，分配仓位为：
                                  {data?.freightSpaceName}
                                  ，签收时间：
                                  {data?.signingTime}
                                </div>
                              )}
                            />
                          )
                        : (
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
                                  <b>{list.length}</b>
                                  {' '}
                                  个订单，分配仓位为：
                                  {data?.freightSpaceName}
                                  ，签收时间：
                                  {data?.signingTime}
                                </div>
                              )}
                            />
                          )}
                      <OrderTable
                        className="mt-4"
                        data={{
                          list: data?.orderItemInfoBgResultList.map<any>(item => ({
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
                      >
                      </OrderTable>
                      <OrderTableOld className="mt-4"></OrderTableOld>
                    </>
                  )
                : null}
            </Spin>
          )
        : null}
    </div>
  )
}
