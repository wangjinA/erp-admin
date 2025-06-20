import { Button, Empty, Form, Modal, Spin, Timeline } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'

import ApplyWarehousingModal from '../components/ApplyWarehousingModal'
import ProductInfo from '../components/ProductInfo'

import { WarehousingApplyAPI } from '@/api/client/stock'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { formatDate, showMessage } from '@/utils'
import { DictNameFC } from '@/components/Selectors/DictSelector'

// 入库管理
export default () => {
  const [visible, setVisible] = useState(false)
  const [logsCurrent, setLogsCurrent] = useState<any>()

  const [form] = Form.useForm()
  const ref = useRef<SearchTableRef>()
  const { run, loading } = useRequest(async () => {
    const formData = await form.validate()

    return showMessage(() => WarehousingApplyAPI.insert({
      ...formData,
      expressNo: formData.expressNo?.toString(),
      stockStorageApplyProductList: formData.stockStorageApplyProductList.map(item => ({
        logisticsProductId: item.id,
        sendProductCount: item.num, // 发货数量
      })),
    })).then(() => {
      setVisible(false)
      ref.current.refreshSearchTable()
    })
  }, {
    manual: true,
  })
  const { run: logsRun, data: logData, loading: logsLoading } = useRequest(async (id) => {
    if (id) {
      return WarehousingApplyAPI.logs(id).then(r => r.data.data.list)
    }
  }, {
    manual: true,
  })

  return (
    <div className="bg-white p-4">
      <SearchTable
        ref={ref}
        name="入库申请"
        getListRequest={WarehousingApplyAPI.getList}
        removeRequest={WarehousingApplyAPI.remove}
        leftTool={() => (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setVisible(true)
              }}
              status="warning"
            >
              入库申请
            </Button>
          </div>
        )}
        formItemConfigList={[
          {
            schema: {
              label: '入库编码',
              field: 'storageCode',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '发往仓库',
              field: 'sendWarehouse',
            },
            render(c) {
              return <EntrepotNameFC value={c}></EntrepotNameFC>
            },
          },
          {
            schema: {
              label: '商品信息',
              field: 'logisticsProductList',
            },
            width: 300,
            render(c) {
              return c.map(item => <ProductInfo key={item.id} data={item}></ProductInfo>)
            },
          },
          {
            schema: {
              label: '商品名称',
              field: 'goodsInfo',
            },
            isSearch: true,
            hideTable: true,
          },

          {
            schema: {
              label: '快递单号',
              field: 'expressNo',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '发货/收货数量',
              field: 'sendProductCount',
            },
            render(c, row) {
              return <div>{`${row.sendProductCount || 0}/${row.receiveProductCount || 0}`}</div>
            },
          },
          {
            schema: {
              label: '上架服务费',
              field: 'serviceCharge',
            },
          },
          {
            schema: {
              label: '状态',
              field: 'storageStatus',
            },
            isSearch: true,
            control: 'dictSelector',
            controlProps: {
              dictCode: 'storage_status',
            },
            render(c) {
              return <DictNameFC dictCode="storage_status" value={c}></DictNameFC>
            }
          },
          {
            schema: {
              label: '创建时间',
              field: 'createTime',
            },
          },
          {
            schema: {
              label: '操作',
              field: 'actions',
            },
            render(c, row) {
              return (
                <div>
                  <Button
                    type="text"
                    size="small"
                    status="warning"
                    loading={logsLoading}
                    onClick={() => {
                      setLogsCurrent(row)
                      logsRun(row.id)
                    }}
                  >
                    操作记录
                  </Button>
                </div>
              )
            },
          },
        ]}
      >

      </SearchTable>
      <ApplyWarehousingModal
        form={form}
        modalProps={{
          visible,
          title: '入库申请',
          onCancel: () => setVisible(false),
          confirmLoading: loading,
          onOk: async () => {
            run()
          },

        }}
      >
      </ApplyWarehousingModal>
      <Modal
        title="操作记录"
        visible={logsCurrent}
        onCancel={() => setLogsCurrent(null)}
        cancelText="关闭"
        unmountOnExit={true}
        onOk={async () => {
          setLogsCurrent(null)
        }}
      >
        <Spin
          loading={logsLoading}
          className="mx-auto block max-h-96 overflow-y-auto"
        >
          {!logsLoading && logData
            ? (
                <Timeline>
                  {logData.map(item => (
                    <Timeline.Item
                      key={item.id}
                      label={item.operationContent || '-'}
                    >
                      <span>{item.operationProcedure}</span>
                      <span className="text-gray-500">
                        {formatDate(item.createTime)}
                      </span>
                    </Timeline.Item>
                  ))}
                </Timeline>
              )
            : (
                <Empty description="暂无记录"></Empty>
              )}
        </Spin>
      </Modal>
    </div>
  )
}
