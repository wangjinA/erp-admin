import { Button, Divider, Empty, Form, Modal, Spin, Tag, Timeline } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'

import ProductInfo from '../components/ProductInfo'

import { StockApplyInsert, WarehousingApplyAPI } from '@/api/client/stock'
import FilterForm from '@/components/FilterForm'
import LabelValue from '@/components/LabelValue'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { formatDate, showMessage } from '@/utils'

// 入库订单
export default () => {
  const [visible, setVisible] = useState(false)
  const [logsCurrent, setLogsCurrent] = useState<any>()
  const [warehouseingCurrent, setWarehouseingCurrent] = useState<StockApplyInsert>()

  const [form] = Form.useForm()
  const ref = useRef<SearchTableRef>()
  const { run, loading } = useRequest(async () => {
    const formData = await form.validate()

    return showMessage(() => WarehousingApplyAPI.warehousing({
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
        // leftTool={() => (
        //   <div>
        //     <Button
        //       type="primary"
        //       onClick={() => {
        //         setVisible(true)
        //       }}
        //       status="warning"
        //     >
        //       入库申请
        //     </Button>
        //   </div>
        // )}
        formItemConfigList={[
          {
            schema: {
              label: '申请信息',
              field: 'storageCode',
            },
            isSearch: true,
            render(c, row) {
              return (
                <div>
                  <LabelValue label="编码" value={row.storageCode}></LabelValue>
                  <LabelValue label="申请人" value={row.selectApplyUser?.account}></LabelValue>
                  <LabelValue label="用户标识" value={row.selectApplyUser?.number}></LabelValue>
                </div>
              )
            },
          },
          {
            schema: {
              label: '所属仓库',
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
                    status="default"
                    loading={logsLoading}
                    onClick={() => {
                      setWarehouseingCurrent(row)
                    }}
                  >
                    入库
                  </Button>
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
        {
          ...{
            visible: !!warehouseingCurrent,
            title: '入库申请',
            onCancel: () => setWarehouseingCurrent(null),
            confirmLoading: loading,
            onOk: async () => {
              run()
            },
            okText: '入库',
          }
        }
      >
        <div>
          <div>
            <LabelValue label="仓库名称" value={<EntrepotNameFC value={warehouseingCurrent?.sendWarehouse}></EntrepotNameFC>}></LabelValue>
            <LabelValue
              label="快递单号"
              value={
                warehouseingCurrent?.expressNo?.split(',').map(o => <Tag color="blue" key={o}>{o}</Tag>)
              }
            >
            </LabelValue>
          </div>
          <Divider></Divider>
          <FilterForm
            span={24}
            formItemConfigList={[
              {
                schema: {
                  label: '上架服务费',
                  field: 'serviceCharge',
                },
                control: 'number',
                controlProps: {
                  suffix: '元',
                },
              },

            ]}
          >
          </FilterForm>
        </div>
      </Modal>
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
