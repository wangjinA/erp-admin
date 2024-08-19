/**
 * 退件弹窗
 */

import { Form, Modal } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import React from 'react'

import { expressAPI } from '@/api/client/express'
import FilterForm from '@/components/FilterForm'
import EntrepotSelector from '@/components/Selectors/EntrepotSelector'
import { showMessage } from '@/utils'

interface ReturnParcelProps {
  visible: boolean
  sendWarehouse?: string
  trackingNo?: string
  setVisible: (v: boolean) => void
  onSuccess?: () => void
}
const ReturnParcel: React.FC<ReturnParcelProps> = (props) => {
  const { visible, sendWarehouse, trackingNo, setVisible, onSuccess } = props
  const [formRef] = Form.useForm()

  // 退件
  const returnHandle = useRequest(
    async () => {
      const formData = await formRef.validate()
      await showMessage(() => expressAPI.returnOperation(formData))
      onSuccess?.()
      setVisible(false)
    },
    {
      manual: true,
    },
  )

  return (
    <Modal
      title="新增退件快递"
      visible={visible}
      confirmLoading={returnHandle.loading}
      onCancel={() => {
        setVisible(false)
      }}
      onOk={() => {
        returnHandle.run()
      }}
    >
      <FilterForm
        initialValues={{
          sendWarehouse,
          trackingNo,
        }}
        span={24}
        form={formRef}
        formItemConfigList={[
          {
            schema: {
              field: 'sendWarehouse',
              label: '打包仓库',
            },
            control: <EntrepotSelector></EntrepotSelector>,
          },
          {
            schema: {
              field: 'trackingNo',
              label: '物流单号',
              required: true,
            },
          },
          {
            schema: {
              field: 'recipientsInfo',
              label: '收件信息',
              required: true,
            },
            formItemProps: {
              extra: '例：张三，15270848182，东莞市xx镇南城街道A区3栋xx号',
            },
            control: 'textarea',
          },
          {
            schema: {
              field: 'storeRemark',
              label: '备注',
            },
            formItemProps: {
              extra: (
                <span className="text-red-600">
                  如是上门取件，请务必填写取件码！
                </span>
              ),
            },
            control: 'textarea',
          },
        ]}
      >
      </FilterForm>
    </Modal>
  )
}

export default ReturnParcel
