import SearchTable, { SearchTableSchema } from '@/components/SearchTable';
import { Dict, dictAPI } from '@/api/dict';
import { Button, Drawer } from '@arco-design/web-react';
import { useState } from 'react';
const formItemConfigList: SearchTableSchema[] = [
  {
    schema: {
      field: 'dictName',
      label: '字典名称',
    },
    isSearch: true,
    isCreate: true,
  },
  // {
  //   schema: {
  //     field: 'createBy',
  //     label: '创建人',
  //   },
  // },
  // {
  //   schema: {
  //     field: 'deleteStatus',
  //     label: '删除状态', // ：0.正常，1.删除
  //   },
  //   isSearch: true,
  // },
  {
    schema: {
      field: 'dictCode',
      label: '字典标识',
    },
    isSearch: true,
    isCreate: true,
  },
  {
    schema: {
      field: 'dictStatus',
      label: '字典状态', // ：0.正常，1.异常
    },
    // isSearch: true,
  },
  {
    schema: {
      field: 'remark',
      label: '字典备注',
    },
    isSearch: true,
    isCreate: true,
  },
  // {
  //   schema: {
  //     field: 'sequenceNo',
  //     label: '序号',
  //   },
  // },
  // {
  //   schema: {
  //     field: 'updateBy',
  //     label: '更新人',
  //   },
  //   isSearch: true,
  // },
  {
    schema: {
      field: 'updateTime',
      label: '更新时间',
    },
    isSearch: true,
  },
  // {
  //   schema: {
  //     field: 'tableActions',
  //     label: '更新时间',
  //   },
  //   render(col, record){
  //     return <Button >

  //     </Button>
  //   }
  // },
];
export default () => {
  const [record, setRecord] = useState<Dict>();
  return (
    <div className="p-4 bg-white">
      <SearchTable
        name="字典"
        formItemConfigList={formItemConfigList}
        createRequest={dictAPI.create}
        getListRequest={dictAPI.getList}
        removeRequest={dictAPI.remove}
        updateRequest={dictAPI.update}
        onView={setRecord}
      ></SearchTable>
      <Drawer width="80%" visible={!!record} title={record?.dictName} onCancel={()=>setRecord(null)}>
        <SearchTable
          name="字典"
          formItemConfigList={formItemConfigList}
          createRequest={dictAPI.create}
          getListRequest={dictAPI.getList}
          removeRequest={dictAPI.remove}
          updateRequest={dictAPI.update}
          onView={setRecord}
        ></SearchTable>
      </Drawer>
    </div>
  );
};
