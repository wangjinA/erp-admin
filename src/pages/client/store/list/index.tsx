import { Button, Message } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import React, { useRef } from 'react'

import StoreListSchema from './schema'

import { shopStoreAPI } from '@/api/client/shopStore'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { showMessage, showModal } from '@/utils'

interface StoreListProps {}
const StoreList: React.FC<StoreListProps> = (props) => {
  const ref = useRef<SearchTableRef>()
  const { run: unbindRun, loading: unbindLoading } = useRequest(async (id) => {
    await showMessage(() => shopStoreAPI.unbind(id), '解绑')
    ref.current.refreshSearchTable()
  }, {
    manual: true,
  })
  return (
    <div className="p-4 bg-white">
      {/* <FilterForm formItemConfigList={StoreListSchema}></FilterForm> */}
      <SearchTable
        ref={ref}
        getListRequest={shopStoreAPI.getList}
        // tableProps={{
        //   data: res?.data?.data?.list,
        //   pagination: {
        //     total: res?.data?.data?.total,
        //     pageSize: 15,
        //   },
        //   loading,
        // }}
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
                      Message.info('开发中...')
                    }}
                  >
                    重新授权
                  </Button>
                  <Button
                    type="text"
                    status="warning"
                    loading={unbindLoading}
                    icon={<IconEdit />}
                    onClick={async () => {
                      await showModal({
                        content: '确认操作？解除绑定后需要重新授权！',
                      })
                      unbindRun(row.id)
                    }}
                  >
                    解绑
                  </Button>
                </>
              )
            },
          },
        ]}
        name="店铺授权"
      >
      </SearchTable>
    </div>
  )
}

export default StoreList
