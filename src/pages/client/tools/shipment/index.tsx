import { Button, Form, Modal, Progress } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import StoreListSchema from '../../store/list/schema'

import { ShopStore, shopStoreAPI } from '@/api/client/shopStore'
import { shipmentAPI } from '@/api/shopeeUtils/shipment'
import FilterForm from '@/components/FilterForm'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { GlobalState } from '@/store'
import { showMessage } from '@/utils'

interface StoreListProps {}
const StoreList: React.FC<StoreListProps> = (props) => {
  const { userInfo } = useSelector((state: GlobalState) => state)
  const ref = useRef<SearchTableRef>()
  const [current, setCurrent] = useState<ShopStore>()
  const [list, setList] = useState<ShopStore[]>([])
  const [form] = Form.useForm()
  const { run, loading } = useRequest(async () => {
    const formData = await form.validate()
    return showMessage(() => shipmentAPI.update({
      ...formData,
      userLoginAccount: userInfo.userLoginAccount,
      shopId: current?.id,
    })).then(() => {
      setCurrent(null)
    })
  }, {
    manual: true,
  })

  const { data: processList, run: getProcessList } = useRequest(() => {
    const ids = list?.map(item => item.id) || []
    if (!ids.length)
      return
    return shipmentAPI.getProcess({
      userLoginAccount: userInfo.userLoginAccount,
      shopIds: list.map(item => item.id),
    }).then(r => r.data.data)
  }, {
    manual: true,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      getProcessList()
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="p-4 bg-white">
      <SearchTable
        ref={ref}
        getListRequest={shopStoreAPI.getList}
        onDataChange={
          (data) => {
            setList(data.list)
          }
        }
        formItemConfigList={[
          ...StoreListSchema,
          {
            schema: {
              label: '操作',
              field: 'actions',
            },
            render(col, row) {
              const percent = Number(processList?.[row.id]?.replace('%', '') || 0)
              return (
                <div className="flex flex-col gap-2 items-center">
                  <Button
                    type="text"
                    className="-ml-4"
                    icon={<IconEdit />}
                    onClick={() => {
                      setCurrent(row)
                    }}
                  >
                    修改出货天数
                  </Button>
                  {percent ? <Progress percent={percent}></Progress> : null}
                </div>
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
              field: 'day',
              required: true,
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
