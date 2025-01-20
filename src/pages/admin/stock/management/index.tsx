import { Button, Divider, Empty, Form, InputNumber, Message, Modal, Space, Spin, Table, Tag, Timeline } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'

import ProductInfo from '../components/ProductInfo'

import { StockApplyAdmin, WarehousingApplyAPI, WarehousingBody } from '@/api/client/stock'
import LabelValue from '@/components/LabelValue'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { ModalWidth } from '@/pages/client/stock/products'
import { formatDate, showMessage } from '@/utils'
// 入库订单
export default () => {
  const [visible, setVisible] = useState(false)
  const [logsCurrent, setLogsCurrent] = useState<any>()
  const [warehouseingCurrent, setWarehouseingCurrent] = useState<StockApplyAdmin>()
  const [warehousingData, setWarehousingData] = useState<WarehousingBody>()

  const [form] = Form.useForm()
  const ref = useRef<SearchTableRef>()
  const { run, loading } = useRequest(async () => {
    if (warehousingData?.serviceCharge === undefined) {
      return Message.error({
        content: '请填写上架服务费',
        duration: 2500,
      })
    }
    else if (warehousingData?.putStorageProductVOS.every(item => !item.receiveProductCount)) {
      return Message.error({
        content: '请至少输入一个收货数量',
        duration: 2500,
      })
    }
    return showMessage(() => WarehousingApplyAPI.warehousing(warehousingData)).then(() => {
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
                      setWarehousingData({
                        applyId: row.id,
                        putStorageProductVOS: row.logisticsProductList.map(item => ({
                          id: item.id,
                          logisticsProductId: item.logisticsProductId,
                          productStorageId: item.productStorageId,
                          receiveProductCount: item.receiveProductCount || 0,
                        })),
                        sendWarehouse: row.sendWarehouse,
                        serviceCharge: undefined,
                      })
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
            style: {
              width: ModalWidth,
            },
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
          <Space direction="vertical">
            <LabelValue label="仓库名称" value={<EntrepotNameFC value={warehouseingCurrent?.sendWarehouse}></EntrepotNameFC>}></LabelValue>
            <LabelValue
              label="快递单号"
              value={
                warehouseingCurrent?.expressNo?.split(',').map(o => <Tag color="blue" key={o}>{o}</Tag>)
              }
            >
            </LabelValue>
            <LabelValue
              className="flex"
              label="上架服务费"
              value={(
                <InputNumber
                  size="mini"
                  placeholder="请输入"
                  suffix="元"
                  onChange={(e) => {
                    setWarehousingData((draft) => {
                      draft.serviceCharge = e
                      return draft
                    })
                  }}
                >
                </InputNumber>
              )}
            >
            </LabelValue>

          </Space>
          <Divider></Divider>

          <Table
            size="small"
            data={warehouseingCurrent?.logisticsProductList}
            columns={[
              {
                title: '商品信息',
                dataIndex: 'goodsInfo',
                width: 250,
                render(c, row) {
                  return <ProductInfo data={row}></ProductInfo>
                },
              },
              {
                width: 120,
                title: '商品数量',
                dataIndex: 'sendProductCount',
              },
              {
                title: '收货数量',
                dataIndex: 'receiveProductCount',
                render(c, row, index) {
                  return (
                    <InputNumber
                      placeholder="请输入"
                      defaultValue={c}
                      suffix="件"
                      onChange={(e) => {
                        setWarehousingData((darft) => {
                          darft.putStorageProductVOS[index].receiveProductCount = e
                          return darft
                        })
                      }}
                    >
                    </InputNumber>
                  )
                },
              },
            // {
            //   title: '仓位',
            //   dataIndex: 'warehousePosition',
            // }
            ]}
          >

          </Table>
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
