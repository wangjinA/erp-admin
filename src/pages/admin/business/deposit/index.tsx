import { Alert, Link, Spin } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { Result } from 'ahooks/lib/useRequest/src/types'
import { useState } from 'react'

import { useHistory } from 'react-router-dom'

import OrderTable from '../../components/OrderTable'
import ScanCommon from '../ScanCommon'

import {
  ScanParams,
  ScanResponse,
  scanAPI,
} from '@/api/admin/entrepot'
import { EmitTypes, useEventBus } from '@/hooks/useEventBus'
import { OrderPageDict } from '@/pages/client/order/orderPage'
import { showMessage } from '@/utils'

export function ShowAlert(props: {
  data: ScanResponse
  trackingNo: string
}) {
  const { data, trackingNo } = props
  switch (data.orderType) {
    case '0':
      return (
        <Alert
          className="mt-4"
          type="success"
          title={(
            <div>
              虾皮订单号：【
              {trackingNo}
              】
            </div>
          )}
          content={(
            <div>
              匹配
              {' '}
              <b>{data.orderItemInfoBgResultList?.length || 0}</b>
              {' '}
              个订单、
              <b>{data.orderCount || 0}</b>
              {' '}
              件商品
            </div>
          )}
        />
      )
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
              <b>{data.orderItemInfoBgResultList?.length || 0}</b>
              {' '}
              个订单、
              <b>{data.orderCount || 0}</b>
              {' '}
              件商品，
              分配仓位为：
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
    case '5':
      return (
        <Alert
          className="mt-4"
          type="warning"
          title={(
            <div>
              订单编号：【
              {trackingNo}
              】海外仓退件上架成功
            </div>
          )}
          content={(
            <div>
              匹配
              {' '}
              <b>{data.orderItemInfoBgResultList?.length || 0}</b>
              {' '}
              个订单、
              <b>{data.orderCount || 0}</b>
              {' '}
              件商品，
              分配仓位为：
              {data.freightSpaceName}
              ，上架时间：
              {data.signingTime}
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
              <b>{data.orderItemInfoBgResultList?.length || 0}</b>
              {' '}
              个订单、
              <b>{data.orderCount || 0}</b>
              {' '}
              件商品，
              分配仓位为：
              {data.freightSpaceName}
              ，签收时间：
              {data.signingTime}
            </div>
          )}
        />
      )
  }
}

export function ScanResult(props: {
  trackingNo: string
  scanHandle: Result<ScanResponse, [ScanParams]>
  dictCode: OrderPageDict
}) {
  const history = useHistory()
  const { trackingNo, scanHandle, dictCode } = props
  return (
    <>
      {trackingNo && !scanHandle.error
        ? (
            <Spin loading={scanHandle.loading} className="block text-center pt-10">
              {scanHandle.data
                ? (
                    <>
                      <ShowAlert data={scanHandle.data} trackingNo={trackingNo} />
                      {scanHandle.data.orderItemInfoBgResultList
                        ? (
                            <OrderTable
                              className="mt-4 text-left"
                              data={{
                                list: scanHandle.data.orderItemInfoBgResultList.map<any>(item => ({
                                  ...item,
                                  orderProductVOList: item.logisticsOrderProductList,
                                  orderPackageList: item.logisticsOrderPackageList,
                                })),
                                pageNum: 1,
                                pageSize: scanHandle.data.orderItemInfoBgResultList.length,
                                total: scanHandle.data.orderItemInfoBgResultList.length,
                              }}
                              dictCode={dictCode}
                              loading={false}
                            >
                            </OrderTable>
                          )
                        : null}
                    </>
                  )
                : null}
            </Spin>
          )
        : null}
      {
        scanHandle.error
          ? (
              <Alert
                className="mt-4"
                type="error"
                title={(
                  <div>
                    {scanHandle.error.message}
                    <Link
                      className="ml-4"
                      onClick={() => {
                        history.push('/admin/entrepot/info')
                      }}
                    >
                      {' '}
                      仓库设置
                    </Link>
                  </div>
                )}
              >
              </Alert>
            )
          : null
      }
    </>
  )
}

export default function Deposit() {
  const scanHandle = useRequest(
    async (params: ScanParams) => {
      const res = await showMessage(() => scanAPI.scanPut(params))
      return res.data?.data
    },
    {
      manual: true,
    },
  )

  const [trackingNo, setTrackingNo] = useState<string>()

  // 其他刷新都是基于这个bug，复用一下
  useEventBus(EmitTypes.refreshOrderPage, () => {
    scanHandle.refresh()
  })

  return (
    <div className="bg-white py-6 px-4">
      <ScanCommon
        onScan={(info) => {
          scanHandle.run(info)
          setTrackingNo(info.trackingNo)
        }}
      >
      </ScanCommon>
      <ScanResult
        trackingNo={trackingNo}
        scanHandle={scanHandle}
        dictCode={OrderPageDict.PACK_ORDER}
      />
    </div>
  )
}
