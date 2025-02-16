import { Drawer } from '@arco-design/web-react'
import { useState } from 'react'

import { dictChildFormItemConfigList, dictFormItemConfigList } from './schema'

import { Dict, dictAPI, dictChildAPI } from '@/api/admin/dict'
import SearchTable from '@/components/SearchTable'

export default () => {
  const [record, setRecord] = useState<Dict>()
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
      >
      </SearchTable>
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
            // dictId: record?.id,
            dictCode: record?.dictCode,
          }}
          isSearchParams={false}
          formItemConfigList={dictChildFormItemConfigList}
          createRequest={data => dictChildAPI.create({
            ...data,
            // dictId: record?.id,
            dictCode: record?.dictCode,
          })}
          getListRequest={dictChildAPI.getList}
          removeRequest={dictChildAPI.remove}
          updateRequest={dictChildAPI.update}
          onView={setRecord}
        >
        </SearchTable>
      </Drawer>
    </div>
  )
}
