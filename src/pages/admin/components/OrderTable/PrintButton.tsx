import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'

import { ScanParams } from '@/api/admin/entrepot'
import { OrderResponseItem } from '@/types/order'

interface ShipmentButtonButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  orderItem: OrderResponseItem
  children?: React.ReactNode
}

export default (props: ShipmentButtonButtonProps) => {
  const { orderItem, buttonProps, children, ...scanParams } = props

  return (
    <>
      <Button
        type="text"
        // loading={}
        disabled={!!orderItem?.orderPackageList?.some(item => item.documentUrl)}
        onClick={() => {
        }}
        {...buttonProps}
      >
        {children}
      </Button>
    </>
  )
}
