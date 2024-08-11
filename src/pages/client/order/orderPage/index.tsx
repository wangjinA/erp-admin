import {
  Badge,
  Button,
  Space,
  Tabs,
} from '@arco-design/web-react'
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon'
import { useLocalStorageState, usePagination } from 'ahooks'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { OrderFilter } from './schema'

import { orderAPI } from '@/api/client/order'
import FilterForm from '@/components/FilterForm'

import { useDictOptions } from '@/components/Selectors/DictSelector'
import { getEntrepotOptions } from '@/components/Selectors/EntrepotSelector'
import { EmitTypes, useEventBus } from '@/hooks/useEventBus'
import OrderTable from '@/pages/admin/components/OrderTable'
import { timeArrToObject } from '@/utils'

export interface OrderPageProps {
  dictCode: 'shopee_status' | 'order_status'
}

const searchStatusMap = {
  shopee_status: 'shrimpStatus',
  order_status: '',
}

// const shrimpStatus = [
//   { label: '尚未付款', value: 'UNPAID' },
//   { label: '待出库', value: 'READY_TO_SHIP' },
//   { label: '处理中', value: 'PROCESSED' },
//   { label: '已装船', value: 'SHIPPED' },
//   { label: '已完成', value: 'COMPLETED' },
//   { label: '取消中', value: 'IN_CANCEL' },
//   { label: '已取消', value: 'CANCELLED' },
//   { label: '开票', value: 'INVOICE_PENDING' },
// ];
export default (props: OrderPageProps) => {
  const { dictCode } = props
  const [activeTab, setActiveTab] = useLocalStorageState<string>(location.pathname)
  const [countMap, setCountMap] = useState<Record<string, number>>()
  const [formData, _setFormData] = useState<any>({
    selectLogisticsOrderVO: {},
    selectOrderProductVO: {},
    trackingNumber: '',
  })

  function setFormData(values) {
    _setFormData({
      ...formData,
      ...values,
      ...timeArrToObject(values.packTimes, 'packStartTime', 'packEndTime'),
      ...timeArrToObject(
        values.stockRemovalTimes,
        'stockRemovalStartTime',
        'stockRemovalEndTime',
      ),
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
          orderStatus: dictCode === 'order_status' ? activeTab : undefined,
          ...(dictCode === 'shopee_status'
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
      orderAPI.getPackCount({
        ...body,
        selectLogisticsOrderVO: {
          ...omit(body.selectLogisticsOrderVO, ['orderStatus']),
        },
      }).then((res) => {
        setCountMap(res.data.data)
      })

      res.data.data.list = await Promise.all(
        res.data.data.list.map(async (item) => {
          item.sendWarehouseText
            = (await getEntrepotOptions()).find(
              oitem => oitem.value === item.sendWarehouse,
            )?.label || item.sendWarehouse
          return item
        }),
      )
      return res.data.data
    },
    {
      defaultPageSize: 10,
      defaultCurrent: 1,
      manual: false,
      refreshDeps: [activeTab, shrimpStatus],
    },
  )

  useEventBus(EmitTypes.refreshOrderPage, () => {
    refresh()
  })
  return (
    <div className="bg-white p-4">
      <FilterForm
        size="small"
        formItemConfigList={OrderFilter}
        onValuesChange={(val, values) => {
          setFormData(values)

          // console.log(...e);
        }}
      >
      </FilterForm>
      <div className="flex justify-between py-6 pr-2">
        <Space size={20}>
          {/* <Button
            type="primary"
            // onClick={() => setShowType(ShowFormType.create)}
            // icon={<IconPlus></IconPlus>}
          >
            新建
          </Button> */}
        </Space>

        <Space size={20}>
          <Button
            type="default"
            loading={loading}
            icon={<IconRefresh />}
            onClick={() => {
              // searchFromRef.clearFields();
              // searchFromRef.setFieldsValue(resetParams());
              // setTimeout(() => {
              //   if (pageNum === 1) {
              //     run();
              //   } else {
              //     setPageNum(1);
              //   }
              // });
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
        run={run}
        dictCode={dictCode}
        data={data}
        loading={loading}
        pagination={pagination}
      >
      </OrderTable>
    </div>
  )
}
