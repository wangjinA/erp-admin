import {
  Badge,
  Button,
  Form,
  Message,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Tabs,
  Tag,
} from '@arco-design/web-react'
import { IconExport, IconRefresh, IconSearch } from '@arco-design/web-react/icon'
import { useLocalStorageState, usePagination, useRequest, useResetState } from 'ahooks'
import { omit, uniq } from 'lodash'
import { useState } from 'react'

import { getOrderFilter } from './schema'
import { saveAs } from 'file-saver'
import { entrepotAPI, scanAPI } from '@/api/admin/entrepot'
import { orderAPI as adminOrderApi } from '@/api/admin/order'
import { orderAPI } from '@/api/client/order'
import FilterForm from '@/components/FilterForm'

import { useDictOptions } from '@/components/Selectors/DictSelector'
import { batchApplyShippingCarrierList, OrderStatus, SystemName } from '@/constants/order'
import { EmitTypes, bus, useEventBus } from '@/hooks/useEventBus'
import OrderTable from '@/pages/admin/components/OrderTable'
import RefreshButton from '@/pages/admin/components/OrderTable/RefreshButton'
import SyncOrderButton from '@/pages/admin/components/OrderTable/SyncOrderButton'
import { isAdmin } from '@/routes'
import { showMessage, showModal, timeArrToObject } from '@/utils'
import dayjs from 'dayjs'

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
  const [sortType, setSortType] = useState(1)
  const [formData, _setFormData, restFormData] = useResetState<any>({
    selectLogisticsOrderVO: {},
    selectOrderProductVO: {},
    trackingNumber: '',
  })
  const [filterForm] = Form.useForm()

  // const shopOptions = useShopOptions()

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

  // 页面查询通用参数
  function getPageQuery(otherQuery: any = {}) {
    const { selectLogisticsOrderVO = {}, ...other } = otherQuery
    return {
      ...formData,
      selectOrderProductVO: {
        ...formData.selectOrderProductVO,
      },
      selectLogisticsOrderVO: {
        sortType,
        ...omit(formData.selectLogisticsOrderVO, ['createdTimes', 'stockRemovalTimes', 'packTimes']),
        ...timeArrToObject(formData.selectLogisticsOrderVO.packTimes, 'packStartTime', 'packEndTime'),
        ...timeArrToObject(formData.selectLogisticsOrderVO.createdTimes, 'createStartTime', 'createEndTime'),
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
        ...selectLogisticsOrderVO
      },
      ...other,
    }
  }

  const { data, run, pagination, loading, refresh } = usePagination(
    async (params = {
      pageSize: 10,
      current: 1,
    }) => {
      bus.emit(EmitTypes.clearSelectOrderList)
      if (!shrimpStatus?.length) {
        return null
      }
      const body = getPageQuery({
        pageNum: params?.current || pagination.current,
        pageSize: params?.pageSize || pagination.pageSize,
      })
      const res = await orderAPI.getList(body)
      // 打包订单
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
        const p: any = {
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
      refreshDeps: [activeTab, shrimpStatus, sortType],
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

  const exportOrderListHandle = useRequest(async () => {
    const query: any = {
      selectLogisticsOrderVO: {}
    }

    if (selectIds.length) {
      query.selectLogisticsOrderVO.shrimpOrderNo = data.list.filter(o => selectIds.includes(o.id)).map(o => o.shrimpOrderNo).join(',')
    }

    const body = getPageQuery(query)
    const res = await adminOrderApi.exportOrderList(body)
    // 提取文件名
    const disposition = res.headers['content-disposition']
    let fileName = '订单导出.xlsx'
    if (disposition) {
      const match = disposition.match(/filename="?([^"]+)"?/)
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1])
      }
    }
    // 下载
    saveAs(res.data, fileName)
    Modal.success({
      content: '订单导出成功，请注意查收！',
      title: '温馨提示'
    })
  }, {
    manual: true,
  })

  const shipmentBatchHandle = useRequest(async (orderIds: string[]) => {
    const selectDatas = data.list.filter(item => selectIds.includes(item.id))
    const entrepotIds = uniq(selectDatas.map(item => item.sendWarehouse))
    // 仓库和发货人的映射
    const entrepotSenderMap = (await Promise.all(entrepotIds.map(id => entrepotAPI.getSenderAll({
      entrepotId: id,
    }).then(r => ({
      [id]: r
    }))))).reduce((pre, cur) => ({
      ...pre,
      ...cur,
    }), {})
    const batchList = orderIds.map(orderId => ({
      orderId,
      senderRealName: entrepotSenderMap[data.list.find(o => o.id === orderId)?.sendWarehouse]?.default || SystemName
    }))
    await showMessage(() => adminOrderApi.shipmentBatch(batchList), '批量出货')
      .then(res => {
        const errorList = (res.data?.data?.list || []).map(o => ({
          msg: o.msg,
          orderId: data.list.find(item => item.id === o.orderId)?.shrimpOrderNo || '获取失败'
        }));
        if (errorList.length) {
          Modal.confirm({
            noticeType: 'warning',
            title: errorList.length !== batchList.length ? '部分订单出货失败' : '批量出货失败',
            content: errorList.map(item => `${item.msg}，订单编号：${item.orderId}`).join('\n'),
          })
        }
      })
    refresh()
  }, {
    manual: true,
  })

  useEventBus(EmitTypes.refreshOrderPage, () => {
    refresh()
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
                  <Popconfirm title="确认导出订单？" onOk={() => exportOrderListHandle.run()} okButtonProps={{
                    loading: exportOrderListHandle.loading,
                  }}>
                    <Button
                      type="outline"
                      icon={<IconExport />}
                      loading={exportOrderListHandle.loading}
                    >
                      导出订单
                    </Button>
                  </Popconfirm>
                  <Button
                    type="outline"
                    loading={outListHandle.loading}
                    disabled={activeTab >= OrderStatus['已出库']}
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
                    loading={shipmentBatchHandle.loading}
                    disabled={activeTab !== OrderStatus['已出库']}
                    onClick={() => {
                      if (!selectIds.length) {
                        return Message.error('请选择订单')
                      }
                      const ids = data.list.filter(item =>
                        batchApplyShippingCarrierList.includes(item.shippingCarrier || item.orderPackageList?.[0]?.shippingCarrier),
                      ).map(o => o.id)

                      const tips = `只有${batchApplyShippingCarrierList.join('、')}的订单才能批量出货`;

                      if (!ids.length) {
                        Message.error(tips)
                        return;
                      }
                      const successIds = selectIds.filter(id => ids.includes(id))

                      // 选中的id和匹配的承运商id 都要存在
                      if (successIds.length) {
                        if (selectIds.length !== successIds.length) {
                          Modal.confirm({
                            title: '温馨提示',
                            content: `${tips}，其他承运商的订单请手动单个出货！`,
                            okText: '确认出货',
                            onOk() {
                              shipmentBatchHandle.run(successIds)
                            }
                          })
                        } else {
                          shipmentBatchHandle.run(successIds)
                        }
                      } else {
                        Message.error('不符合出货条件，请检查订单状态和承运商信息！');
                      }
                    }}
                  >
                    批量出货
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
                </>
              )
              : (
                <>
                  <SyncOrderButton></SyncOrderButton>
                  <Button
                    type="outline"
                    icon={<IconExport />}
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
        extra={(
          <>
            <Radio.Group
              type="button"
              value={sortType}
              onChange={(e) => {
                setSortType(e)
              }}
              options={[
                {
                  label: '按打包时间排序',
                  value: 0,
                },
                {
                  label: '按紧急程度排序',
                  value: 1,
                },
              ]}
            >

            </Radio.Group>
          </>
        )}
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
