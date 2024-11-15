import { Link, Modal, Timeline } from '@arco-design/web-react'
import { useState } from 'react'

import ExpressSheetButton from '@/pages/admin/components/OrderTable/ExpressSheetButton'

export default ({
  value,
  orderItem,
}) => {
  const [visible, setVisible] = useState(false)
  if (!value) {
    return <>-</>
  }
  return (
    <>
      <Link
        className="!inline"
        onClick={() => {
          setVisible(true)
        }}
      >
        {value}
      </Link>
      <ExpressSheetButton orderItem={orderItem}></ExpressSheetButton>
      <Modal
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
        <Timeline>
          <Timeline.Item label="2024-12-12">
            开发中
          </Timeline.Item>
          <Timeline.Item label="2024-12-12">
            开发中
          </Timeline.Item>
          <Timeline.Item label="2024-12-12">
            开发中
          </Timeline.Item>
          <Timeline.Item label="2024-12-12">
            开发中
          </Timeline.Item>
        </Timeline>
      </Modal>
    </>
  )
}
