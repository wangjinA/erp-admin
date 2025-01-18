import { FormInstance, Modal, ModalProps } from '@arco-design/web-react'

import FilterForm from '@/components/FilterForm'
import { FormModalCommonProps } from '@/constants'

export interface ApplyWarehousing {
  form: FormInstance
  modalProps: ModalProps
}

export default (props: ApplyWarehousing) => {
  const { form, modalProps } = props

  return (
    <Modal
      {...FormModalCommonProps}
      title="入库申请"
      {...modalProps}
    >
      <FilterForm
        form={form}
        span={24}
        formItemConfigList={[
          {
            schema: {
              label: '送往仓库',
              field: 'sendWarehouse',
              required: true,
            },
            control: 'entrepotSelector',
          },
          {
            schema: {
              label: '快递单号',
              field: 'expressNo',
            },
            control: 'select',
            controlProps: {
              allowCreate: true,
              mode: 'multiple',
              placeholder: '输入后按回车键',
            },
          },
          {
            schema: {
              label: '选择商品',
              field: 'stockStorageApplyProductList',
              required: true,
            },
            control: 'productSelector',
          },
        ]}
      >

      </FilterForm>
    </Modal>
  )
}
