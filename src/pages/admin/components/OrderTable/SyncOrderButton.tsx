import { Button, ButtonProps, Form, Message, Modal } from '@arco-design/web-react'
import { IconSync } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useState } from 'react'

import { SuccessCode } from '@/api'
import { orderAPI } from '@/api/client/order'
import FilterForm from '@/components/FilterForm'
import { sleep } from '@/utils'
import { timeRangeShortcuts14Day } from '@/constants'

export default ({ buttonProps }: {
  buttonProps?: ButtonProps
}) => {
  const [syncForm] = Form.useForm()
  const [showSyncOrder, setShowSyncOrder] = useState(false)
  const [dates, setDates] = useState([]);

  const { run, loading } = useRequest(async () => {
    const { storeId, orderUpdateTime } = await syncForm.validate()
    if (!storeId.length) {
      return Message.error('未获取到店铺信息')
    }
    try {
      const res: any = await Promise.race([orderAPI.syncOrder({
        orderUpdateStartTime: dayjs(orderUpdateTime[0]).format('YYYY-MM-DD HH:mm:ss'),
        orderUpdateEndTime: dayjs(orderUpdateTime[1]).format('YYYY-MM-DD HH:mm:ss'),
        storeId,
      }), sleep(2000)])
      if (res?.data && res.data.code !== SuccessCode) {
        return Modal.error({
          title: '操作失败',
          content: res.data.msg,
        })
      }

      setShowSyncOrder(false)
      Modal.success({
        title: '操作成功',
        content: '同步任务已提交，请稍后刷新页面查看',
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
        title="同步订单"
        visible={showSyncOrder}
        style={{ width: 600 }}
        onCancel={() => {
          setShowSyncOrder(false)
        }}
        confirmLoading={loading}
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
            {
              schema: {
                label: '时间范围',
                field: 'orderUpdateTime',
                required: true,
              },
              control: 'datePickerRange',
              controlProps: {
                onSelect: (valueString, value) => {
                  setDates(value)
                },
                onVisibleChange: (visible) => {
                  if (!visible) {
                    setDates([]);
                  }
                },
                disabledDate: (current) => {
                  if (dates && dates.length) {
                    const tooLate = dates[0] && Math.abs(current.diff(dates[0], 'day')) > 14;
                    const tooEarly = dates[1] && Math.abs(dates[1].diff(current, 'day')) > 14;
                    return tooEarly || tooLate;
                  }
                  return false;
                },
                clearRangeOnReselect: true,
                shortcuts: timeRangeShortcuts14Day,
              }
            },
          ]}
        >

        </FilterForm>
      </Modal >
    </>
  )
}
