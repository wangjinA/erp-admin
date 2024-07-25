import FilterForm from '@/components/FilterForm';
import React from 'react';
import StoreListSchema from './schema';
import SearchTable from '@/components/SearchTable';
import { useRequest } from 'ahooks';
import { shopStoreAPI } from '@/api/client/shopStore';
import { Button } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';

interface StoreListProps {}
const StoreList: React.FC<StoreListProps> = (props) => {
  const { data: res, loading } = useRequest(() => {
    return shopStoreAPI.getList({
      pageNum: 1,
      pageSize: 10,
    });
  });
  return (
    <div className="p-4 bg-white">
      {/* <FilterForm formItemConfigList={StoreListSchema}></FilterForm> */}
      <SearchTable
        showEdit={false}
        tableProps={{
          data: res?.data?.data?.list,
          pagination: {
            total: res?.data?.data?.total,
            pageSize: 15,
          },
          loading,
        }}
        formItemConfigList={[
          ...StoreListSchema,
          {
            schema: {
              label: '操作',
              field: 'actions',
            },
            render(col, row) {
              return (
                <>
                  <Button
                    type="text"
                    status="warning"
                    icon={<IconEdit />}
                    onClick={() => {
                      // setShowType(ShowFormType.edit);
                      // formRef.setFieldsValue(record);
                    }}
                  >重新授权</Button>
                  <Button
                    type="text"
                    status="warning"
                    icon={<IconEdit />}
                    onClick={() => {
                      // setShowType(ShowFormType.edit);
                      // formRef.setFieldsValue(record);
                    }}
                  >解绑</Button>
                </>
              );
            },
          },
        ]}
        name="店铺授权"
        showCreate={false}
      ></SearchTable>
    </div>
  );
};

export default StoreList;
