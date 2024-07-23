import React, { useState } from 'react';
import FilterForm from '@/components/FilterForm';
import {
  Avatar,
  Button,
  List,
  Space,
  Table,
  Tabs,
} from '@arco-design/web-react';
import { usePagination, useRequest } from 'ahooks';
import { orderAPI } from '@/api/client/order';
import { OrderFilter } from './schema';
import OrderTable from '@/pages/admin/components/OrderTable';
import { useDictOptions } from '@/components/Selectors/DictSelector';
import { timeArrToObject } from '@/utils';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';

const tabs = [
  {
    title: '全部',
    key: 'all',
  },
  {
    title: '未付款',
    key: 'pending',
  },
  {
    title: '待发货',
    key: 'partial',
  },
  {
    title: '运送中',
    key: 'pendingOut',
  },
  {
    title: '重新发货',
    key: 'delivered',
  },
  {
    title: '已出货',
    key: 'out',
  },
  {
    title: '待取消',
    key: 'cancel',
  },
  {
    title: '已取消',
    key: 'close',
  },
  {
    title: '待退货已完成',
    key: 'exception',
  },
];

export default () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [formData, _setFormData] = useState({
    selectLogisticsOrderVO: {},
    selectOrderProductVO: {},
    trackingNumber: '',
  });

  function setFormData(values) {
    _setFormData({
      ...formData,
      ...values,
      ...timeArrToObject(values.packTimes, 'packStartTime', 'packEndTime'),
      ...timeArrToObject(
        values.stockRemovalTimes,
        'stockRemovalStartTime',
        'stockRemovalEndTime'
      ),
    });
  }
  const { data: orderStatus } = useDictOptions({
    dictCode: 'order_status',
    displayName: '',
  });
  const { data, run, pagination, loading } = usePagination(
    async (params) => {
      if (!orderStatus?.length) {
        return null;
      }
      const res = await orderAPI.getList({
        ...formData,
        pageNum: params.current,
        pageSize: params.pageSize,
      });
      console.log(res.data.data);

      return res.data.data;
    },
    {
      defaultPageSize: 10,
      defaultCurrent: 1,
      manual: false,
      refreshDeps: [activeTab, orderStatus],
    }
  );
  console.log(formData);
  console.log(pagination);

  return (
    <div className="bg-white p-4">
      <FilterForm
        size="small"
        formItemConfigList={OrderFilter}
        onValuesChange={(val, values) => {
          setFormData(values);

          // console.log(...e);
        }}
      ></FilterForm>
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
              })
            }
          >
            查询
          </Button>
        </Space>
      </div>
      <Tabs
        lazyload={true}
        className="mb-4"
        activeTab={activeTab}
        onChange={(v) => setActiveTab(v)}
      >
        {orderStatus?.map((x, i) => (
          <Tabs.TabPane key={x.value} title={x.label}></Tabs.TabPane>
        ))}
      </Tabs>
      <OrderTable
        tableProps={{
          data: data?.list,
          pagination: {
            ...pagination,
            showJumper: true,
            showTotal: true,
            sizeCanChange: true,
          },
          loading,
        }}
      ></OrderTable>
    </div>
  );
};
