import { Alert, Button } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import React, { useState } from 'react';

import { expressAPI } from '@/api/client/express';
import SearchTable from '@/components/SearchTable';
import EntrepotRadio from '@/components/Selectors/EntrepotRadio';
import { DividerSchema } from '@/constants/schema/common';
import { showMessageStatus, showModal, tryFn } from '@/utils';

export default () => {
  const [current, setCurrent] = useState();

  const { run, loading } = useRequest(
    async (row) => {
      await showModal({
        content: '确定认领？',
        okButtonProps: {
          status: 'warning',
        },
      });
      setCurrent(row);
      const res = await tryFn(() => expressAPI.claimHandle(row));
      await showMessageStatus(res.data);
    },
    {
      manual: true,
    }
  );

  return (
    <div className="p-4 bg-white">
      <Alert
        style={{ marginBottom: 20 }}
        type="info"
        content={[
          '1. 包裹认领：寄过来仓库的包裹面单上没有写用户编码，仓库无法识别是谁的包裹，称之为“无主件”',
          '2. 仓库会将“无主件”进行公示，您可以通过输入完整的快递单号校验，校验正确后则可以点击认领',
          '3. 认领完成后，包裹会在问题包裹列表里，请及时录单处理',
          '4. 无主件仓库会进行公示 15天，15天后无人认领，仓库即做销毁处理，不予任何查找或理赔',
        ].map((item) => (
          <div key={item}>{item}</div>
        ))}
      />
      <SearchTable
        name="包裹认领"
        // getListRequest={expressAPI.getClaimList}
        formItemConfigList={[
          {
            schema: {
              field: 'entrepot',
              label: '仓库',
              span: 24,
            },
            control: <EntrepotRadio></EntrepotRadio>,
            isSearch: true,
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
          {
            schema: {
              field: 'actions',
            },
            render(c, row) {
              return (
                <Button
                  type="text"
                  loading={row === current && loading} // ! 判断一下id row === current
                  onClick={async () => {
                    run(row);
                  }}
                >
                  认领
                </Button>
              );
            },
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
