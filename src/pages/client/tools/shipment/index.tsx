import { Button, Form, Modal, Progress } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import StoreListSchema from '../../store/list/schema'

import { ShopStore, shopStoreAPI } from '@/api/client/shopStore'
import { ProcessInfo, shipmentAPI } from '@/api/shopeeUtils/shipment'
import FilterForm from '@/components/FilterForm'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import StatusTag from '@/components/StatusTag'
import { GlobalState } from '@/store'
import { showMessage } from '@/utils'
import { secondsToDateString } from '@/utils/date'

interface StoreListProps {}
const StoreList: React.FC<StoreListProps> = (props) => {
  const { userInfo } = useSelector((state: GlobalState) => state)
  const ref = useRef<SearchTableRef>()
  const [current, setCurrent] = useState<ShopStore>()
  const [processInfo, setProcessInfo] = useState<ProcessInfo>(null)
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

  useEffect(() => {
    let timer
    function fn() {
      const ids = list?.map(item => item.id) || []
      if (!ids.length)
        return
      return shipmentAPI.getProcess({
        userLoginAccount: userInfo.userLoginAccount,
        shopIds: list.map(item => item.id),
      }).then((r) => {
        setProcessInfo(r.data.data)
      }).finally(() => {
        timer = setTimeout(fn, 1500)
      })
    }
    fn()
    return () => {
      clearTimeout(timer)
    }
  }, [JSON.stringify(list),
  ])

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
          ...StoreListSchema.filter(e => !['region', 'storeType'].includes(e.schema.field)),
          {
            schema: {
              label: '操作',
              field: 'actions',
            },
            render(col, row) {
              const targetProgressInfo = processInfo?.progress?.[row.id]
              const percent = Number(targetProgressInfo?.value?.replace('%', '') || 0)
              const errorMsg = targetProgressInfo?.error ? `,修改出错:${targetProgressInfo?.error}` : ''
              return (
                <div className="flex flex-col items-center">
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
                  {(percent || errorMsg)
                    ? (
                        <div className="pl-4">
                          <Progress className="mb-1" percent={percent}></Progress>
                          {(targetProgressInfo?.duration || errorMsg)
                            ? (
                                <StatusTag
                                  tagInfos={[{
                                    text: `商品数量：${targetProgressInfo.goodsTotal}，时长：${secondsToDateString(targetProgressInfo.duration)}${errorMsg}`,
                                    value: 0,
                                    color: errorMsg ? 'red' : 'green',
                                  }]}
                                  value={0}
                                >
                                </StatusTag>
                              )
                            : null}
                        </div>
                      )
                    : null}
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
            controlProps: {
              max: 30,
              min: 2,
            },
          }]}
        >
        </FilterForm>
      </Modal>
    </div>
  )
}

export default StoreList
