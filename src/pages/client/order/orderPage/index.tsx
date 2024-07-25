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
import { usePagination } from 'ahooks';
import { orderAPI } from '@/api/client/order';
import { OrderFilter } from './schema';
import OrderTable from '@/pages/admin/components/OrderTable';
import { useDictOptions } from '@/components/Selectors/DictSelector';
import { timeArrToObject } from '@/utils';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';

export interface OrderPageProps {
  dictCode: 'shopee_status' | 'order_status';
}

const searchStatusMap = {
  shopee_status: 'shrimpStatus',
  order_status: '',
};

export default (props: OrderPageProps) => {
  const { dictCode } = props;
  const [activeTab, setActiveTab] = useState<string>();
  const [formData, _setFormData] = useState<any>({
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
  const { data: shrimpStatus } = useDictOptions({
    dictCode,
    displayName: '',
  });
  if (activeTab === undefined && shrimpStatus?.length) {
    setActiveTab(shrimpStatus[0]?.value);
  }
  const { data, run, pagination, loading } = usePagination(
    async (params) => {
      if (!shrimpStatus?.length) {
        return null;
      }
      const res = await orderAPI.getList({
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
            : {}),
        },
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
      refreshDeps: [activeTab, shrimpStatus],
    }
  );

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
        {shrimpStatus?.map((x, i) => (
          <Tabs.TabPane key={x.value} title={x.label}></Tabs.TabPane>
        ))}
      </Tabs>
      <OrderTable
        data={data}
        loading={loading}
        pagination={pagination}
      ></OrderTable>
    </div>
  );
};
