import React from 'react';
import EntrepotRadio from '@/components/Selectors/EntrepotRadio';
import { DividerSchema } from '@/constants/schema/common';
import SearchTable from '@/components/SearchTable';
import { expressAPI } from '@/api/client/express';
import { Alert } from '@arco-design/web-react';

export default () => {
  return (
    <div className="p-4 bg-white">
      <Alert
        style={{ marginBottom: 20 }}
        type="info"
        content={[
          '1. 拒收管理：将您采购的商品在发往仓库途中，由于虾皮买家取消订单等因素造成不需要该商品，可以通过拒收来节省退件的成本',
          '2. 需要在仓库签收之前提交拒收信息给仓库，否则，一旦仓库签收后将无法拒收，拒收成功之后会提示已拒收状态，已拒收代表快递已经取走快递原路退回',
          '3. 操作流程：新增-->选择拒收仓库-->填入需要拒收的快递单号-->确定',
        ].map((item) => (
          <div key={item}>{item}</div>
        ))}
      />
      <SearchTable
        name="包裹拒收"
        showActions={false}
        getListRequest={expressAPI.getRejectList}
        createRequest={expressAPI.addReject}
        formItemConfigList={[
          {
            schema: {
              field: 'entrepot',
              label: '仓库',
              span: 24,
            },
            control: <EntrepotRadio></EntrepotRadio>,
            isSearch: true,
            isCreate: true,
          },
          {
            ...DividerSchema,
            isSearch: true,
          },
          {
            schema: {
              label: '快递单号',
              field: 'deliveryNo',
            },
            isSearch: true,
            isCreate: true,
          },
          {
            schema: {
              label: '状态',
              field: 'status',
            },
          },
          {
            schema: {
              label: '签收时间',
              field: 'createTime',
            },
            control: 'datePickerRange',
            isSearch: true,
          },
          // {
          //   schema: {
          //     label: '包裹年龄',
          //     field: 'createTime',
          //   },
          // },
        ]}
      ></SearchTable>
    </div>
  );
};
