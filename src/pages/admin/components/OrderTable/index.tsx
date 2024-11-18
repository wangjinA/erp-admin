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
} from '@arco-design/web-react'

import useForm from '@arco-design/web-react/es/Form/useForm'
import { IconEdit, IconPlus } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { PaginationResult } from 'ahooks/lib/usePagination/types'

import classNames from 'classnames'
import { omit } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'

import ActionHistory from './ActionHistory'
import ExpressSheetButton from './ExpressSheetButton'
import OrderHeaderStatusInfo from './OrderHeaderStatusInfo'
import RefreshButton from './RefreshButton'
import { TagColors } from './SendCargoInfo'
import { useColumns } from './hooks'

import { orderAPI } from '@/api/client/order'
import { APIListResponse } from '@/api/type'
import FilterForm from '@/components/FilterForm'
import GoodsInfo from '@/components/GoodsInfo'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import DictSelector, {
  useDictOptions,
} from '@/components/Selectors/DictSelector'
import EntrepotSelector from '@/components/Selectors/EntrepotSelector'
import { ShowFormType } from '@/constants'
import { EmitTypes, bus, useEventBus } from '@/hooks/useEventBus'
import { OrderCreateSchema2 } from '@/pages/client/order/create/schema'
import { isClient } from '@/routes'
import { StyleProps } from '@/types'
import { Order, OrderResponseItem } from '@/types/order'
import { showMessage, showModal } from '@/utils'

export interface OrderTablePorps extends StyleProps {
  // tableProps: TableProps;
  dictCode: any
  data?: APIListResponse<OrderResponseItem>['data']
  loading: boolean
  run: any
  pagination: PaginationResult<
    APIListResponse<Order>['data'],
    any
  >['pagination']
  onSelect?: (ids: number[]) => void
}

export const labelClass = 'arco-descriptions-item-label w-auto pb-0'
export const valueClass = 'arco-descriptions-item-value w-auto pb-0'

const OrderTable: React.FC<OrderTablePorps> = (props) => {
  const { className, style, dictCode, loading, run, data, pagination, onSelect } = props

  const [record, setRecord] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<any>()
  const [selectList, setSelectList] = useState<number[]>([])

  const [actionType, setActionType] = useState<ShowFormType>()
  const [sheet, setSheet] = useState<any>()
  const showHeaderActions = isClient()
  const [form] = useForm()
  const [addForm] = useForm()

  const columns = useColumns(props)
  const refreshHandle = useRequest(
    async (id) => {
      await showMessage(() => orderAPI.refresh(id))
    },
    {
      manual: true,
    },
  )
  const updateHandle = useRequest(
    async (newSku?: any) => {
      const data = omit(currentOrder, [
        'orderProductVOList',
        'orderPackageList',
      ])
      await showMessage(
        () =>
          orderAPI.update({
            ...data,
            logisticsOrderProductList: [
              ...data.logisticsOrderProductList,
              ...(newSku ? [newSku] : []),
            ],
          }),
        newSku ? '添加' : '打包',
      )
      setActionType(null)
      bus.emit(EmitTypes.refreshOrderPage)
    },
    {
      manual: true,
    },
  )

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

  const { data: orderStatusOptions } = useDictOptions({
    dictCode: 'order_status',
  })

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
              const orderStatusText = orderStatusOptions?.find(
                oitem => oitem.value === item.orderStatus,
              )?.label || '无'
              return (
                <div className="border" key={item.id}>
                  {
                    showHeaderActions
                      ? (
                          <header className="flex items-center p-2 border-b">
                            <Button.Group>
                              <Button
                                disabled={item.orderStatus && !['0', '1', '2'].includes(item.orderStatus)}
                                onClick={() => {
                                  setActionType(ShowFormType.edit)
                                  setCurrentOrder(structuredClone({
                                    ...item,
                                    clickPack: item.orderStatus === '5' || !item.whetherPack,
                                    logisticsOrderProductList: item.orderProductVOList,
                                    sendWarehouse: item.sendWarehouse === '0' ? undefined : item.sendWarehouse,
                                  }))
                                }}
                              >
                                {item.whetherPack && item.orderStatus !== '5' ? '编辑打包' : '一键打包'}
                              </Button>
                              <Button
                                disabled={!['0'].includes(item.orderStatus)}
                                onClick={async () => {
                                  await showModal({
                                    content: '确定要取消打包吗？',
                                  })
                                  await showMessage(
                                    () => orderAPI.cancelPack(item.id),
                                    '取消打包',
                                  )
                                  bus.emit(EmitTypes.refreshOrderPage)
                                }}
                              >
                                取消打包
                              </Button>
                              <ExpressSheetButton orderItem={item} buttonProps={{}}></ExpressSheetButton>
                              {/* <Button
                                loading={refreshHandle.loading}
                                onClick={() => {
                                  refreshHandle.run(item.id)
                                }}
                              >
                                更新订单
                              </Button> */}
                              <RefreshButton
                                buttonProps={{
                                  type: 'default',
                                  status: 'default',
                                }}
                                ids={[item.id]}
                              >
                              </RefreshButton>
                              {/* <Button>发货预报</Button> */}
                              {/* <Button>订单收入</Button> */}
                              {/* <Button>隔离订单</Button> */}
                              <Button
                                onClick={() => {
                                  setCurrentOrder({
                                    ...item,
                                    logisticsOrderProductList: item.orderProductVOList,
                                  })
                                  setActionType(ShowFormType.create)
                                }}
                              >
                                添加商品
                              </Button>
                              {/* <Button>打印出货单</Button> */}
                              <Button
                                onClick={() => {
                                  showModal({
                                    content: '确定要申请预刷吗?',
                                    okButtonProps: {
                                      status: 'default',
                                    },
                                  }).then(() => {
                                    Message.success('预刷成功！')
                                  })
                                }}
                              >
                                申请预刷
                              </Button>
                              <ActionHistory id={item.id}></ActionHistory>
                              <PopconfirmDelete
                                title="删除订单"
                                content="确认删除订单？操作不可逆！"
                                isModal={true}
                                onOk={async () => {
                                  await showMessage(() => orderAPI.remove(item.id))
                                  run()
                                }}
                              >
                              </PopconfirmDelete>
                            </Button.Group>
                            {/* <div className="flex items-center ml-auto">
                <span className={labelClass}>订单编号：</span>
                <span className={valueClass}>{item.shrimpOrderNo}</span>
                <Button size="mini" type="text">
                  查看详情
                </Button>
              </div> */}
                          </header>
                        )
                      : null
                  }
                  <header className="gap-12 pl-1 pr-4 py-2 border-b grid grid-cols-[340px_240px_600px_1fr]">
                    <div className="flex">
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
                          {orderStatusText}
                        </Tag>
                      </Tooltip>
                      <span className={labelClass}>订单编号：</span>
                      <span className={classNames(valueClass, 'truncate')}>{item.shrimpOrderNo}</span>
                    </div>
                    <OrderHeaderStatusInfo data={item}></OrderHeaderStatusInfo>
                  </header>
                  <main className="flex p-4">
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
                    <div className="gap-12 grid grid-cols-[240px_280px]">
                      <div>
                        <span className={labelClass}>创建时间：</span>
                        <span className={valueClass}>{item.createTime || '-'}</span>
                      </div>
                      {/* <div>
                    <span className={labelClass}>最后发货时间：</span>
                    <span className={valueClass}>{item.createTime || '-'}</span>
                  </div> */}
                    </div>
                    <div className="ml-auto">
                      <span className={labelClass}>备注：</span>
                      <span className={valueClass}>
                        {(isClient() ? item.remark : item.entrepotRemark) || '暂无'}
                      </span>
                      <Button
                        type="text"
                        size="mini"
                        onClick={() => {
                          setCurrentOrder({
                            ...item,
                            logisticsOrderProductList: item.orderProductVOList,
                          })
                        }}
                      >
                        <IconEdit />
                      </Button>
                    </div>
                  </footer>
                </div>
              )
            },

            )}
          </main>
        </Spin>
        {data?.list?.length
          ? (
              <Pagination
                className="mt-4 flex justify-end"
                total={data?.total}
                onChange={(pageNumber: number, pageSize: number) => {
                  pagination.changePageSize(pageSize)
                  pagination.changeCurrent(pageNumber)
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
        <FilterForm
          span={24}
          form={form}
          initialValues={currentOrder}
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
              control: <EntrepotSelector></EntrepotSelector>,
            },
            {
              schema: {
                field: 'transportType',
                label: '运输类型',
              },
              control: (
                <DictSelector
                  type="radio"
                  dictCode="transport_type"
                >
                </DictSelector>
              ),
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
          onChange={(_, v) => {
            setCurrentOrder({
              ...currentOrder,
              ...v,
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
              logisticsOrderProductList: e,
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
      </Modal>
    </div>
  )
}

export default OrderTable
