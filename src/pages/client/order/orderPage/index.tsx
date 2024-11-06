import {
  Badge,
  Button,
  Form,
  Message,
  Space,
  Tabs,
  Tag,
} from '@arco-design/web-react'
import { IconExport, IconRefresh, IconSearch } from '@arco-design/web-react/icon'
import { useLocalStorageState, usePagination, useRequest, useResetState } from 'ahooks'
import dayjs from 'dayjs'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { getOrderFilter } from './schema'

import { scanAPI } from '@/api/admin/entrepot'
import { orderAPI as adminOrderApi } from '@/api/admin/order'
import { orderAPI } from '@/api/client/order'
import FilterForm from '@/components/FilterForm'

import { useDictOptions } from '@/components/Selectors/DictSelector'
import { useShopOptions } from '@/components/Selectors/ShopRadio'
import { EmitTypes, bus, useEventBus } from '@/hooks/useEventBus'
import OrderTable from '@/pages/admin/components/OrderTable'
import RefreshButton from '@/pages/admin/components/OrderTable/RefreshButton'
import { isAdmin } from '@/routes'
import { showMessage, showModal, timeArrToObject } from '@/utils'

export enum OrderPageType {
  SHOPEE = 'shopee',
  PACK_ORDER = 'pack_order',
}

export interface OrderPageProps {
  dictCode?: 'shopee_status' | 'order_status'
  type: OrderPageType
}

export default (props: OrderPageProps) => {
  const { type } = props
  const dictCode = {
    shopee: 'shopee_status',
    pack_order: 'order_status',
  }[type]
  const [activeTab, setActiveTab] = useLocalStorageState<string>(location.pathname)
  const [countMap, setCountMap] = useState<Record<string, number>>()
  const [selectIds, setSelectIds] = useState([])
  const [formData, _setFormData, restFormData] = useResetState<any>({
    selectLogisticsOrderVO: {},
    selectOrderProductVO: {},
    trackingNumber: '',
  })
  const [filterForm] = Form.useForm()

  const shopOptions = useShopOptions()

  function setFormData(values) {
    _setFormData({
      ...formData,
      ...values,
    })
  }
  const { data: shrimpStatus } = useDictOptions({
    dictCode,
    displayName: '',
  })
  if (activeTab === undefined && shrimpStatus?.length) {
    setActiveTab(shrimpStatus[0]?.value)
  }

  const { data, run, pagination, loading, refresh } = usePagination(
    async (params) => {
      bus.emit(EmitTypes.clearSelectOrderList)
      if (!shrimpStatus?.length) {
        return null
      }
      const body = {
        ...formData,
        selectOrderProductVO: {
          ...formData.selectOrderProductVO,
        },
        selectLogisticsOrderVO: {
          ...formData.selectLogisticsOrderVO,
          ...timeArrToObject(formData.selectLogisticsOrderVO.packTimes, 'packStartTime', 'packEndTime'),
          ...timeArrToObject(
            formData.selectLogisticsOrderVO.stockRemovalTimes,
            'stockRemovalStartTime',
            'stockRemovalEndTime',
          ),
          orderStatus: type === OrderPageType.PACK_ORDER ? activeTab : undefined,
          ...(type === OrderPageType.SHOPEE
            ? {
                shrimpStatus: activeTab,
                storeFlag: true,
              }
            : {
                whetherPack: true,
              }),
        },
        pageNum: params?.current || pagination.current,
        pageSize: params?.pageSize || pagination.pageSize,
      }
      const res = await orderAPI.getList(body)
      if (type === OrderPageType.PACK_ORDER) {
        orderAPI.getPackCount({
          ...omit(body, ['selectLogisticsOrderVO']),
          selectLogisticsOrderVO: {
            ...omit(body.selectLogisticsOrderVO, ['orderStatus']),
          } as any,
        }).then((res) => {
          setCountMap(res.data.data)
        })
      }
      else {
        const p = {
          ...omit(body, ['selectLogisticsOrderVO']),
          selectLogisticsOrderVO: {
            ...omit(body.selectLogisticsOrderVO, ['shrimpStatus']),
          },
        }
        orderAPI.getShopOrderCount(p).then((res) => {
          setCountMap(res.data.data)
        })
      }

      return res.data.data
    },
    {
      defaultPageSize: 10,
      defaultCurrent: 1,
      manual: false,
      refreshDeps: [activeTab, shrimpStatus],
    },
  )

  const outListHandle = useRequest(async () => {
    await showMessage(() => scanAPI.outList({
      orderIdList: selectIds,
    }), '出库')
    refresh()
  }, {
    manual: true,
  })

  const cancelListHandle = useRequest(async () => {
    await showMessage(() => adminOrderApi.cancel(selectIds), '取消')
    refresh()
  }, {
    manual: true,
  })

  useEventBus(EmitTypes.refreshOrderPage, () => {
    refresh()
  })

  const syncOrderHandle = useRequest(async () => {
    if (!shopOptions.data?.length) {
      return Message.error('未获取到店铺信息')
    }
    await showMessage(() => orderAPI.syncOrder({
      orderUpdateStartTime: dayjs().subtract(15, 'day').format('YYYY-MM-DD HH:mm:ss'),
      orderUpdateEndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      storeId: shopOptions.data.map(item => item.value),
    }), '同步订单')
  }, {
    manual: true,
  })

  return (
    <div className="bg-white p-4">
      <FilterForm
        form={filterForm}
        size="small"
        formItemConfigList={getOrderFilter({ type })}
        onValuesChange={(val, values) => {
          setFormData(values)
          // console.log(...e);
        }}
        onSubmit={(e) => {
          console.log(e)
        }}
      >
      </FilterForm>
      <div className="flex justify-between py-6 pr-2">
        <Space size={8}>
          {
            isAdmin()
              ? (
                  <>
                    <Button
                      type="outline"
                      icon={<IconExport />}
                      onClick={() => {
                        Message.error('开发中...')
                      }}
                    >
                      导出数据
                    </Button>
                    <Button
                      type="outline"
                      status="warning"
                      loading={cancelListHandle.loading}
                      onClick={async () => {
                        if (!selectIds.length) {
                          return Message.error('请选择订单')
                        }
                        await showModal({
                          content: `确认取消选中的${selectIds.length}个订单？`,
                        })
                        cancelListHandle.run()
                      }}
                    >
                      批量取消订单
                    </Button>
                    <Button
                      type="outline"
                      onClick={() => {
                        if (!selectIds.length) {
                          return Message.error('请选择订单')
                        }
                        Message.error('开发中...')
                      }}
                    >
                      批量申请运单号
                    </Button>
                    <RefreshButton
                      ids={selectIds}
                      buttonProps={{
                        type: 'outline',
                        status: 'default',
                      }}
                    >
                      批量更新订单
                    </RefreshButton>
                    {/* <Button
                      type="outline"
                      onClick={() => {
                        if (!selectIds.length) {
                          return Message.error('请选择订单')
                        }
                      }}
                    >
                      批量更新订单
                    </Button> */}
                    <Button
                      type="outline"
                      onClick={() => {
                        Message.error('开发中...')
                      }}
                    >
                      下载全部面单
                    </Button>
                    <Button
                      type="outline"
                      loading={outListHandle.loading}
                      onClick={async () => {
                        if (!selectIds.length) {
                          return Message.error('请选择订单')
                        }
                        await showModal({
                          content: `确定出库 ${selectIds.length} 个订单？`,
                          okButtonProps: {
                            status: 'success',
                          },
                        })

                        outListHandle.run()
                      }}
                    >
                      批量出库
                    </Button>
                  </>
                )
              : (
                  <>
                    <Button
                      type="outline"
                      icon={<IconExport />}
                      loading={syncOrderHandle.loading}
                      onClick={() => {
                        syncOrderHandle.run()
                      }}
                    >
                      同步订单
                    </Button>
                    <Button
                      type="outline"
                      icon={<IconExport />}
                      onClick={() => {
                        Message.error('开发中...')
                      }}
                    >
                      导出订单
                    </Button>
                  </>
                )
          }
          {selectIds.length
            ? (
                <Tag checked={true} color="pinkpurple">
                  已选中
                  {' '}
                  {selectIds.length}
                  {' '}
                  个订单
                </Tag>
              )
            : null}
        </Space>

        <Space size={20}>
          <Button
            type="default"
            loading={loading}
            icon={<IconRefresh />}
            onClick={() => {
              filterForm.resetFields()
              restFormData()
              setTimeout(() => {
                pagination.changeCurrent(1)
              }, 0)
            }}
          >
            重置
          </Button>
          <Button
            type="primary"
            icon={<IconSearch />}
            loading={loading}
            onClick={() =>
              run({
                current: 1,
                pageSize: 10,
              })}
          >
            查询
          </Button>
        </Space>
      </div>
      <Tabs
        lazyload={true}
        className="mb-4"
        activeTab={activeTab}
        onChange={v => setActiveTab(v)}
      >
        {shrimpStatus?.map((x, i) => (
          <Tabs.TabPane
            key={x.value}
            title={
              <Badge offset={[13, -5]} count={countMap?.[x.value]}><span>{x.label}</span></Badge>
            }
          >
          </Tabs.TabPane>
        ))}
      </Tabs>
      <OrderTable
        dictCode={dictCode}
        run={run}
        data={data}
        loading={loading}
        pagination={pagination}
        onSelect={(ids) => {
          setSelectIds(ids)
        }}
      >
      </OrderTable>
    </div>
  )
}
