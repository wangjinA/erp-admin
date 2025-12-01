import { Alert, Button } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import React, { useRef } from 'react'

import getStoreListSchema from './schema'

import { shopStoreAPI } from '@/api/client/shopStore'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { showMessage, showModal } from '@/utils'
import { useSearchParam } from '@/components/SearchTable/hooks'

interface StoreListProps { }
const StoreList: React.FC<StoreListProps> = (props) => {

  const { value: { status, authInfo } } = useSearchParam({
    initialValues: {
      status: '',
      authInfo: '',
    },
  })

  const ref = useRef<SearchTableRef>()

  const { run: unbindRun, loading: unbindLoading } = useRequest(async (id) => {
    await showMessage(() => shopStoreAPI.unbind(id), '解绑')
    ref.current.refreshSearchTable()
  }, {
    manual: true,
  })

  return (
    <div className="p-4 bg-white">
      {String(status) === '204' && String(authInfo || '')?.length === 11 ? <Alert
        className="mb-4"
        type="error"
        content={`绑定失败，该店铺已在${authInfo}手机号下授权绑定，请先联系【速运宝系统管理员】进行解绑`}
        closable={true}
        onClose={() => {
          location.href = location.origin + location.pathname
        }}
      />
        : null}

      {/* <FilterForm formItemConfigList={StoreListSchema}></FilterForm> */}
      <SearchTable
        ref={ref}
        getListRequest={shopStoreAPI.getList}
        tableProps={{
          scroll: {
            x: 1200,
          },
        }}
        // tableProps={{
        //   data: res?.data?.data?.list,
        //   pagination: {
        //     total: res?.data?.data?.total,
        //     pageSize: 15,
        //   },
        //   loading,
        // }}
        formItemConfigList={[
          ...getStoreListSchema(() => ref.current.refreshSearchTable()),
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
