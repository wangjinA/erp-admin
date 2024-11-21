import { Button, Form, Modal } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import React, { useRef, useState } from 'react'

import StoreListSchema from '../../store/list/schema'

import { ShopStore, shopStoreAPI } from '@/api/client/shopStore'
import FilterForm from '@/components/FilterForm'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'

interface StoreListProps {}
const StoreList: React.FC<StoreListProps> = (props) => {
  const ref = useRef<SearchTableRef>()
  const [current, setCurrent] = useState<ShopStore>()
  const [form] = Form.useForm()
  const { run, loading } = useRequest(async () => {
    const formData = await form.validate()
    setCurrent(null)
  }, {
    manual: true,
  })
  return (
    <div className="p-4 bg-white">
      <SearchTable
        ref={ref}
        getListRequest={shopStoreAPI.getList}
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
                    icon={<IconEdit />}
                    onClick={() => {
                      setCurrent(row)
                    }}
                  >
                    修改出货天数
                  </Button>
                </>
              )
            },
          },
        ]}
        name="店铺授权"
      >
      </SearchTable>
      <Modal
        title="修改出货天数"
        unmountOnExit={true}
        visible={!!current}
        onCancel={() => {
          setCurrent(null)
        }}
        confirmLoading={loading}
        onConfirm={() => {
          run()
        }}
      >
        <FilterForm
          form={form}
          formItemConfigList={[{
            schema: {
              span: 24,
              label: '出货天数',
              field: 'num',
            },
            control: 'number',
          }]}
        >
        </FilterForm>
      </Modal>
    </div>
  )
}

export default StoreList
