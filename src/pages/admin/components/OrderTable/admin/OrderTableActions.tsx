import { Button, Space } from "@arco-design/web-react"
import OrderDetailButton from "../OrderDetailButton"
import { bus, EmitTypes } from "@/hooks/useEventBus"
import PrintButton, { PrintType } from "../PrintButton"
import ActionHistory from "../ActionHistory"
import ExceptionOnHoldButton from "../ExceptionOnHoldButton"
import { showMessage, showModal } from "@/utils"
import { orderAPI } from '@/api/admin/order'
import { OrderResponseItem } from "@/types/order"
import { OrderPageDict } from "@/pages/client/order/orderPage"
import { useRequest } from "ahooks"
import { isAdmin } from "@/routes"
import ChangeOrderButton from "../ChangeOrderButton"

interface OrderTableActionsProps {
  orderItem: OrderResponseItem
  dictCode: OrderPageDict
}

const OrderTableActions = (props: OrderTableActionsProps) => {
  const { orderItem, dictCode } = props

  let Actions = <></>

  if (dictCode === OrderPageDict.OUT_ORDER_STATUS) {
    if (orderItem.returnStatus === '2') { // 2 为已销毁
      Actions = <>-</>
    } else {
      Actions = <>
        <Button
          status="danger"
          onClick={() => {
            return showModal({
              content: '确定要销毁退件单吗？',
              onOk() {
                return showMessage(
                  () => orderAPI.overseasWarehouseReturnDestroy(orderItem.id),
                  '销毁退件单',
                ).then(() => bus.emit(EmitTypes.refreshOrderPage))
              },
            })
          }}>
          销毁
        </Button>
        {
          isAdmin() ? <Button
            status="warning"
            onClick={() => {
              return showModal({
                content: '确定要撤销退件吗？',
                onOk() {
                  return showMessage(
                    () => orderAPI.overseasWarehouseReturnRevocation(orderItem.id),
                    '撤销退件',
                  ).then(() => bus.emit(EmitTypes.refreshOrderPage))
                },
              })

            }}
          >
            撤销退件
          </Button> : <ChangeOrderButton orderItem={orderItem} />
        }
      </>
    }
  } else {
    Actions = <>
      <OrderDetailButton
        buttonProps={{ size: 'small' }}
        orderItem={orderItem}
        onSuccess={() => {
          bus.emit(EmitTypes.refreshOrderPage)
        }}
      >
      </OrderDetailButton>
      {/* <DeliveryButton
        sendWarehouse={orderItem.sendWarehouse}
        shrimpOrderNo={orderItem.shrimpOrderNo}
        onSuccess={() => {
          bus.emit(EmitTypes.refreshOrderPage)
        }}
        buttonProps={{ size: 'small', disabled: orderItem.orderStatus !== '2' }}
      /> */}
      <PrintButton
        orderItem={orderItem}
        printType={PrintType.SHIPPING}
      >
        打印出货单
      </PrintButton>
      <PrintButton
        orderItem={orderItem}
        printType={PrintType.PICKING}
      >
        打印捡货单
      </PrintButton>
      <ActionHistory
        buttonProps={{
          type: 'text',
          icon: null,
        }}
        id={orderItem.id}
      >
      </ActionHistory>
      <ExceptionOnHoldButton
        id={orderItem.id}
        abeyanceStatus={orderItem.abeyanceStatus}
      >
      </ExceptionOnHoldButton>
      <Button
        type="text"
        size="small"
        disabled={['5', '6'].includes(orderItem.orderStatus)}
        onClick={async () => {
          await showModal({
            content: '确定要取消打包吗？',
            onOk() {
              return showMessage(
                () => orderAPI.cancel([orderItem.id]),
                '取消打包',
              )
            },
          })
          bus.emit(EmitTypes.refreshOrderPage)
        }}
      >
        取消订单
      </Button>
    </>
  }

  return <div className="h-full p-2 flex justify-center">
    <Space direction="vertical" size={4}>
      {Actions}
    </Space>
  </div>
}

export default OrderTableActions;