import FilterForm from '@/components/FilterForm';
import React from 'react';
import SearchTable from '@/components/SearchTable';
import { useRequest } from 'ahooks';
import { shopStoreAPI } from '@/api/admin/shopStore';
import { Button } from '@arco-design/web-react';
import { FinancialSchema } from './shcema';
import { IconExport, IconImport } from '@arco-design/web-react/icon';
import { getExcleData, getFile } from '@/utils';

const data = [
  {
    0: '曾富林',
    1: '2024.05.28',
    2: '86107766144',
    3: '86107766144',
    4: '台湾',
    5: '台湾专线7-11',
    6: '0.22',
    7: '1',
    8: '鄭*仁',
    9: '928440591',
    10: '觀音門市    店號：991573',
    11: '電子產品',
    12: '364',
    13: '3.52',
    14: '75',
    15: '5',
  },
  {
    0: '曾富林',
    1: '2024.05.30',
    2: '86107766073',
    3: '86107766073',
    4: '台湾',
    5: '台湾专线7-11',
    6: '0.88',
    7: '1',
    8: '王美淑',
    9: '928440591',
    10: '港東門市   店號：266620',
    11: '電子產品',
    12: '8150',
    13: '14.08',
    14: '75',
    15: '5',
  },
  {
    0: '曾富林',
    1: '2024.05.31',
    2: '86107766083',
    3: '86107766083',
    4: '台湾',
    5: '台湾专线7-11',
    6: '0.09',
    7: '1',
    8: '江*科',
    9: '922330809',
    10: '宇勝門市   店號：993823',
    11: '電子產品',
    12: '690',
    13: '1.44',
    14: '75',
    15: '5',
  },
  {
    0: '曾富林',
    1: '2024.05.31',
    2: 'G0537821',
    3: 'G586G0537821',
    4: '台湾',
    5: '台湾专线全家',
    6: '0.1',
    7: '1',
    8: '林*賢',
    9: '930107598',
    10: '全家土城義鴻店   店舖號：015765',
    11: '五金',
    12: '378',
    13: '1.6',
    14: '75',
    15: '5',
  },
  {
    0: '曾富林',
    1: '2024.06.02',
    2: '86107766084',
    3: '86107766084',
    4: '台湾',
    5: '台湾专线7-11',
    6: '0.83',
    7: '1',
    8: '王美淑',
    9: '929511995',
    10: '港東門市   店號：266620',
    11: '五金',
    12: '550',
    13: '13.28',
    14: '75',
    15: '5',
  },
  {
    0: '曾富林',
    1: '2024.06.02',
    2: 'G0537822',
    3: 'G586G0537822',
    4: '台湾',
    5: '台湾专线全家',
    6: '0.53',
    7: '1',
    8: '陳*和',
    9: '963205077',
    10: '全家阿蓮忠孝店  店舖號：015677',
    11: '五金',
    12: '642',
    13: '8.48',
    14: '75',
    15: '5',
  },
];

interface financialProps {}
const financial: React.FC<financialProps> = (props) => {
  return (
    <div className="p-4 bg-white">
      {/* <FilterForm formItemConfigList={FinancialSchema}></FilterForm> */}
      <SearchTable
        showEdit={false}
        tableProps={{
          data: data,
          pagination: {
            pageSize: 15,
          },
          scroll: {
            x: true,
          },
        }}
        leftTool={() => (
          <>
            <Button status="warning" icon={<IconImport />} onClick={async () => {
              const files = await getFile();
              console.log(files);
              
              const data = await Promise.all(files.map(getExcleData));
              console.log(data);
              
            }}>
              导入
            </Button>
            <Button status="danger" icon={<IconExport />} onClick={() => {}}>
              导出
            </Button>
          </>
        )}
        formItemConfigList={[
          ...FinancialSchema,
          // {
          //   schema: {
          //     label: '操作',
          //     field: 'actions',
          //   },
          //   render(col, row) {
          //     return (
          //       <>
          //         <Button
          //           type="text"
          //           status="warning"
          //           icon={<IconEdit />}
          //           onClick={() => {
          //             setShowType(ShowFormType.edit);
          //             formRef.setFieldsValue(record);
          //           }}
          //         ></Button>
          //       </>
          //     );
          //   },
          // },
        ]}
        name="店铺授权"
        showCreate={false}
      ></SearchTable>
    </div>
  );
};

export default financial;
