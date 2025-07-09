import { List, Space, Image, Form, Input, FormInstance } from '@arco-design/web-react'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import CopyText from '../CopyText'
import FilterForm from '../FilterForm'
import LabelValue from '../LabelValue'
import styles from './index.module.less'
import { OrderResponseItem } from '@/types/order'
import ProductStockSelector from '../Selectors/ProductStockSelector'
import DictSelector from '../Selectors/DictSelector'

interface GoodsInfoProps {
  data: OrderResponseItem['orderProductVOList']
  isEdit?: boolean
  onChange?: (data) => void
}

export default (props: GoodsInfoProps) => {
  const { data, isEdit, onChange } = props
  const dataRef = useRef(data)
  const [searchValue, setSearchValue] = useState('')
  const refs = useRef<FormInstance<any>[]>([])
  return (
    <div className={classNames('arco-list-style', "h-max overflow-hidden")}>
      {
        (isEdit && data.length > 1) ? <header className="flex">
          <Input.Search
            className="w-1/2 ml-auto mb-2"
            value={searchValue}
            onChange={setSearchValue}
            placeholder='请输入快递单号'
            searchButton="批量更新"
            allowClear={true}
            onSearch={e => {
              if (e) {
                refs.current.forEach((ref, index) => {
                  ref.setFieldValue('trackingNo', e)
                  dataRef.current[index].trackingNo = e
                })
                onChange?.(dataRef.current)
                setSearchValue('')
              }
            }}></Input.Search>
        </header> : null
      }
      <List
        className={classNames(styles['goods-info'])}
        dataSource={data || []}
        bordered={isEdit}
        render={(item, index) => (
          <div
            key={item.id}
            className={classNames([
              'grid h-[105px] overflow-hidden',
              { 'grid-cols-2': isEdit },
              index > 0 ? 'border-t' : '',
            ])}
          >
            <div className="p-2 w-full flex items-start">
              <Image
                className="goods-image-main size-24"
                src={item.productImg?.[0]}
                alt='速运宝'
                preview
              />
              <div className="ml-2 flex-1 w-0">
                <div className="truncate">{item.productName}</div>
                <div className="text-sm text-gray-500">
                  <Space size={30}>
                    <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="单  价" value={item.unitPrice}></LabelValue>
                    <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="数  量" value={item.quantity > 1 ? <span className="text-red-500 font-bold">{item.quantity}</span> : item.quantity}></LabelValue>
                  </Space>
                  <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="规格名称" value={item.specificationName}></LabelValue>
                  <LabelValue
                    className="!mb-0"
                    labelClassName="!text-sm !pr-1 !align-baseline"
                    valueClassName="!text-sm"
                    label="规格SKU"
                    value={(
                      <CopyText value={item.sku}>
                        {item.sku}
                      </CopyText>
                    )}
                  >
                  </LabelValue>
                </div>
              </div>
            </div>
            {isEdit
              ? <>
                <div className="border-l pl-2 pt-2">
                  <FilterForm
                    ref={(el: FormInstance) => {
                      if (!el) {
                        refs.current.splice(index, 1)
                      }
                      else {
                        refs.current[index] = el
                      }
                    }}
                    gutter={[0, 0]}
                    initialValues={{
                      ...item,
                      deliveryMethod: item.deliveryMethod || '0',
                      productInventoryVO: item.logisticsProduct ? [{
                        ...item,
                        useAbleQuantityChange: item.stockUse,
                      }]: []
                    }}
                    onChange={(_, v: any) => {
                      dataRef.current[index] = v
                      onChange?.(dataRef.current)
                    }}
                    formItemConfigList={[
                      {
                        schema: {
                          label: '发货方式',
                          field: 'ccc',
                          span: 16,
                          required: true,
                        },
                        formItemProps: {
                          noStyle: true,
                        },
                        control: (
                          <Form.Item noStyle={true} shouldUpdate={(a, b) => a.menuType !== b.menuType}>
                            {(values) => {
                              // console.log(values);
                              return (
                                <Form.Item disabled={values.stockOutStatus} className="!mb-0" field="deliveryMethod" label="发货方式" colon>
                                  <DictSelector type="radio" dictCode='delivery_method'></DictSelector>
                                </Form.Item>
                              )
                            }}
                          </Form.Item>
                        ),
                      },
                      {
                        schema: {
                          label: '',
                          field: 'stockOutStatus',
                          span: 8,
                        },
                        formItemProps: {
                          triggerPropName: 'checked',
                          className: "!mb-0"
                        },
                        control: 'switch',
                        controlProps: {
                          checkedText: '缺货打包',
                          uncheckedText: '缺货打包',
                        },
                      },
                      {
                        schema: {
                          label: ' ',
                          field: 'dddddd',
                          span: 24,
                        },
                        formItemProps: {
                          noStyle: true,
                        },
                        control: (
                          <Form.Item noStyle={true} shouldUpdate={(a, b) => a.menuType !== b.menuType}>
                            {(values) => {
                              if (values.deliveryMethod === '0') {
                                return (
                                  <Form.Item disabled={values.stockOutStatus} className="mt-4" field="trackingNo" label="快递单号" colon>
                                    <Input placeholder='请输入快递单号' allowClear></Input>
                                  </Form.Item>
                                )
                              } else {
                                return <Form.Item disabled={values.stockOutStatus} field="productInventoryVO" label="">
                                  <ProductStockSelector stockNum={item.quantity} className={classNames(!values.productInventoryVO?.length ? 'mt-4' : '-mt-[6px]')}></ProductStockSelector>
                                </Form.Item>
                              }
                            }}
                          </Form.Item>
                        ),
                      },
                    ]}
                  >
                  </FilterForm>
                </div>
              </>
              : null}
          </div>
        )}
      />
    </div>
  )
}
