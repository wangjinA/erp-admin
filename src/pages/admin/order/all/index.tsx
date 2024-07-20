import React, { useState } from 'react';
import FilterForm from '@/components/FilterForm';
import { OrderFilter } from '@/constants/schema/order';
import { Avatar, List, Table, Tabs } from '@arco-design/web-react';
import OrderTable from '@/components/OrderTable';
import { usePagination, useRequest } from 'ahooks';
import { orderAPI } from '@/api/order';

// 全部
// 待入库
// 部分入库
// 待出库
// 已交运
// 已出库
// 已取消
// 已关闭
// 异常搁置
const tabs = [
  {
    title: '全部',
    key: 'all',
  },
  {
    title: '待入库',
    key: 'pending',
  },
  {
    title: '部分入库',
    key: 'partial',
  },
  {
    title: '待出库',
    key: 'pendingOut',
  },
  {
    title: '已交运',
    key: 'delivered',
  },
  {
    title: '已出库',
    key: 'out',
  },
  {
    title: '已取消',
    key: 'cancel',
  },
  {
    title: '已关闭',
    key: 'close',
  },
  {
    title: '异常搁置',
    key: 'exception',
  },
];

export default () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const res = usePagination(
    async () => {
      const res = await orderAPI.getList({
        pageNum: 1,
        pageSize: 10,
      });
      return res.data.data
    },
    {
      manual: false,
    }
  );
  return (
    <div className="bg-white p-4">
      <FilterForm
        size="small"
        formItemConfigList={OrderFilter}
        onValuesChange={(...e) => {
          // console.log(...e);
        }}
      ></FilterForm>
      <Tabs
        className="mb-4"
        activeTab={activeTab}
        onChange={(v) => setActiveTab(v)}
      >
        {tabs.map((x, i) => (
          <Tabs.TabPane key={x.key} title={x.title}></Tabs.TabPane>
        ))}
      </Tabs>
      <OrderTable></OrderTable>
    </div>
  );
};
