import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import { ScanParams, scanAPI } from '@/api/admin/entrepot'
import { showMessage } from '@/utils'
import { printShippingWaybill } from '@/hooks/usePrintWaybill'
import { OrderResponseItem } from '@/types/order'

interface DeliveryButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  onSuccess: () => void
  orderItem: OrderResponseItem;
}
export default (props: DeliveryButtonProps) => {
  const { buttonProps, onSuccess, orderItem, ...scanParams } = props
  const { loading, run } = useRequest(async () => {
    await showMessage(() => scanAPI.ScanOut(scanParams))
    printShippingWaybill({
      orderItem,
      sendWarehouse: orderItem.sendWarehouse || '',
    })
    onSuccess()
  }, {
    manual: true,
  })
  return (
    <Button
      type="text"
      status="warning"
      loading={loading}
      disabled={buttonProps?.disabled}
      onClick={() => {
        run()
      }}
      {...buttonProps}
    >
      包裹出库
    </Button>
  )
}
