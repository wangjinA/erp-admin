import { Button, Form, Modal } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'

import { useState } from 'react'

import { ScanParams, entrepotAPI } from '@/api/admin/entrepot'
import { orderAPI } from '@/api/admin/order'
import { CreateFormItemType } from '@/components/CreateFormItem'
import FilterForm from '@/components/FilterForm'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'

interface ShipmentButtonButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  orderItem: OrderResponseItem
  onSuccess: () => void
}

const InfoNeededMap: Record<string, CreateFormItemType> = {
  sender_real_name: {
    schema: {
      label: '寄件人姓名',
      field: 'senderRealName',
      required: true,
    },
  },
  tracking_no: {
    schema: {
      label: '物流单号',
      field: 'trackingNo',
      required: true,
    },
  },
}

export default (props: ShipmentButtonButtonProps) => {
  const { orderItem, buttonProps, onSuccess, ...scanParams } = props
  const [formItemConfigList, setFormItemConfigList] = useState([])
  const [formRef] = Form.useForm()
  const { loading, run } = useRequest(async () => {
    const formData = await formRef.validate()
    await showMessage(() => orderAPI.shipment({
      ...formData,
      orderId: orderItem.id,
    }), '出货')
    bus.emit(EmitTypes.refreshOrderPage)
    setFormItemConfigList([])
  }, {
    manual: true,
  })
  const getNeedInfoHandle = useRequest(async () => {
    const [shippingRes, senderRes] = await Promise.all([
      orderAPI.getShippingParameter(orderItem.id),
      // ! 没写完检查
      entrepotAPI.getSenderAll({
        entrepotId: orderItem.sendWarehouse,
      }),
    ])
    console.log(senderRes.data)
    setFormItemConfigList(shippingRes?.data?.data?.infoNeeded?.dropoff?.map(o => InfoNeededMap[o]) || [])
  }, {
    manual: true,
  })
  return (
    <>
      {/* <PopconfirmDelete
        title="确定出货？"
        buttonProps={{
          loading,
        }}
        onOk={}
        disabled={buttonProps?.disabled}
      > */}
      <Button
        type="text"
        status="success"
        loading={getNeedInfoHandle.loading}
        onClick={() => {
          getNeedInfoHandle.run()
        }}
        {...buttonProps}
      >
        安排出货
      </Button>
      {/* </PopconfirmDelete> */}
      <Modal
        title="申请寄件编号"
        visible={!!formItemConfigList.length}
        onCancel={() => {
          setFormItemConfigList([])
        }}
        unmountOnExit={true}
        confirmLoading={loading}
        onOk={async () => {
          run()
        }}
      >
        <FilterForm
          span={24}
          form={formRef}
          initialValues={{}}
          formItemConfigList={formItemConfigList}
        >
        </FilterForm>
      </Modal>
    </>
  )
}
