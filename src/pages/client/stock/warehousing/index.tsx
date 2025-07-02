import { Button, Empty, Modal, Spin, Tag, Timeline } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'
import ProductInfo from '../components/ProductInfo'

import { WarehousingApplyAPI } from '@/api/client/stock'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { formatDate } from '@/utils'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import ApplyWarehousingButton from '../components/ApplyWarehousingButton'

// 入库管理
export default () => {
  const [logsCurrent, setLogsCurrent] = useState<any>()

  const ref = useRef<SearchTableRef>()
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
        showRemoveButton={(record) => !['3', '4'].includes(record.storageStatus)}
        tableProps={{
          scroll: {
            x: 1200
          }
        }}
        leftTool={() => (
          <ApplyWarehousingButton refreshSearchTable={ref.current?.refreshSearchTable}></ApplyWarehousingButton>
        )}
        formItemConfigList={[
          {
            schema: {
              label: '入库编码',
              field: 'storageCode',
            },
            isSearch: true,
            width: 140,
          },
          {
            schema: {
              label: '发往仓库',
              field: 'sendWarehouse',
            },
            render(c) {
              return <EntrepotNameFC value={c}></EntrepotNameFC>
            },
            width: 120,
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
            width: 120,
            render(c) {
              return c || '-'
            },
          },
          {
            schema: {
              label: '发货/收货数量',
              field: 'sendProductCount',
            },
            render(c, row) {
              return <Tag color="blue">{`${row.sendProductCount || 0}/${row.receiveProductCount || 0}`}</Tag>
            },
            width: 140,
          },
          {
            schema: {
              label: '上架服务费',
              field: 'serviceCharge',
            },
            width: 120,
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
            },
            width: 120,
          },
          {
            schema: {
              label: '创建时间',
              field: 'createTime',
            },
            width: 120,
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
