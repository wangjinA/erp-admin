import { Image, List, Switch } from '@arco-design/web-react'
import classNames from 'classnames'
import React, { useRef } from 'react'

import FilterForm from '../FilterForm'

import LabelValue from '../LabelValue'
import DictSelector from '../Selectors/DictSelector'

import styles from './index.module.less'

import { OrderResponseItem } from '@/types/order'

interface GoodsInfoProps {
  data: OrderResponseItem['orderProductVOList']
  isEdit?: boolean
  onChange?: (data) => void
}

export default (props: GoodsInfoProps) => {
  const { data, isEdit, onChange } = props
  const dataRef = useRef(data)

  return (
    <div
      style={{ height: 'max-content', overflow: 'hidden' }}
      className="arco-list-style"
    >
      <List
        className={classNames(styles['goods-info'])}
        dataSource={data || []}
        bordered={isEdit}
        render={(item, index) => (
          <div
            key={item.id}
            className={classNames([
              'grid',
              'h-[125px]',
              { 'grid-cols-2': isEdit },
              index > 0 ? 'border-t' : '',
            ])}
          >
            <List.Item.Meta
              className="!items-center p-2 w-full"
              avatar={<Image className="size-24" src={item.productImg[0]} />}
              title={item.productName}
              description={(
                <div>
                  <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="单  价" value={item.unitPrice}></LabelValue>
                  <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="数  量" value={item.quantity}></LabelValue>
                  <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="规格名称" value={item.specificationName}></LabelValue>
                  <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="规格SKU" value={item.sku}></LabelValue>
                </div>
              )}
            />
            {isEdit
              ? (
                  <div className="border-l pl-2">
                    <FilterForm
                      initialValues={item}
                      onChange={(_, v: any) => {
                        dataRef.current[index] = v
                        onChange?.(dataRef.current)
                      }}
                      formItemConfigList={[
                        {
                          schema: {
                            label: '发货方式',
                            field: 'deliveryMethod',
                            span: 16,
                          },
                          control: (
                            <DictSelector
                              dictCode="transport_type"
                              type="radio"
                            >
                            </DictSelector>
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
                          },
                          control: (
                            <Switch
                              checkedText="缺货打包"
                              uncheckedText="缺货打包"
                            >
                            </Switch>
                          ),
                        },
                        {
                          schema: {
                            label: '快递单号',
                            field: 'trackingNo',
                            span: 24,
                          },
                        },
                      ]}
                    >
                    </FilterForm>
                  </div>
                )
              : null}
          </div>
        )}
      />
    </div>
  )
}
