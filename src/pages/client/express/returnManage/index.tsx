import React from 'react';
import EntrepotRadio from '@/components/Selectors/EntrepotRadio';
import { DividerSchema } from '@/constants/schema/common';
import SearchTable from '@/components/SearchTable';
import { expressAPI } from '@/api/client/express';
import { Alert, List } from '@arco-design/web-react';
import {
  getDictName,
  useDictOptions,
} from '@/components/Selectors/DictSelector';
import { useEntrepotOptions } from '@/components/Selectors/EntrepotSelector';

export default () => {
  // const returnStatus = useDictOptions({
  //   dictCode: '',
  // });
  const { data: entrepotList } = useEntrepotOptions();
  return (
    <div className="p-4 bg-white">
      <Alert
        style={{ marginBottom: 20 }}
        type="info"
        content={[
          '1. 退件管理：将您已经在仓库不需要发货或者已经完成发货多出来的商品退回到您指定的退件地址',
          '2. 无论是上门取件还是仓库快递寄回，仓库统一收取每个退件包裹1元/单的退件服务费。退件完成之后仓库将会把寄回的快递单号填入，您可通过此处自行查看退件单号',
          '3. 操作流程：新增-->选择退件仓库-->依次填入需要退件的信息-->确定。 注：上门取件务必在备注上填写取件码 ，否则将退件失败',
          '4. 无主件仓库会进行公示 15天，15天后无人认领，仓库即做销毁处理，不予任何查找或理赔',
        ].map((item) => (
          <div key={item}>{item}</div>
        ))}
      />
      <SearchTable
        name="包裹认领"
        showActions={false}
        getListRequest={expressAPI.getReturnList}
        formItemConfigList={[
          {
            schema: {
              field: 'sendWarehouse',
              label: '仓库',
              span: 24,
            },
            control: <EntrepotRadio></EntrepotRadio>,
            isSearch: true,
            render(col) {
              console.log(entrepotList);
              const target = entrepotList?.find(
                (oitem) => String(oitem.value) === String(col)
              );
              return target?.label || col;
            },
          },
          {
            ...DividerSchema,
            isSearch: true,
          },
          {
            schema: {
              label: '快递单号',
              field: 'trackingNo',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '收件人信息',
              field: 'recipients',
            },
          },
          // {
          //   schema: {
          //     label: '退件信息',
          //     field: 'status',
          //   },
          // },
          {
            schema: {
              label: '状态',
              field: 'returnStatus',
            },
            render(col) {
              return col || '-';
            },
          },
          {
            schema: {
              label: '备注',
              field: 'storeRemark',
            },
          },
          {
            schema: {
              label: '申请时间',
              field: 'createTime',
            },
            control: 'datePickerRange',
            isSearch: true,
          },
        ]}
      ></SearchTable>
    </div>
  );
};