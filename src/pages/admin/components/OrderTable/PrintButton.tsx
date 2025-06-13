import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { printShippingWaybill, usePrintHtml } from '@/hooks/usePrintWaybill'
import { OrderResponseItem } from '@/types/order'
import { useRequest } from 'ahooks'

// 0拣货单 1出货单
export enum PrintType {
  PICKING = 0, // 拣货单
  SHIPPING = 1, // 出货单
}

interface ShipmentButtonButtonProps {
  buttonProps?: ButtonProps
  orderItem: OrderResponseItem
  children?: React.ReactNode
  printType: PrintType
}

export default (props: ShipmentButtonButtonProps) => {
  const { orderItem, buttonProps, printType, children } = props
  const { printHandle } = usePrintHtml(orderItem)

  const { run, loading } = useRequest(() => {
    return printShippingWaybill({
      orderItem,
      sendWarehouse: orderItem.sendWarehouse || '',
    })
  }, {
    manual: true
  })

  function startMain() {
    if (printType === PrintType.PICKING) {
      printHandle()
    } else if (printType === PrintType.SHIPPING) {
      run()
    }
  }

  return (
    <>
      <Button
        type="text"
        loading={loading}
        {...buttonProps}
        onClick={startMain}
      >
        {children}
      </Button>
    </>
  )
}
