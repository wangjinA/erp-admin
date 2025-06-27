import {
  Badge,
  Button,
  Divider,
  Form,
  Radio,
  Space,
  Tabs,
  Tag,
} from '@arco-design/web-react'
import { IconExport, IconRefresh, IconSearch } from '@arco-design/web-react/icon'
import { useLocalStorageState, usePagination, useResetState } from 'ahooks'
import { omit } from 'lodash'
import { useState } from 'react'

import { getOrderFilter } from './schema'
import { orderAPI as adminOrderApi } from '@/api/admin/order'
import { orderAPI } from '@/api/client/order'
import FilterForm from '@/components/FilterForm'

import { useDictOptions } from '@/components/Selectors/DictSelector'
import { ExceptionOnHoldValue } from '@/constants/order'
import { EmitTypes, bus, useEventBus } from '@/hooks/useEventBus'
import OrderTable from '@/pages/admin/components/OrderTable'
import SyncOrderButton from '@/pages/admin/components/OrderTable/SyncOrderButton'
import { isAdmin } from '@/routes'
import { replaceQueryValueByObject, timeArrToObject } from '@/utils'
import PageActions from './components/PageActions'

export enum OrderPageType {
  SHOPEE = 'shopee',
  PACK_ORDER = 'pack_order',
  PENDING = 'pending', // 待处理订单
  OUT_ORDER_STATUS = 'out_order_status', // 海外仓退件订单
}

export enum OrderPageDict {
  SHOPEE = 'shopee_status',
  PACK_ORDER = 'order_status',
  PENDING = 'order_pending_status',
  OUT_ORDER_STATUS = 'out_order_status',
}

export interface OrderPageProps {
  type: OrderPageType
}

export interface PageQuery {
  otherQuery?: any,
  isBindSelect?: boolean;
  isCount?: boolean;
}

export default (props: OrderPageProps) => {
  const { type } = props

  const dictCode = {
    [OrderPageType.SHOPEE]: OrderPageDict.SHOPEE,
    [OrderPageType.PACK_ORDER]: OrderPageDict.PACK_ORDER,
    [OrderPageType.PENDING]: OrderPageDict.PENDING,
    [OrderPageType.OUT_ORDER_STATUS]: OrderPageDict.OUT_ORDER_STATUS,
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
  function getPageQuery({
    otherQuery = {},
    isBindSelect,
    isCount,
  }: PageQuery) {
    const { selectLogisticsOrderVO = {}, ...other } = otherQuery

    let orderStatus: string; // 系统物流订单状态字段
    let returnStatus: string; // 海外仓退件列表状态字段
    if (type === OrderPageType.PACK_ORDER) {
      orderStatus = activeTab;
    }

    let abeyanceStatus = undefined // 是否异常搁置
    if (!isCount) { // count不做处理
      abeyanceStatus = 0; // 默认是非
      if (activeTab === ExceptionOnHoldValue) { // 异常搁置单独处理！
        orderStatus = undefined
        abeyanceStatus = 1;
      }
    }

    if (type === OrderPageType.OUT_ORDER_STATUS) {
      returnStatus = activeTab;
      abeyanceStatus = undefined // 如果是退件列表，异常搁置字段不参与查询
    }

    const querySelectLogisticsOrderVO = replaceQueryValueByObject({
      sortType,
      ...omit(formData.selectLogisticsOrderVO, ['createdTimes', 'stockRemovalTimes', 'packTimes']),
      ...timeArrToObject(formData.selectLogisticsOrderVO.packTimes, 'packStartTime', 'packEndTime'),
      ...timeArrToObject(formData.selectLogisticsOrderVO.createdTimes, 'createStartTime', 'createEndTime'),
      ...timeArrToObject(formData.selectLogisticsOrderVO.createdTimes, 'createStartTime', 'createEndTime'),
      ...timeArrToObject(
        formData.selectLogisticsOrderVO.stockRemovalTimes,
        'stockRemovalStartTime',
        'stockRemovalEndTime',
      ),
      orderStatus,
      returnStatus,
      abeyanceStatus,
      // ...(type === OrderPageType.SHOPEE
      //   ? {
      //     shrimpStatus: activeTab,
      //     storeFlag: true,
      //   }
      //   : {
      //     whetherPack: true,
      //   }),
      ...((selectIds.length && isBindSelect)
        ? { shrimpOrderNo: data.list.filter(o => selectIds.includes(o.id)).map(o => o.shrimpOrderNo).join(',') }
        : {}
      )
    }, ['shrimpOrderNo', 'trackingNumber'])

    switch (type) {
      case OrderPageType.PACK_ORDER:
        querySelectLogisticsOrderVO.whetherPack = true;
        break;
      case OrderPageType.PENDING:
        querySelectLogisticsOrderVO.handle = true;
        break;
      case OrderPageType.OUT_ORDER_STATUS:
        querySelectLogisticsOrderVO.whetherPack = true;
        break;
      case OrderPageType.SHOPEE:
        querySelectLogisticsOrderVO.shrimpStatus = activeTab;
        querySelectLogisticsOrderVO.storeFlag = true;
        break;
    }

    const querySelectOrderProductVO = replaceQueryValueByObject({
      ...formData.selectOrderProductVO,
    }, ['trackingNo'])


    const pageQuery = {
      ...formData,
      selectOrderProductVO: querySelectOrderProductVO,
      selectLogisticsOrderVO: querySelectLogisticsOrderVO,
      ...other,
    }
    return pageQuery;
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
        otherQuery: {
          pageNum: params?.current || pagination.current,
          pageSize: params?.pageSize || pagination.pageSize,
        }
      })

      const listRequestMap = {
        [OrderPageType.OUT_ORDER_STATUS]: adminOrderApi.overseasWarehouseReturnList,
      }

      const listRequestList = (...params) => ((listRequestMap[type] || orderAPI.getList)(...params)).then(r => {
        if (type === OrderPageType.PENDING) {
          setCountMap({
            0: r.data.data.total,
          })
        }
        return r;
      })

      const countBody: any = {
        ...omit(body, ['selectLogisticsOrderVO']),
        selectLogisticsOrderVO: {
          ...omit(body.selectLogisticsOrderVO, ['orderStatus', 'abeyanceStatus', 'shrimpStatus', 'returnStatus']),
        }
      }
      const requestMap = {
        [OrderPageType.OUT_ORDER_STATUS]: adminOrderApi.overseasWarehouseReturnCount,
        [OrderPageType.PACK_ORDER]: orderAPI.getPackCount,
      }
      const request = requestMap[type] || orderAPI.getShopOrderCount

      const [res] = await Promise.all([
        listRequestList(body),
        ...(
          type === OrderPageType.PENDING ? [] : [request(countBody).then((res) => {
            setCountMap(res.data.data)
          })]
        )
      ])
      return res.data.data
    },
    {
      defaultPageSize: 10,
      defaultCurrent: 1,
      manual: false,
      debounceWait: 80,
      refreshDeps: [activeTab, shrimpStatus, sortType],
    },
  )
  // const cancelListHandle = useRequest(async () => {
  //   await showMessage(() => adminOrderApi.cancel(selectIds), '取消')
  //   refresh()
  // }, {
  //   manual: true,
  // })

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
      <div className="flex items-center py-6 pr-2">
        <Space size={20} className="">
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
        <Divider className="mx-8" type="vertical"></Divider>
        {
          isAdmin()
            ? (
              <PageActions data={data} selectIds={selectIds} activeTab={activeTab} dictCode={dictCode} getPageQuery={getPageQuery} />
            )
            : (
              <Space size={8}>
                <SyncOrderButton></SyncOrderButton>
                <Button
                  type="outline"
                  icon={<IconExport />}
                >
                  导出订单
                </Button>
              </Space>
            )
        }
        {selectIds.length
          ? (
            <Tag className="ml-2" checked={true} color="pinkpurple">
              已选中
              {' '}
              {selectIds.length}
              {' '}
              个订单
            </Tag>
          )
          : null}
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
