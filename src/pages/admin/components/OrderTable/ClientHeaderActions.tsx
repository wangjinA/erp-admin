import { Button, Message } from "@arco-design/web-react"
import ActionHistory from "./ActionHistory"
import { OrderResponseItem } from "@/types/order"
import { ShowFormType } from "@/constants"
import { showMessage, showModal } from "@/utils"
import { orderAPI } from "@/api/client/order"
import { bus, EmitTypes } from "@/hooks/useEventBus"
import ExpressSheetButton from "./ExpressSheetButton"
import RefreshButton from "./RefreshButton"

interface ClientHeaderActionsProps {
  item: OrderResponseItem
  setCurrentOrder: React.Dispatch<any>
  setActionType: React.Dispatch<any>
}

const ClientHeaderActions = (props: ClientHeaderActionsProps) => {
  const { item, setCurrentOrder, setActionType } = props;
  return <header className="flex items-center p-2 border-b">
    <Button.Group>
      <Button
        disabled={item.orderStatus && !['0', '1', '2'].includes(item.orderStatus)}
        onClick={() => {
          const newOrder = structuredClone({
            ...item,
            clickPack: item.orderStatus === '5' || !item.whetherPack,
            logisticsOrderProductList: item.orderProductVOList.map((o) => ({
              ...o,
              "productInventoryVO": {
                "stockProductId": o.stockProductId,
                "number": o.stockUse
              }
            })),
            sendWarehouse: item.sendWarehouse === '0' ? undefined : item.sendWarehouse,

          })
          setCurrentOrder(newOrder)
          setActionType(ShowFormType.edit)
        }}
      >
        {item.whetherPack && item.orderStatus !== '5' ? '编辑打包' : '一键打包'}
      </Button>
      <Button
        disabled={!['0', '1', '2'].includes(item.orderStatus) || !item.whetherPack}
        onClick={async () => {
          await showModal({
            content: '确定要取消打包吗？',
          })
          await showMessage(
            () => orderAPI.cancelPack(item.id),
            '取消打包',
          )
          bus.emit(EmitTypes.refreshOrderPage)
        }}
      >
        取消打包
      </Button>
      <ExpressSheetButton orderItem={item} buttonProps={{}}></ExpressSheetButton>
      <RefreshButton
        buttonProps={{
          type: 'default',
          status: 'default',
        }}
        ids={[item.id]}
      >
      </RefreshButton>
      {/* <Button>发货预报</Button> */}
      {/* <Button>订单收入</Button> */}
      {/* <Button>隔离订单</Button> */}
      <Button
        onClick={() => {
          setCurrentOrder({
            ...item,
            logisticsOrderProductList: item.orderProductVOList,
          })
          setActionType(ShowFormType.create)
        }}
      >
        添加商品
      </Button>
      {/* <Button>打印出货单</Button> */}
      {/* <Button
        onClick={() => {
          showModal({
            content: '确定要申请预刷吗?',
            okButtonProps: {
              status: 'default',
            },
          }).then(() => {
            Message.success('预刷成功！')
          })
        }}
      >
        申请预刷
      </Button> */}
      <ActionHistory id={item.id}></ActionHistory>
      {/* <PopconfirmDelete
          title="删除订单"
          content="确认删除订单？操作不可逆！"
          isModal={true}
          onOk={async () => {
            await showMessage(() => orderAPI.remove(item.id))
            run()
          }}
        >
        </PopconfirmDelete> */}
    </Button.Group>
    {/* <div className="flex items-center ml-auto">
      <span className={labelClass}>订单编号：</span>
      <span className={valueClass}>{item.shrimpOrderNo}</span>
      <Button size="mini" type="text">
        查看详情
      </Button>
    </div> */}
  </header>
}

export default ClientHeaderActions;