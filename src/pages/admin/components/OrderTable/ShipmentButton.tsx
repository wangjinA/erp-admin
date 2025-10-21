import { Button, Form, Message, Modal, Notification } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'

import { useRef, useState } from 'react'

import { ScanParams, entrepotAPI } from '@/api/admin/entrepot'
import { orderAPI } from '@/api/admin/order'
import { CreateFormItemType } from '@/components/CreateFormItem'
import FilterForm from '@/components/FilterForm'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'
import { SuccessCode } from '@/api'

interface ShipmentButtonButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  orderItem: OrderResponseItem
  onSuccess: () => void
}

const getInfoNeededMap: (options: any[]) => Record<string, CreateFormItemType> = (options: any[]) => ({
  sender_real_name: {
    schema: {
      label: '寄件人姓名',
      field: 'senderRealName',
      required: true,
    },
    control: 'select',
    controlProps: {
      options,
    },
  },
  tracking_no: {
    schema: {
      label: '快递单号',
      field: 'trackingNo',
      required: true,
    },
  },
})

export default (props: ShipmentButtonButtonProps) => {
  const { orderItem, buttonProps, onSuccess, ...scanParams } = props
  const [formItemConfigList, setFormItemConfigList] = useState([])
  const [pickUp, setPickUp] = useState([])
  const [initialValues, setInitialValues] = useState({})
  const parameterData = useRef({})

  const [formRef] = Form.useForm()
  const mainHandle = async () => {
    const formData = await formRef.validate()
    if (parameterData.current && pickUp.length) {
      const data = {
        ...parameterData.current,
        pickUp: JSON.stringify({
          address_list: [pickUp.find(item => item.address_id === formData.addressList)]
        })
      };
      const updateParameterRes = await orderAPI.updateParameter(data)
      if (updateParameterRes.data.code !== SuccessCode) {
        Message.error(updateParameterRes.data.msg || '更新收件数据失败！')
        return
      }
    }
    await showMessage(() => orderAPI.shipment({
      ...formData,
      orderId: orderItem.id,
    }), '出货')
    bus.emit(EmitTypes.refreshOrderPage)
    setFormItemConfigList([])
    parameterData.current = null
    setPickUp([])
  }
  const { loading, run } = useRequest(mainHandle, {
    manual: true,
  })
  const getNeedInfoHandle = useRequest(async () => {
    // orderAPI.createShellOrder(orderItem.id)
    // return
    const [shippingRes, senderRes] = await Promise.all([
      orderAPI.getShippingParameter(orderItem.id),
      entrepotAPI.getSenderAll({
        entrepotId: orderItem.sendWarehouse,
      }),
    ])
    // 取默认寄件人信息
    setInitialValues({
      senderRealName: senderRes.default,
    })
    const dropoff = shippingRes?.data?.data?.infoNeeded?.dropoff;
    const InfoNeededMap = getInfoNeededMap(senderRes.options)
    const ls = dropoff?.map(o => InfoNeededMap[o]) || []
    const pickUpData: any[] = JSON.parse(shippingRes?.data?.data?.pickUp || '{}')?.address_list || []

    if (pickUpData.length) {
      parameterData.current = shippingRes?.data?.data;
      setPickUp(pickUpData)
      ls.push({
        schema: {
          label: '寄件地址',
          field: 'addressList',
          required: true,
        },
        control: 'select',
        controlProps: {
          options: pickUpData.map(item => ({
            label: `${item.state} ${item.city} ${item.address}`,
            value: item.address_id,
          })),
        },
      })
    }
    setFormItemConfigList(ls)
    if (!ls.length) {
      return mainHandle();
      // Message.error('相关信息获取失败！请先将包裹出库')
    } else {
      Notification.success({
        title: '速运宝温馨提示',
        content: '相关信息获取成功，请手动选择！',
        duration: 8000,
      })
    }
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
        disabled={!!orderItem?.orderPackageList?.some(item => item.documentUrl)}
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
        style={{
          width: 700
        }}
        onCancel={() => {
          setFormItemConfigList([])
          parameterData.current = null
          setPickUp([])
        }}
        maskClosable={false}
        unmountOnExit={true}
        confirmLoading={loading}
        onOk={async () => {
          run()
        }}
      >
        <FilterForm
          span={24}
          form={formRef}
          initialValues={initialValues}
          formItemConfigList={formItemConfigList}
        >
        </FilterForm>
      </Modal>
    </>
  )
}
