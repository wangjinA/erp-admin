import { useRequest } from 'ahooks'

import { useState } from 'react'

import ScanCommon from '../ScanCommon'

import { ScanResult } from '../deposit'

import { orderAPI } from '@/api/admin/order'
import { EmitTypes, useEventBus } from '@/hooks/useEventBus'
import { OrderPageDict } from '@/pages/client/order/orderPage'
import { showMessage } from '@/utils'

export default () => {
  const [trackingNo, setTrackingNo] = useState<string>()

  const scanHandle = useRequest(
    async (orderNo: string) => {
      const res = await showMessage(() => orderAPI.updateConsignmentStatus({
        orderNo,
        consignmentStatus: true,
      }))
      return res.data?.data
    },
    {
      manual: true,
    },
  )

  // 其他刷新都是基于这个bug，复用一下
  useEventBus(EmitTypes.refreshOrderPage, () => {
    scanHandle.refresh()
  })

  return (
    <div className="bg-white py-6 px-4">
      <ScanCommon
        hideEntrepot={true}
        placeholder="扫描或者输入虾皮订单号"
        showAlert={false}
        isAuto={true}
        onScan={(info) => {
          console.log(info.trackingNo)
          scanHandle.run(info.trackingNo)
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
