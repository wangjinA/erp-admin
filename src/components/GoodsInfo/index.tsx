import { List, Space, Image } from '@arco-design/web-react'
import classNames from 'classnames'
import React, { useRef } from 'react'

import CopyText from '../CopyText'
import FilterForm from '../FilterForm'

import LabelValue from '../LabelValue'

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
              'grid h-[105px] overflow-hidden',
              { 'grid-cols-2': isEdit },
              index > 0 ? 'border-t' : '',
            ])}
          >
            <div className="p-2 w-full flex items-start">
              <Image
                className="goods-image-main size-24"
                src={item.productImgCos?.[0] || item.productImg?.[0]}
                alt='速运宝'
                preview
              />
              <div className="ml-2 flex-1 w-0">
                <div className="truncate">{item.productName}</div>
                <div className="text-sm text-gray-500">
                  <Space size={30}>
                    <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="单  价" value={item.unitPrice}></LabelValue>
                    <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="数  量" value={item.quantity}></LabelValue>
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
              ? (
                <div className="border-l pl-2 pt-2">
                  <FilterForm
                    initialValues={{
                      ...item,
                      deliveryMethod: item.deliveryMethod || '0',
                    }}
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
                          required: true,
                        },
                        control: 'dictSelector',
                        controlProps: {
                          dictCode: 'delivery_method',
                          type: 'radio',
                        },
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
                        control: 'switch',
                        controlProps: {
                          checkedText: '缺货打包',
                          uncheckedText: '缺货打包',
                        },
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
