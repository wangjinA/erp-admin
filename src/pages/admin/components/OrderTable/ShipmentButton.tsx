import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'

import { ScanParams, entrepotAPI } from '@/api/admin/entrepot'
import { orderAPI } from '@/api/admin/order'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import { OrderResponseItem } from '@/types/order'

interface ShipmentButtonButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  orderItem: OrderResponseItem
  onSuccess: () => void
}
export default (props: ShipmentButtonButtonProps) => {
  const { orderItem, buttonProps, onSuccess, ...scanParams } = props
  const { loading, run } = useRequest(async () => {
    const res = await orderAPI.getShippingParameter(orderItem.id)
    const sender = await entrepotAPI.getSender({
      entrepotId: orderItem.sendWarehouse,
    })
    const sended = await orderAPI.shipment({
      orderId: orderItem.id,
      senderRealName: '',
      trackingNo: '',
    })
    console.log(res)
  }, {
    manual: true,
  })
  return (
    <>
      <PopconfirmDelete
        title="确定出货？"
        buttonProps={{
          loading,
        }}
        onOk={() => {
          run()
        }}
        disabled={buttonProps?.disabled}
      >
        <Button
          type="text"
          status="success"
          loading={loading}
          {...buttonProps}
        >
          安排出货
        </Button>
      </PopconfirmDelete>
    </>
  )
}
