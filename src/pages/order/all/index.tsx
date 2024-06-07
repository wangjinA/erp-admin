import React, { useState } from 'react';
import FilterForm from '@/components/FilterForm';
import { OrderFilter } from '@/constants/schema/order';
import { Table, Tabs } from '@arco-design/web-react';

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
  return (
    <div className="bg-white pr-4">
      <FilterForm
        size="small"
        formItemConfigList={OrderFilter}
        onValuesChange={(...e) => {
          console.log(...e);
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
      <Table
        columns={[
          {
            title: '商品信息',
            key: 'goods',
          },
          {
            title: '发货信息',
            key: 'delivery',
          },
          {
            title: '卖家信息',
            key: 'seller',
          },
          {
            title: '物流信息',
            key: 'logistics',
          },
          {
            title: '费用',
            key: 'fee',
          },
          {
            title: '操作',
            key: 'action',
          },
        ]}
      ></Table>
    </div>
  );
};
