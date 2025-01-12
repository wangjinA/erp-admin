import { Button, Grid, Tabs } from '@arco-design/web-react'

import { IconEdit, IconSave } from '@arco-design/web-react/icon'
import { useState } from 'react'

import EntrepotList from '../components/EntrepotList'
import SenderList from '../components/SenderList'
import { useEntrepotInfo } from '../info/hooks'

import CostSetting from './CostSetting'

import { FormType } from '@/components/CreateFormItem'
import FilterForm from '@/components/FilterForm'

export default () => {
  const entrepotInfoHandle = useEntrepotInfo({
    isPureList: true,
  })
  const { activeEntrepot } = entrepotInfoHandle
  console.log(activeEntrepot)

  const [isEdit, setIsEdit] = useState(false)
  return (
    <div className="bg-white py-6 px-4">
      <Grid.Row gutter={[20, 0]}>
        <Grid.Col span={6} className="border-r border-neutral-3 pr-4">
          <EntrepotList entrepotInfoHandle={entrepotInfoHandle}></EntrepotList>
        </Grid.Col>

        <Grid.Col span={18} className="pr-6">
          <Tabs defaultActiveTab="费用设置" lazyload={true}>
            <Tabs.TabPane title="费用设置" key="费用设置">
              <CostSetting entrepotId={activeEntrepot?.id}></CostSetting>
            </Tabs.TabPane>
            <Tabs.TabPane title="人员设置" key="人员设置">
              人员设置 开发中...
            </Tabs.TabPane>
            <Tabs.TabPane title="寄件人姓名" key="寄件人姓名">
              {activeEntrepot ? <SenderList entrepotId={activeEntrepot.id}></SenderList> : null}
            </Tabs.TabPane>
            <Tabs.TabPane title="仓库参数设置" key="仓库参数设置">
              <div
                className="px-4"
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
                            >
                              取消
                            </Button>
                            <Button
                              type="primary"
                              status="success"
                              icon={<IconSave />}
                              onClick={
                                () => {
                                  setIsEdit(false)
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

                <FilterForm
                  formType={isEdit ? FormType.default : FormType.preview}
                  initialValues={{
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
                      schema: {
                        label: '扫码入库是否分仓位',
                        field: '1',
                      },
                      control: 'switch',
                    },
                    {
                      schema: {
                        label: '待扣头程费用订单自动扣费',
                        field: '2',
                      },
                      control: 'switch',
                    },
                    {
                      schema: {
                        label: '仓位打印模版',
                        field: '3',
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
                        field: '4',
                      },
                      control: 'number',
                    },
                    {
                      schema: {
                        label: '袋号打印模版',
                        field: '5',
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
                        field: '6',
                      },
                    },
                    {
                      schema: {
                        label: '入库数量',
                        field: '7',
                      },
                      control: 'number',
                    },
                    {
                      schema: {
                        label: '出货单打印模版',
                        field: '8',
                      },
                      control: 'radio',
                      controlProps: {
                        options: [
                          {
                            label: '圆通速运',
                            value: '圆通速运',
                          },
                          {
                            label: '二维码',
                            value: '二维码',
                          },
                          {
                            label: '条形码',
                            value: '条形码',
                          },
                        ],
                      },
                    },
                    {
                      schema: {
                        label: '出货单集',
                        field: '9',
                      },
                    },
                    {
                      schema: {
                        label: '出货单末',
                        field: '10',
                      },
                    },
                    {
                      schema: {
                        label: '出货单虚拟号码',
                        field: '11',
                      },
                    },
                    {
                      schema: {
                        label: '收件名称',
                        field: '12',
                      },
                    },
                    {
                      schema: {
                        label: '收件手机号',
                        field: '13',
                      },
                    },
                    {
                      schema: {
                        label: '收件地址',
                        field: '14',
                      },
                      control: 'textarea',
                    },
                    {
                      schema: {
                        label: '寄件名称',
                        field: '15',
                      },
                    },
                    {
                      schema: {
                        label: '寄件手机号',
                        field: '16',
                      },
                    },
                    {
                      schema: {
                        label: '寄件地址',
                        field: '17',
                      },
                      control: 'textarea',
                    },
                    {
                      schema: {
                        label: '装袋预警重量',
                        field: '18',
                      },
                    },
                    {
                      schema: {
                        label: '出库打印面单',
                        field: '19',
                      },
                      control: 'switch',
                    },
                    {
                      schema: {
                        label: '打包下单扣进店费用',
                        field: '20',
                      },
                      control: 'switch',
                    },
                    {
                      schema: {
                        label: '秤链接',
                        field: '21',
                      },
                      control: 'switch',
                    },
                    {
                      schema: {
                        label: '装袋自动申请面单',
                        field: '22',
                      },
                      control: 'switch',
                    },
                    {
                      schema: {
                        label: 'PDA上架是否入库',
                        field: '23',
                      },
                      control: 'switch',
                    },
                    {
                      schema: {
                        label: '特快设置',
                        field: '24',
                      },
                    },
                    {
                      schema: {
                        label: '空运设置',
                        field: '25',
                      },
                    },

                  ]}
                >
                </FilterForm>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Grid.Col>
      </Grid.Row>
    </div>
  )
}
