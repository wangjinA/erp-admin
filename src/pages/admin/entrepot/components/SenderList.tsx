import React, { useEffect } from 'react'

import { entrepotAPI } from '@/api/admin/entrepot'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import StatusTag from '@/components/StatusTag'

export default ({
  entrepotId,
}: {
  entrepotId: string
}) => {
  const ref = React.useRef<SearchTableRef>()
  useEffect(() => {
    ref.current?.refreshSearchTable()
  }, [entrepotId])
  return (
    <SearchTable
      ref={ref}
      name="寄件人管理"
      requestQueryTransform={query => ({
        ...query,
        entrepotId,
      })}
      getListRequest={entrepotAPI.getSenderList}
      createRequest={(data => entrepotAPI.insertSender({
        ...data,
        entrepotId,
      }))}
      updateRequest={entrepotAPI.updateSender}
      removeRequest={entrepotAPI.removeSender}
      createInitialValue={{
        isDefault: false,
      }}
      filterFormProps={{
        onChange(e) {
          console.log(e)
        },
      }}
      formItemConfigList={[
        {
          schema: {
            field: 'details',
            label: '寄件人姓名',
            span: 24,
            required: true,
          },
          isCreate: true,
        },
        {
          schema: {
            label: '默认',
            field: 'isDefault',
          },
          render(col) {
            return (
              <StatusTag
                tagInfos={[
                  {
                    text: '是',
                    value: true,
                    color: 'green',
                  },
                  {
                    text: '否',
                    value: false,
                  },
                ]}
                value={col}
              >
              </StatusTag>
            )
          },
          formItemProps: {
            triggerPropName: 'checked',
          },
          control: 'switch',
          isCreate: true,
        },
      ]}
    >
    </SearchTable>
  )
}
