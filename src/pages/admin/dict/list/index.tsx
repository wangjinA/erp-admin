import SearchTable, { SearchTableSchema } from '@/components/SearchTable';
import { Dict, dictAPI, dictChildAPI } from '@/api/admin/dict';
import { Button, Drawer } from '@arco-design/web-react';
import { useState } from 'react';
import { dictChildFormItemConfigList, dictFormItemConfigList } from './schema';
export default () => {
  const [record, setRecord] = useState<Dict>();
  return (
    <div className="p-4 bg-white">
      <SearchTable
        name="字典"
        formItemConfigList={dictFormItemConfigList}
        createRequest={dictAPI.create}
        getListRequest={dictAPI.getList}
        removeRequest={dictAPI.remove}
        updateRequest={dictAPI.update}
        onView={setRecord}
      ></SearchTable>
      <Drawer
        width="80%"
        visible={!!record}
        title={record?.dictName}
        onCancel={() => setRecord(null)}
        unmountOnExit={true}
      >
        <SearchTable
          className="p-4 bg-white"
          name={record?.dictName}
          initialValues={{
            dictId: record?.id,
          }}
          isSearchParams={false}
          formItemConfigList={dictChildFormItemConfigList}
          createRequest={(data)=>dictChildAPI.create({
            ...data,
            dictId: record?.id,
          })}
          getListRequest={dictChildAPI.getList}
          removeRequest={dictChildAPI.remove}
          updateRequest={dictChildAPI.update}
          onView={setRecord}
        ></SearchTable>
      </Drawer>
    </div>
  );
};
