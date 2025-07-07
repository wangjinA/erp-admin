import {
  Button,
  Checkbox,
  Empty,
  Message,
  Modal,
  Pagination,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from '@arco-design/web-react'
import useForm from '@arco-design/web-react/es/Form/useForm'
import { IconEdit, IconPlus } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { PaginationResult } from 'ahooks/lib/usePagination/types'
import classNames from 'classnames'
import { isNil, merge, omit } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import OrderHeaderStatusInfo from './OrderHeaderStatusInfo'
import { TagColors } from '@/constants/colorMap'
import { useColumns } from './hooks'
import { orderAPI } from '@/api/client/order'
import { APIListResponse } from '@/api/type'
import FilterForm from '@/components/FilterForm'
import GoodsInfo from '@/components/GoodsInfo'
import { DictNameFC, } from '@/components/Selectors/DictSelector'
import { ShowFormType } from '@/constants'
import { EmitTypes, bus, useEventBus } from '@/hooks/useEventBus'
import { OrderCreateSchema2 } from '@/pages/client/order/create/schema'
import { isAdmin, isClient } from '@/routes'
import { StyleProps } from '@/types'
import { Order, OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'
import { useDefaultEntrepot } from '@/components/Selectors/EntrepotSelector'
import ClientHeaderActions from './ClientHeaderActions'
import { OrderPageDict } from '@/pages/client/order/orderPage'
import ShippingReceipt from '@/components/ShippingReceipt'

export interface OrderTablePorps extends StyleProps {
  // tableProps: TableProps;
  dictCode: OrderPageDict
  data?: APIListResponse<OrderResponseItem>['data']
  loading: boolean
  run: any
  pagination?: PaginationResult<
    APIListResponse<Order>['data'],
    any
  >['pagination']
  onSelect?: (ids: string[]) => void
}

export const labelClass = 'arco-descriptions-item-label !w-auto !pb-0'
export const valueClass = 'arco-descriptions-item-value !w-auto !pb-0'

const OrderTable: React.FC<OrderTablePorps> = (props) => {
  const { className, style, loading, data, dictCode, pagination, onSelect } = props

  const [currentOrder, setCurrentOrder] = useState<any>()
  const [selectList, setSelectList] = useState<string[]>([])

  const [actionType, setActionType] = useState<ShowFormType>()
  const [sheet, setSheet] = useState<any>()
  const showHeaderActions = isClient() && dictCode !== OrderPageDict.OUT_ORDER_STATUS
  const [form] = useForm()
  const [addForm] = useForm()

  const columns = useColumns(props)
  const updateHandle = useRequest(
    async (newSku?: any) => {
      const formData = merge(currentOrder, await form.validate())
      const data = omit(formData, [
        'orderProductVOList',
        'orderPackageList',
      ])
      if (isNil(data.sendWarehouse)) {
        Message.error('请选择打包仓库！')
        return;
      }
      let actionName = '打包'
      if (newSku) {
        actionName = '添加'
      }
      if (data.whetherPack && data.orderStatus !== '5') {
        actionName = '更新'
      }
      const updateData = {
        ...data,
        logisticsOrderProductList: [
          ...data.logisticsOrderProductList,
          ...(newSku ? [newSku] : []),
        ],
      };
      // debugger用
      // if(updateData.logisticsOrderProductList.some(o => !o.trackingNo)){
      //   console.log(updateData);
      // }
      await showMessage(
        () =>
          orderAPI.update(updateData),
        actionName,
      )
      setActionType(null)
      bus.emit(EmitTypes.refreshOrderPage)
    },
    {
      manual: true,
    },
  )

  const defaultEntrepotHandle = useDefaultEntrepot();

  const addProductHandle = useRequest(
    async () => {
      const formData = await addForm.validate()
      await showMessage(
        () =>
          orderAPI.addProduct({
            ...formData,
          }),
        '添加',
      )
      setActionType(null)
      bus.emit(EmitTypes.refreshOrderPage)
    },
    {
      manual: true,
    },
  )

  useEventBus(EmitTypes.clearSelectOrderList, () => {
    setSelectList([])
  })

  useEffect(() => {
    onSelect?.(selectList)
  }, [selectList])

  const isSelectAll = useMemo(() => {
    if (selectList.length === data?.list?.length) {
      return true
    }
  }, [selectList, data?.list])

  return (
    <div className={className} style={style}>
      <div>
        <header className="flex items-center">
          {onSelect
            ? (
              <Checkbox
                disabled={!data?.list?.length}
                className="mr-2 pl-[10px]"
                checked={isSelectAll}
                onChange={(checked) => {
                  if (checked) {
                    setSelectList(data?.list?.map(item => item.id))
                  }
                  else {
                    setSelectList([])
                  }
                }}
              >
              </Checkbox>
            )
            : null}
          {columns.map(item => (
            <div
              className="font-medium px-4 py-2"
              style={{
                width: item.width,
                flex: item.width ? 'auto' : 1,
              }}
              key={item.dataIndex}
            >
              {item.title}
            </div>
          ))}
        </header>
        <Spin className="block text-center" loading={loading}>
          <main className="flex flex-col gap-4 bg-white text-left">
            {data?.list?.map((item) => {
              return (
                <div className="border relative" key={item.id}>
                  {
                    showHeaderActions
                      ? <ClientHeaderActions item={item} setActionType={setActionType} setCurrentOrder={setCurrentOrder} />
                      : null
                  }
                  <header className="gap-12 pl-1 pr-4 py-2 border-b flex">
                    <div className="flex w-[420px] items-baseline">
                      {onSelect
                        ? (
                          <Checkbox
                            checked={selectList.includes(item.id)}
                            onChange={(checked) => {
                              if (checked) {
                                setSelectList([...selectList, item.id])
                              }
                              else {
                                setSelectList(selectList.filter(id => id !== item.id))
                              }
                            }}
                          />
                        )
                        : null}
                      <Tooltip content="打包订单状态">
                        <Tag
                          bordered
                          size="small"
                          className="mx-2"
                          color={TagColors[Number(item.orderStatus)]}
                        >
                          <DictNameFC defaultValue='待打包' dictCode={'order_status'} value={item.orderStatus} />
                        </Tag>
                      </Tooltip>
                      {
                        (item.abeyanceStatus && isAdmin()) ? <Tag className="mr-2" color='red'>异常搁置</Tag> : null
                      }
                      <span className={labelClass}>订单编号：</span>
                      <span className={classNames(valueClass, 'truncate')}>
                        <Typography.Text copyable>
                          {item.shrimpOrderNo}
                        </Typography.Text>
                      </span>
                    </div>
                    <OrderHeaderStatusInfo data={item}></OrderHeaderStatusInfo>
                  </header>
                  <main className="flex p-1">
                    {columns.map(oitem => (
                      <div
                        style={{
                          width: oitem.width,
                          flex: oitem.width ? 'auto' : 1,
                        }}
                        key={oitem.dataIndex}
                      >
                        {oitem.render(item[oitem.dataIndex], item)}
                      </div>
                    ))}
                  </main>
                  <footer className="flex border-t py-2 px-4">
                    <div className="gap-12 grid grid-cols-[200px_280px]">
                      <div>
                        <span className={labelClass}>下单：</span>
                        <span className={valueClass}>{item.orderTime || '-'}</span>
                      </div>
                      {item.packTime
                        ? (
                          <div>
                            <span className={labelClass}>提交：</span>
                            <span className={valueClass}>{item.packTime || '-'}</span>
                          </div>
                        )
                        : null}
                      {/* <div>
                    <span className={labelClass}>最后发货时间：</span>
                    <span className={valueClass}>{item.createTime || '-'}</span>
                  </div> */}
                    </div>
                    <div className="ml-auto flex">
                      <span className={labelClass}>我的备注：</span>
                      <span className={valueClass}>
                        {(isClient() ? item.remark : item.entrepotRemark) || '暂无'}
                      </span>
                      {
                        isClient() ? <Button
                          type="text"
                          size="mini"
                          onClick={() => {
                            if (item?.sendWarehouse === '0') {
                              delete item.sendWarehouse
                            }
                            setCurrentOrder({
                              ...item,
                              logisticsOrderProductList: item.orderProductVOList,
                            })
                            setActionType(ShowFormType.edit)
                          }}
                        >
                          <IconEdit />
                        </Button> : null
                      }
                    </div>
                  </footer>
                  {(item.isOverseasWarehouseReturn || item.isReissued) ? <ShippingReceipt color={item.isReissued ? 'green': 'red'}>
                    {
                      item.isReissued ?
                        '换单重出'
                        : (item.returnStatus === '2' ? '退件入库(销毁)' : '已退件入库')
                    }
                  </ShippingReceipt> : null}
                </div>
              )
            })}
          </main>
        </Spin>
        {data?.list?.length
          ? (
            <Pagination
              className="mt-4 flex justify-end"
              total={data?.total}
              showTotal={true}
              sizeCanChange={true}
              current={pagination?.current || 1}
              pageSize={pagination?.pageSize}
              sizeOptions={[10, 20, 30, 40, 50, 100,]}
              onChange={(pageNumber: number, pageSize: number) => {
                console.log(pageNumber, pageSize, pagination);
                if (pagination) {
                  if (pageNumber !== pagination.current) {
                    pagination.changeCurrent(pageNumber)
                  } else {
                    pagination.changePageSize(pageSize)
                  }
                } else {
                  pagination.changeCurrent(pageNumber)
                  pagination.changePageSize(pageSize)
                }
              }}
            >
            </Pagination>
          )
          : null}
        {(!data?.list?.length && !loading) ? <Empty className="py-28"></Empty> : null}
      </div>
      <Modal
        title="添加商品"
        visible={actionType === ShowFormType.create}
        onCancel={() => {
          addForm.resetFields()
          setActionType(null)
        }}
        unmountOnExit={true}
        confirmLoading={addProductHandle.loading}
        onOk={async () => {
          addProductHandle.run()
          addForm.resetFields()
        }}
      >
        <FilterForm
          span={24}
          form={addForm}
          initialValues={{
            // extraStatus: true,
            orderId: currentOrder?.id,
            quantity: 1,
          }}
          formItemConfigList={[
            ...OrderCreateSchema2.filter(
              item => !['trackingNo'].includes(item.schema.field),
            ),
            // {
            //   schema: {
            //     field: 'extraStatus',
            //   },
            //   formItemProps: {
            //     hidden: true,
            //   },
            // },
            {
              schema: {
                field: 'orderId',
              },
              formItemProps: {
                hidden: true,
              },
            },
          ]}
        >
        </FilterForm>
      </Modal>
      <Modal
        title="查看面单"
        visible={sheet}
        onCancel={() => setSheet(null)}
        unmountOnExit={true}
        onOk={async () => {
          setSheet(null)
        }}
      >
        面单信息，开发中...
      </Modal>
      <Modal
        style={{
          width: 870,
        }}
        title="编辑订单"
        visible={actionType === ShowFormType.edit}
        onCancel={() => setActionType(null)}
        confirmLoading={updateHandle.loading}
        unmountOnExit={true}
        onOk={async () => {
          updateHandle.run()
        }}
      >
        {actionType === ShowFormType.edit ? (
          <>
            <FilterForm
              span={24}
              form={form}
              initialValues={{
                ...currentOrder,
                sendWarehouse: currentOrder?.sendWarehouse || defaultEntrepotHandle?.data?.id,
                transportType: currentOrder?.transportType || 'KY',
              }}
              className="mb-4"
              formItemConfigList={[
                {
                  schema: {
                    field: 'sendWarehouse',
                    label: '打包仓库',
                    required: true,
                  },
                  formItemProps: {
                    // disabled: true,
                  },
                  control: 'entrepotSelector',
                },
                {
                  schema: {
                    field: 'transportType',
                    label: '运输类型',
                    required: true,
                  },
                  control: 'dictSelector',
                  controlProps: {
                    dictCode: 'transport_type',
                    type: 'radio',
                  },
                },
                {
                  schema: {
                    field: 'remark',
                    label: '备注',
                  },
                  control: 'textarea',
                  controlProps: {
                    placeholder: '请输入备注，此备注仓库可见',
                  },
                },
              ]}
              onChange={async (_, v) => {
                const formData = await form.validate();
                setCurrentOrder({
                  ...currentOrder,
                  ...formData,
                })
              }}
            >
            </FilterForm>
            <GoodsInfo
              data={currentOrder?.orderProductVOList}
              isEdit={true}
              onChange={(e) => {
                setCurrentOrder({
                  ...currentOrder,
                  logisticsOrderProductList: e.map(o => omit({
                    ...o,
                    trackingNo: o.trackingNo ? o.trackingNo.trim() : null,
                    productInventoryVO: {
                      stockProductId: o.productInventoryVO?.[0]?.id,
                      number: o.productInventoryVO?.[0]?.useAbleQuantityChange,
                    }
                  }, o.stockOutStatus ? ['productInventoryVO', 'trackingNo'] : [])),
                })
              }}
            >
            </GoodsInfo>
            <Button
              className="mt-4"
              type="outline"
              long={true}
              icon={<IconPlus></IconPlus>}
              onClick={() => {
                setActionType(ShowFormType.create)
              }}
            >
              添加商品
            </Button>
          </>
        ) : null}
      </Modal>
    </div>
  )
}

export default OrderTable
