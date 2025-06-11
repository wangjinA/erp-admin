import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'

import { ScanParams } from '@/api/admin/entrepot'
import { usePrintHtml } from '@/hooks/usePrintWaybill'
import { OrderResponseItem } from '@/types/order'

interface ShipmentButtonButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  orderItem: OrderResponseItem
  children?: React.ReactNode
}

export default (props: ShipmentButtonButtonProps) => {
  const { orderItem, buttonProps, children } = props
  const { printHandle } = usePrintHtml(orderItem)
  return (
    <>
      <Button
        type="text"
        disabled={!!orderItem?.orderPackageList?.some(item => item.documentUrl)}
        {...buttonProps}
        onClick={async () => {
          await printHandle()
        }}
      >
        {children}
      </Button>
    </>
  )
}
