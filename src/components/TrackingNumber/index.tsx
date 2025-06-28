import { Empty, Link, Message, Modal, Spin, Timeline, Typography } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { useState } from 'react'

import { expressAPI } from '@/api/client/express'
import ExpressSheetButton from '@/pages/admin/components/OrderTable/ExpressSheetButton'
import { isAdmin } from '@/routes'
import ShipmentButton from '@/pages/admin/components/OrderTable/ShipmentButton'
import { OrderResponseItem } from '@/types/order'
import { bus, EmitTypes } from '@/hooks/useEventBus'
import { IconSend } from '@arco-design/web-react/icon'
import { OrderStatus, ShopeeStatus } from '@/constants/order'
import dayjs from 'dayjs'

export default ({
  orderItem,
}: {
  orderItem: OrderResponseItem
}) => {
  const [visible, setVisible] = useState(false)
  const trackHandle = useRequest(async () => {
    if (trackHandle.data?.length) {
      setVisible(true)
      return trackHandle.data
    }
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

  const trackingNumber = orderItem?.orderPackageList?.[0]?.trackingNumber || orderItem?.logisticsOrderPackageList?.[0]?.trackingNumber

  if (!trackingNumber) {
    const showShipmentButton = isAdmin() && orderItem.orderStatus === OrderStatus['已出库'] && orderItem.shopeeStatus !== ShopeeStatus['已装船']
    if (showShipmentButton) {

      if (orderItem.shippingTime) {
        const min10 = dayjs().diff(dayjs(orderItem.shippingTime), 'minute') < 10
        if (min10 && orderItem.createType === '0') {
          return <span>
            <Spin size={13}></Spin>
            <Typography.Text className="ml-2 text-sm" type="secondary" >获取面单中...</Typography.Text>
          </span>
        } else {
          return <>-</>
        }
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
      <Typography.Text copyable={{
        text: trackingNumber
      }}>
        <Link
          disabled={trackHandle.loading}
          className="!inline"
          onClick={() => {
            trackHandle.run()
          }}
        >
          {trackingNumber}
        </Link>
      </Typography.Text>
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
