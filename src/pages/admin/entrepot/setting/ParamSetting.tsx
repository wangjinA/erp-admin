import { Button, Form, Spin } from '@arco-design/web-react'

import { IconEdit, IconSave } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'

import { entrepotAPI } from '@/api/admin/entrepot'
import { FormType } from '@/components/CreateFormItem'
import FilterForm from '@/components/FilterForm'
import { SwitchFormItem } from '@/constants/schema/common'
import { showMessage } from '@/utils'
import { ShippingOrderPrintingTemplateOptions } from '@/constants/entrepot'

export default ({ className, entrepotId }: {
  className?: string
  entrepotId: any
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [form] = Form.useForm()
  const getHandler = useRequest(
    () => {
      return entrepotAPI.getEntrepotParams(entrepotId)
    },
    {
      manual: false,
      refreshDeps: [entrepotId],
    },
  )
  console.log(getHandler.data?.data.data)
  const setHandler = useRequest(
    async () => {
      const formData = await form.validate()
      await showMessage(() => entrepotAPI.setEntrepotParams({
        ...(getHandler.data?.data?.data || {}),
        ...formData,
        entrepotId,
      })).then((r) => {
        setIsEdit(false)
        return r
      })
    },
    {
      manual: true,
    },
  )
  useEffect(() => {
    setIsEdit(false)
  }, [entrepotId])
  return (
    <div
      className={className}
    >
      <div className="flex gap-4 mb-4">
        {
          isEdit
            ? (
              <>
                <Button
                  onClick={
                    () => {
                      setIsEdit(false)
                    }
                  }
                  loading={setHandler.loading}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  status="success"
                  icon={<IconSave />}
                  loading={setHandler.loading}
                  onClick={
                    () => {
                      setHandler.run()
                    }
                  }
                >
                  保存
                </Button>
              </>
            )
            : (
              <Button
                type="primary"
                icon={<IconEdit />}
                onClick={
                  () => {
                    setIsEdit(true)
                  }
                }
              >
                编辑
              </Button>
            )
        }
      </div>

      <Spin className="block" loading={getHandler.loading || setHandler.loading}>
        {
          !getHandler.loading
            ? (
              <FilterForm
                form={form}
                formType={isEdit ? FormType.default : FormType.preview}
                initialValues={{
                  ...(getHandler.data?.data?.data || {}),
                  1: true,
                  2: true,
                  3: '50x30',
                }}
                span={12}
                labelCol={{
                  style: {
                    textAlign: 'left',
                  },
                }}
                formItemConfigList={[
                  {
                    ...SwitchFormItem,
                    schema: {
                      label: '扫码入库是否分仓位',
                      field: 'whetherDivideSpace',
                    },
                  },
                  {
                    ...SwitchFormItem,
                    schema: {
                      label: '待扣头程费用订单自动扣费',
                      field: 'autoFeeDeduction',
                    },
                  },
                  {
                    schema: {
                      label: '仓位打印模版',
                      field: 'warehousePrintingTemplate',
                    },
                    control: 'radio',
                    controlProps: {
                      options: [
                        {
                          label: '100x100',
                          value: '100x100',
                        },
                        {
                          label: '50x30',
                          value: '50x30',
                        },
                      ],
                    },
                  },
                  {
                    schema: {
                      label: '上架服务费',
                      field: 'shelfServiceCharge',
                    },
                    control: 'number',
                  },
                  {
                    schema: {
                      label: '袋号打印模版',
                      field: 'bagNumberPrintTemplate',
                    },
                    control: 'radio',
                    controlProps: {
                      options: [
                        {
                          label: '100x100',
                          value: '100x100',
                        },
                        {
                          label: '50x30',
                          value: '50x30',
                        },
                      ],
                    },
                  },
                  {
                    schema: {
                      label: '出货单水印',
                      field: 'shippingNoteWatermarking',
                    },
                  },
                  {
                    schema: {
                      label: '入库数量',
                      field: 'quantityInStorage',
                    },
                    control: 'number',
                  },
                  {
                    schema: {
                      label: '出货单打印模版',
                      field: 'shippingOrderPrintingTemplate',
                    },
                    control: 'radio',
                    controlProps: {
                      options: ShippingOrderPrintingTemplateOptions
                    },
                  },
                  {
                    schema: {
                      label: '出货单集',
                      field: 'shippingOrderSet',
                    },
                  },
                  {
                    schema: {
                      label: '出货单末',
                      field: 'endOfShipment',
                    },
                  },
                  {
                    schema: {
                      label: '出货单虚拟号码',
                      field: 'shippingOrderVirtualNumber',
                    },
                  },
                  {
                    schema: {
                      label: '收件名称',
                      field: 'recipientName',
                    },
                  },
                  {
                    schema: {
                      label: '收件手机号',
                      field: 'recipientPhone',
                    },
                  },
                  {
                    schema: {
                      label: '收件地址',
                      field: 'recipientAddress',
                    },
                    control: 'textarea',
                  },
                  {
                    schema: {
                      label: '寄件名称',
                      field: 'senderName',
                    },
                  },
                  {
                    schema: {
                      label: '寄件手机号',
                      field: 'senderPhone',
                    },
                  },
                  {
                    schema: {
                      label: '寄件地址',
                      field: 'senderAddress',
                    },
                    control: 'textarea',
                  },
                  {
                    schema: {
                      label: '装袋预警重量',
                      field: 'baggingWarningWeight',
                    },
                  },
                  {
                    ...SwitchFormItem,
                    schema: {
                      label: '出库打印面单',
                      field: 'printOutSheet',
                    },
                  },
                  {
                    ...SwitchFormItem,
                    schema: {
                      label: '打包下单扣进店费用',
                      field: 'placeOrderfeeDeduction',
                    },
                  },
                  {
                    ...SwitchFormItem,
                    schema: {
                      label: '秤链接',
                      field: 'scaleLink',
                    },
                  },
                  {
                    ...SwitchFormItem,
                    schema: {
                      label: '装袋自动申请面单',
                      field: 'autoApplyForm',
                    },
                  },
                  {
                    ...SwitchFormItem,
                    schema: {
                      label: 'PDA上架是否入库',
                      field: 'whetherPda',
                    },
                  },
                  {
                    schema: {
                      label: '特快设置',
                      field: 'expressSetting',
                    },
                  },
                  {
                    schema: {
                      label: '空运设置',
                      field: 'airTransportSetup',
                    },
                  },

                ]}
              >
              </FilterForm>
            )
            : null
        }
      </Spin>
    </div>
  )
}
