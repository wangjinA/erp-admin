import { FormInstance, Modal, ModalProps, Spin } from '@arco-design/web-react'

import FilterForm from '@/components/FilterForm'
import { FormModalCommonProps } from '@/constants'
import { useDefaultEntrepot } from '@/components/Selectors/EntrepotSelector'

export interface ApplyWarehousing {
  form: FormInstance
  modalProps: ModalProps
}

export default (props: ApplyWarehousing) => {
  const { form, modalProps } = props
  const defaultEntrepotHandle = useDefaultEntrepot();

  return (
    <Modal
      {...FormModalCommonProps}
      title="入库申请"
      {...modalProps}
    >
      {
        defaultEntrepotHandle.loading ? <Spin className="mx-auto block w-[max-content]"></Spin> :
          <FilterForm
            form={form}
            span={24}
            initialValues={{
              sendWarehouse: defaultEntrepotHandle.data?.id,
            }}
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
      }
    </Modal>
  )
}
