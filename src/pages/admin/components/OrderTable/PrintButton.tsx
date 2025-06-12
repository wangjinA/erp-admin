import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { usePrintHtml } from '@/hooks/usePrintWaybill'
import { OrderResponseItem } from '@/types/order'

// 0拣货单 1出货单
export enum PrintType {
  PICKING = 0,
  SHIPPING = 1,
}

interface ShipmentButtonButtonProps {
  buttonProps?: ButtonProps
  orderItem: OrderResponseItem
  children?: React.ReactNode
  printType?: PrintType
}

export default (props: ShipmentButtonButtonProps) => {
  const { orderItem, buttonProps, children } = props
  const { printHandle } = usePrintHtml(orderItem)
  return (
    <>
      <Button
        type="text"
        {...buttonProps}
        onClick={() => {
          printHandle()
        }}
      >
        {children}
      </Button>
    </>
  )
}
