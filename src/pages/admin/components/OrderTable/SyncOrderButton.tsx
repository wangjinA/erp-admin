import { Button, ButtonProps, Form, Message, Modal } from '@arco-design/web-react'
import { IconSync } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useState } from 'react'

import { orderAPI } from '@/api/client/order'
import FilterForm from '@/components/FilterForm'

export default ({ buttonProps }: {
  buttonProps?: ButtonProps
}) => {
  const [syncForm] = Form.useForm()
  const [showSyncOrder, setShowSyncOrder] = useState(false)

  const { run, loading } = useRequest(async () => {
    const { storeId } = await syncForm.validate()
    if (!storeId.length) {
      return Message.error('未获取到店铺信息')
    }
    try {
      orderAPI.syncOrder({
        orderUpdateStartTime: dayjs().subtract(15, 'day').format('YYYY-MM-DD HH:mm:ss'),
        orderUpdateEndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        storeId,
      })
      setShowSyncOrder(false)
      Message.success({
        content: '同步订单任务已提交，请稍后刷新查看',
        duration: 2000,
      })
    }
    catch (error) {
      Message.error(error.message)
    }
  }, {
    manual: true,
  })

  return (
    <>
      <Button
        loading={loading}
        icon={<IconSync />}
        type="outline"
        onClick={() => {
          setShowSyncOrder(true)
        }}
        {...buttonProps}
      >
        同步订单
      </Button>
      <Modal
        title="选择店铺"
        visible={showSyncOrder}
        style={{ width: 800 }}
        onCancel={() => {
          setShowSyncOrder(false)
        }}
        hideCancel={true}
        onConfirm={() => {
          run()
        }}
      >
        <FilterForm
          form={syncForm}
          span={24}
          formItemConfigList={[
            {
              schema: {
                label: '所属店铺',
                field: 'storeId',
                required: true,
              },
              control: 'shopSelector',
              controlProps: {
                mode: 'multiple',
              },
            },
          ]}
        >

        </FilterForm>
      </Modal>
    </>
  )
}
