import {
  Button,
  Card,
  Form,
  FormInstance,
  Result,
  Skeleton,
  Space,
  Steps,
} from '@arco-design/web-react'
import { IconDelete, IconPlus } from '@arco-design/web-react/icon'

import { useLocalStorageState, useRequest } from 'ahooks'
import classNames from 'classnames'
import { merge, random } from 'lodash'
import { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useDebouncedCallback } from 'use-debounce'

import styles from './index.module.less'
import locale from './locale'
import {
  OrderCreateSchema1,
  OrderCreateSchema2,
  OrderCreateSchema3,
} from './schema'

import { orderAPI } from '@/api/admin/order'
import FilterForm from '@/components/FilterForm'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import { HideClass } from '@/constants/style'
import { Order, OrderProductList } from '@/types/order'
import { showMessage } from '@/utils'
import useI18n from '@/utils/useI18n'
import { useDefaultEntrepot } from '@/components/Selectors/EntrepotSelector'

export default () => {
  const defaultEntrepotHandle = useDefaultEntrepot();
  const [formData, setFormData] = useLocalStorageState<Partial<Order>>(
    'create-order',
    {
      defaultValue: {},
    },
  )
  const [current, setCurrent] = useState(1)
  const [skuList, setSkuList] = useState<
    Partial<OrderProductList & { _id: number }>[]
  >(
    (formData.orderProductList || [{}]).map(item => ({
      ...item,
      _id: random(0, 999999),
    })),
  )
  const history = useHistory()

  const skuRefs = useRef<FormInstance<any>[]>([])
  const [ref1] = Form.useForm()
  const [ref3] = Form.useForm()

  const setFormDataDebounce = useDebouncedCallback((v: Partial<Order>) => {
    setFormData({
      ...formData,
      ...v,
    })
  }, 300)

  const t = useI18n(locale)
  const resetCreateForm = () => {
    ref1.clearFields()
    ref3.clearFields()
    setSkuList([
      {
        _id: random(0, 999999),
      },
    ])
    skuRefs.current.forEach((item) => {
      item.clearFields()
    })
  }

  const createHandler = useRequest(
    async () => {
      console.log(formData)
      await showMessage(() => orderAPI.insert({ customStatus: true, ...formData }))
      setCurrent(current + 1)
    },
    {
      manual: true,
    },
  )

  const toNext = async () => {
    if (current === 1) {
      await ref1.validate()
    }
    else if (current === 2) {
      console.log(skuRefs.current)

      await Promise.all(skuRefs.current?.map(item => item.validate()))
    }
    else if (current === 3) {
      await ref3.validate()
    }
    setCurrent(current + 1)
  }

  return (
    <div className="bg-white p-4 syb-content-h">
      <Card>
        <div className={styles.wrapper}>
          <Steps current={current} lineless className="mb-20">
            <Steps.Step
              title={t['stepForm.title.basicInfo']}
              description="订单基础信息"
            />
            <Steps.Step title="订单商品信息" description="详细的商品sku" />
            <Steps.Step title="买家基本信息" description="收件人信息相关" />
            <Steps.Step title="完成创建" description="创建成功" />
          </Steps>
          {
            defaultEntrepotHandle.loading ? <div className="flex gap-10">
              <Skeleton
                animation
                className='w-1/2'
                text={{ width: ['60%', '90%'], rows: 8 }}
              /><Skeleton
                animation
                className='w-1/2'
                text={{ width: ['60%', '90%'], rows: 8 }}
              />
            </div> : <><FilterForm
              form={ref1}
              initialValues={merge(
                {
                  sendWarehouse: defaultEntrepotHandle?.data?.id,
                },
                formData
              )}
              className={classNames(current !== 1 ? HideClass : '')}
              span={12}
              size="small"
              formItemConfigList={OrderCreateSchema1}
              onValuesChange={(val, vals) => {
                const data = ref1.getFieldsValue();
                setFormDataDebounce(merge(data, vals))
              }}
            >
            </FilterForm>
              <div className={classNames(current !== 2 ? HideClass : '')}>
                <Form.Provider
                  onFormValuesChange={async (name, changedValues, info) => {
                    const orderProductList = await Promise.all(
                      skuList.map((sku, index) =>
                        info.forms[`orderProductList[${index}]`].validate(),
                      ),
                    )
                    setFormDataDebounce({ orderProductList })
                  }}
                >
                  <div className="flex flex-col gap-4">
                    {skuList.map((item, index) => (
                      <Card
                        key={item._id}
                        bordered={true}
                        title={`SKU - ${index + 1}`}
                        hoverable={true}
                        extra={
                          skuList.length > 1 && (
                            <Space>
                              <PopconfirmDelete
                                onOk={() => {
                                  skuList.splice(index, 1)
                                  setFormDataDebounce({
                                    orderProductList:
                                      formData.orderProductList.filter(
                                        (_, i) => i !== index,
                                      ),
                                  })
                                  setSkuList([...skuList])
                                }}
                              >
                                <Button
                                  size="mini"
                                  icon={<IconDelete />}
                                  shape="circle"
                                  status="danger"
                                  style={{
                                    margin: '0 20px',
                                  }}
                                >
                                </Button>
                              </PopconfirmDelete>
                              {/* <Button
                            size="mini"
                            shape="circle"
                            // onClick={() =>
                            //   move(index, index > 0 ? index - 1 : index + 1)
                            // }
                          >
                            {index > 0 ? <IconArrowRise /> : <IconArrowFall />}
                          </Button> */}
                            </Space>
                          )
                        }
                      >
                        <FilterForm
                          initialValues={{ deliveryMethod: '0', ...formData.orderProductList?.[index] }}
                          id={`orderProductList[${index}]`}
                          span={12}
                          size="small"
                          formItemConfigList={OrderCreateSchema2}
                          ref={(el: FormInstance) => {
                            if (!el) {
                              skuRefs.current.splice(index, 1)
                            }
                            else {
                              skuRefs.current[index] = el
                            }
                          }}
                          // formItemConfigList={OrderCreateSchema2.map(oitem => ({
                          //   ...oitem,
                          //   schema: {
                          //     ...oitem.schema,
                          //     field: `orderProductList[${index}].${oitem.schema.field}`
                          //   }
                          // }))}
                          onValuesChange={(val, vals) => {
                            setFormDataDebounce(vals)
                          }}
                        >
                        </FilterForm>
                      </Card>
                    ))}
                    <Button
                      type="dashed"
                      status="success"
                      className="mt-4"
                      icon={<IconPlus />}
                      onClick={() => {
                        skuList.push({
                          _id: random(0, 999999),
                        })
                        setSkuList([...skuList])
                      }}
                    >
                      添加
                    </Button>
                  </div>
                </Form.Provider>
              </div>
              <FilterForm
                form={ref3}
                initialValues={formData}
                className={classNames(current !== 3 ? HideClass : '')}
                span={12}
                size="small"
                formItemConfigList={OrderCreateSchema3}
                onValuesChange={(val, vals) => {
                  const data = ref3.getFieldsValue();
                  setFormDataDebounce(merge(data, vals))
                }}
              >
              </FilterForm>
              {current === 4 && (
                <Result
                  status="success"
                  title={t['stepForm.created.success.title']}
                  subTitle="订单创建成功"
                  extra={[
                    <Button
                      key="reset"
                      style={{ marginRight: 16 }}
                      onClick={() => {
                        resetCreateForm()
                        setCurrent(1)
                      }}
                    >
                      继续创建
                    </Button>,
                    <Button
                      key="again"
                      type="primary"
                      onClick={() => {
                        history.push('/client/order/alreadyPacked')
                      }}
                    >
                      查看订单
                    </Button>,
                  ]}
                />
              )}
              <div className="flex justify-center gap-4 mt-12">
                {current > 1 && current < 4 && (
                  <Button size="large" onClick={() => setCurrent(current - 1)}>
                    上一步
                  </Button>
                )}
                {current < 3 && (
                  <Button type="primary" size="large" onClick={toNext}>
                    下一步
                  </Button>
                )}
                {current === 3 && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      createHandler.run()
                    }}
                    loading={createHandler.loading}
                  >
                    创建
                  </Button>
                )}
              </div></>
          }
        </div>
        {/* <div className={styles['form-extra']}>
          <Title heading={6}>手动创建订单说明</Title>
          <Paragraph type="secondary">
            {t['stepForm.created.extra.desc']}
            <Button type="text">{t['stepForm.created.extra.detail']}</Button>
          </Paragraph>
        </div> */}
      </Card>
    </div>
  )
}
