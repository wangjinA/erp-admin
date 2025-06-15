import { Empty, Link, Message, Modal, Spin, Timeline, Typography } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { useState } from 'react'

import { expressAPI as adminExpressAPI } from '@/api/admin/express'
import { expressAPI } from '@/api/client/express'
import ExpressSheetButton from '@/pages/admin/components/OrderTable/ExpressSheetButton'
import { isAdmin, isClient } from '@/routes'
import ShipmentButton from '@/pages/admin/components/OrderTable/ShipmentButton'
import { OrderResponseItem } from '@/types/order'
import { bus, EmitTypes } from '@/hooks/useEventBus'
import { IconSend } from '@arco-design/web-react/icon'
import { OrderStatus, ShopeeStatus } from '@/constants/order'

export default ({
  orderItem,
}: {
  orderItem: OrderResponseItem
}) => {
  const [visible, setVisible] = useState(false)
  const trackHandle = useRequest(async () => {
    return expressAPI.getOrderTrack(orderItem.id).then(res => res.data?.data?.trackingInfoItemVOList).then((r) => {
      setVisible(true)
      return r
    }).catch((e) => {
      Message.error('查看失败，暂无物流跟踪信息')
      return []
    })
  }, {
    manual: true,
  })
  const trackingNumber = orderItem?.orderPackageList?.[0]?.trackingNumber



  if (!trackingNumber) {
    const showShipmentButton = isAdmin() && orderItem.orderStatus === OrderStatus['已出库'] && orderItem.shopeeStatus !== ShopeeStatus['已装船']
    if (showShipmentButton) {

      if (orderItem.shippingTime) {
        return <span>
          <Spin size={13}></Spin>
          <Typography.Text className="ml-2 text-sm" type="secondary" >获取面单中...</Typography.Text>
        </span>
      }

      return <ShipmentButton
        orderItem={orderItem}
        sendWarehouse={orderItem.sendWarehouse}
        shrimpOrderNo={orderItem.shrimpOrderNo}
        onSuccess={() => {
          bus.emit(EmitTypes.refreshOrderPage)
        }}
        buttonProps={{
          icon: <IconSend />,
          size: 'small',
          type: 'text',
          status: 'default'
        }}
      />
    }
    return <>-</>
  }
  return (
    <>
      <Link
        disabled={trackHandle.loading}
        className="!inline"
        onClick={() => {
          trackHandle.run()
        }}
      >
        {trackingNumber}
      </Link>
      <ExpressSheetButton orderItem={orderItem}></ExpressSheetButton>
      <Modal
        confirmLoading={trackHandle.loading}
        title="物流信息"
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        hideCancel={true}
        onConfirm={() => {
          setVisible(false)
        }}
      >
        {trackHandle.data?.length
          ? (
            <Timeline>
              {trackHandle.data?.map(item => (
                <Timeline.Item key={item.updateTime} label={item.updateTime}>
                  {item.description}
                </Timeline.Item>
              ))}
            </Timeline>
          )
          : <Empty description="暂无物流跟踪信息"></Empty>}
      </Modal>
    </>
  )
}
