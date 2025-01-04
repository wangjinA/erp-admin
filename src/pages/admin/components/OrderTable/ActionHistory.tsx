import { Button, Empty, Modal, Spin, Timeline } from '@arco-design/web-react'
import { IconFile } from '@arco-design/web-react/icon'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'

import { useState } from 'react'

import { orderAPI } from '@/api/client/order'
import { formatDate } from '@/utils'

interface ActionHistoryProps {
  buttonProps?: ButtonProps
  id: number
}
export default (props: ActionHistoryProps) => {
  const { buttonProps, id } = props
  const [visible, setVisible] = useState(false)

  const logHandle = useRequest(
    async () => {
      return orderAPI.getLog(id).then(r => r.data)
    },
    {
      manual: true,
    },
  )
  return (
    <>
      <Button
        icon={<IconFile />}
        onClick={() => {
          logHandle.run()
          setVisible(true)
        }}
        {...buttonProps}
      >
        操作记录
      </Button>

      <Modal
        title="操作记录"
        visible={visible}
        onCancel={() => setVisible(false)}
        cancelText="关闭"
        unmountOnExit={true}
        onOk={async () => {
          setVisible(false)
        }}
      >
        <Spin
          loading={logHandle.loading}
          className="mx-auto block max-h-96 overflow-y-auto"
        >
          {!logHandle.loading && logHandle.data?.data.list?.length
            ? (
                <Timeline>
                  {logHandle.data?.data.list.map(item => (
                    <Timeline.Item
                      key={item.id}
                      label={item.operationContent || '-'}
                    >
                      <span>{item.operationProcedure}</span>
                      <span className="ml-4 text-gray-500">
                        {formatDate(item.createTime)}
                      </span>
                    </Timeline.Item>
                  ))}
                </Timeline>
              )
            : (
                <Empty description="暂无记录"></Empty>
              )}
        </Spin>
      </Modal>
    </>
  )
}
