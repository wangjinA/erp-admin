import { useRequest } from 'ahooks'

import ScanCommon from '../ScanCommon'

import { orderAPI } from '@/api/admin/order'
import { showMessage } from '@/utils'

export default () => {
  const { run } = useRequest(
    async (orderNo: string) => {
      return showMessage(() => orderAPI.updateConsignmentStatus({
        orderNo,
        consignmentStatus: true,
      }))
    },
    {
      manual: true,
    },
  )
  return (
    <div className="bg-white py-6 px-4">
      <ScanCommon
        hideEntrepot={true}
        placeholder="扫描或者输入虾皮订单号"
        showAlert={false}
        onScan={(info) => {
          console.log(info.trackingNo)
          run(info.trackingNo)
        }}
      >
      </ScanCommon>
    </div>
  )
}
