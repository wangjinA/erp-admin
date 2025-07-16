import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import { ScanParams, entrepotAPI } from '@/api/admin/entrepot'
import { orderAPI } from '@/api/admin/order'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'
import PopconfirmDelete from '@/components/PopconfirmDelete'

interface ShipmentButtonButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  orderItem: OrderResponseItem
  onSuccess: () => void
}

export default (props: ShipmentButtonButtonProps) => {
  const { orderItem, buttonProps, onSuccess, ...scanParams } = props

  const { run, loading } = useRequest(async () => {
    const senderRes = await
      entrepotAPI.getSenderAll({
        entrepotId: orderItem.sendWarehouse,
      })
    await showMessage(() => orderAPI.shipment({
      senderRealName: senderRes.default,
      orderId: orderItem.id,
    }), '出货')
    bus.emit(EmitTypes.refreshOrderPage)
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
        onOk={run}
        disabled={!!orderItem?.orderPackageList?.some(item => item.documentUrl)}
      >
        <Button
          type="text"
          status="success"
          loading={loading}
          disabled={!!orderItem?.orderPackageList?.some(item => item.documentUrl)}
          {...buttonProps}
        >
          安排出货
        </Button>
      </PopconfirmDelete>
    </>
  )
}
