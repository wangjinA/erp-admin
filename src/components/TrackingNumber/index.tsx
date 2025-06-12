import { Empty, Link, Message, Modal, Timeline } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { useState } from 'react'

import { expressAPI as adminExpressAPI } from '@/api/admin/express'
import { expressAPI } from '@/api/client/express'
import ExpressSheetButton from '@/pages/admin/components/OrderTable/ExpressSheetButton'
import { isClient } from '@/routes'

export default ({
  orderItem,
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
  const trackingNumber = orderItem?.orderPackageList[0]?.trackingNumber
  if (!trackingNumber) {
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
