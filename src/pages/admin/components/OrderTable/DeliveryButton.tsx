import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'

import { ScanParams, scanAPI } from '@/api/admin/entrepot'
import PopconfirmDelete from '@/components/PopconfirmDelete'
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
    <>
      <PopconfirmDelete
        title="确定出库？"
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
          status="warning"
          loading={loading}
          {...buttonProps}
        >
          包裹出库
        </Button>
      </PopconfirmDelete>
    </>
  )
}
