import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import { ScanParams, scanAPI } from '@/api/admin/entrepot'
import { showMessage } from '@/utils'
import { printShippingWaybill } from '@/hooks/usePrintWaybill'
import { OrderResponseItem } from '@/types/order'
import { forwardRef } from 'react'

interface DeliveryButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  onSuccess: () => void
  orderItem: OrderResponseItem;
  ref?: React.Ref<HTMLButtonElement>;
}
export const DeliveryButton = forwardRef((props: DeliveryButtonProps, ref) => {
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
      ref={ref}
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
})