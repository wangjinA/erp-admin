import FilterForm from '@/components/FilterForm';
import React, { useEffect } from 'react';
import SearchTable from '@/components/SearchTable';
import { useRequest } from 'ahooks';
import { shopStoreAPI } from '@/api/admin/shopStore';
import { Button } from '@arco-design/web-react';
import { FinancialSchema } from './shcema';
import { IconExport, IconImport } from '@arco-design/web-react/icon';
import { useIndexedDB } from 'react-indexed-db-hook';

const data = [
  {
    name: '曾富林',
    createTime: '2024-07-21 15:30',
    airFreight: 16, // 空运
    seaFreight: 8, // 海运
    paijian: 2, // 派件费
    huilv: 4.6, // 汇率
    jindian: 2, // 进店
    id: ['曾富林', '曾富林-胡佳期'],
  },
  {
    name: '庄溢彬',
    createTime: '2024-07-21 15:30',
    airFreight: 20, // 空运
    seaFreight: 8, // 海运
    paijian: 8, // 派件费
    huilv: 4.8, // 汇率
    jindian: 3, // 进店
    id: [''],
  },
];

interface financialProps {}
const financial: React.FC<financialProps> = (props) => {
  const { getAll, add, deleteRecord, update } = useIndexedDB('expense');
  const { data, loading } = useRequest(() => {
    return getAll();
  });
  console.log(data);
  
  return (
    <div className="p-4 bg-white">
      {/* <FilterForm formItemConfigList={FinancialSchema}></FilterForm> */}
      <SearchTable
        showEdit={false}
        tableProps={{
          scroll: {
            x: true,
          },
        }}
        formItemConfigList={FinancialSchema}
        getListRequest={async (params) => {
          let list = await getAll();
          if (params.name) {
            list = list.filter((item) => item.name.includes(params.name));
          }
          return {
            data: {
              data: {
                list: list,
                total: list.length,
              },
            },
          } as any;
        }}
        removeRequest={async (id) => {
          console.log(id);

          await deleteRecord(id);
          return Promise.resolve<any>({
            data: {
              code: 200,
            },
          });
        }}
        createRequest={async (params) => {
          const addData = {
            ...params,
            id: Date.now(),
            updateTime: Date.now(),
          };
          await add(addData);
          return Promise.resolve<any>({
            data: {
              code: 200,
            },
          });
        }}
        updateRequest={async (params) => {
          const addData = {
            ...params,
            updateTime: Date.now(),
          };
          await update(addData);
          return Promise.resolve<any>({
            data: {
              code: 200,
            },
          });
        }}
        name="人员费用"
        showCreate={false}
      ></SearchTable>
    </div>
  );
};

export default financial;
