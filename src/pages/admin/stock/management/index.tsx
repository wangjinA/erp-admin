import { Button, Divider, Empty, Input, InputNumber, Message, Modal, Space, Spin, Table, Tag, Timeline } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'

import { StockApplyAdmin, WarehousingApplyAPI, WarehousingBody } from '@/api/client/stock'
import LabelValue from '@/components/LabelValue'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { ModalWidth } from '@/pages/client/stock/products'
import { formatDate, showMessage } from '@/utils'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import ProductInfo from '@/pages/client/stock/components/ProductInfo'
// 入库订单
export default () => {
  const [logsCurrent, setLogsCurrent] = useState<any>()
  const [warehouseingCurrent, setWarehouseingCurrent] = useState<StockApplyAdmin>()
  const [warehousingData, setWarehousingData] = useState<WarehousingBody>()
  const [currentNumber, setCurrentNumber] = useState<number[]>([]);
  const [currentServiceCharge, setCurrentServiceCharge] = useState<number>(0);
  const [remarksCurrent, setRemarksCurrent] = useState<any>()
  const [remarksValue, setRemarksValue] = useState<string>('');

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
      setWarehouseingCurrent(null);
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

  const { run: remarksRun, loading: remarksLoading } = useRequest(async () => {
    if (!remarksCurrent?.id || remarksValue === undefined) {
      return Message.error({
        content: '请填写备注信息',
        duration: 2500,
      })
    }
    return showMessage(() => WarehousingApplyAPI.setRemark({
      id: remarksCurrent.id,
      remarks: remarksValue
    })).then(() => {
      setRemarksCurrent(null);
      setRemarksValue('');
      ref.current.refreshSearchTable()
    })
  }, {
    manual: true,
  })

  return (
    <div className="bg-white p-4">
      <SearchTable
        ref={ref}
        name="入库订单"
        getListRequest={WarehousingApplyAPI.getList}
        tableProps={{
          scroll: {
            x: 1350,
          }
        }}
        formItemConfigList={[
          {
            schema: {
              label: '申请信息',
              field: 'storageCode',
            },
            isSearch: true,
            width: 230,
            render(c, row) {
              return (
                <div>
                  <LabelValue label="编码" value={row.storageCode}></LabelValue>
                  <LabelValue label="申请人" value={row.userName}></LabelValue>
                  <LabelValue label="用户编号" value={row.tenantryNo}></LabelValue>
                  <LabelValue label="所属仓库" value={<EntrepotNameFC value={row.sendWarehouse}></EntrepotNameFC>}></LabelValue>
                </div>
              )
            },
          },
          {
            schema: {
              label: '商品信息',
              field: 'logisticsProductList',
            },
            width: 320,
            render(c) {
              return <div>
                {c.map(item => {
                  return <div key={item.id} className="flex items-center">
                    <ProductInfo data={item}></ProductInfo>
                    <Tag color="blue">{`${item.sendProductCount || 0}/${item.receiveProductCount || 0}`}</Tag>
                  </div>
                })}
              </div>
            },
          },
          {
            schema: {
              label: '商品名称',
              field: 'productName',
            },
            isSearch: true,
            hideTable: true,
          },
          {
            schema: {
              label: '快递单号',
              field: 'expressNo',
            },
            width: 120,
            isSearch: true,
            render(c) {
              return c
            }
          },
          {
            schema: {
              label: '发货/收货数量',
              field: 'sendProductCount',
            },
            width: 160,
            render(c, row) {
              return <Tag color="blue">{`${row.sendProductCount || 0}/${row.receiveProductCount || 0}`}</Tag>
            },
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
            width: 100,
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
            width: 160,
          },
          {
            schema: {
              label: '备注',
              field: 'remarks',
            },
            width: 120,
            render(c) {
              return c || '-'
            }
          },
          {
            schema: {
              label: '操作',
              field: 'actions',
            },
            width: 150,
            render(c, row) {
              return (
                <div>
                  {
                    !['3', '4'].includes(row.storageStatus) ? <Button
                      type="text"
                      size="small"
                      status="default"
                      loading={logsLoading}
                      onClick={() => {
                        console.log(row.logisticsProductList)
                        setWarehousingData({
                          applyId: row.id,
                          putStorageProductVOS: row.logisticsProductList.map(item => ({
                            id: item.id,
                            logisticsProductId: item.logisticsProductId,
                            productStorageId: item.productStorageId,
                            receiveProductCount: item.sendProductCount || 0,
                          })),
                          sendWarehouse: row.sendWarehouse,
                          serviceCharge: undefined,
                        })
                        setCurrentNumber(row.logisticsProductList.map(o => o.sendProductCount));
                        setCurrentServiceCharge(0);
                        setWarehouseingCurrent(row)
                      }}
                    >
                      入库
                    </Button> : null
                  }
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
                  <Button
                    type="text"
                    size="small"
                    status="success"
                    loading={remarksLoading}
                    onClick={() => {
                      setRemarksCurrent(row)
                      setRemarksValue(row.remarks || '')
                    }}
                  >
                    备注
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
                  value={currentServiceCharge}
                  size="mini"
                  placeholder="请输入"
                  suffix="元"
                  onChange={(e) => {
                    setCurrentServiceCharge(e);
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
                      value={currentNumber[index]}
                      placeholder="请输入"
                      defaultValue={c}
                      suffix="件"
                      onChange={(e) => {
                        currentNumber[index] = e;
                        setCurrentNumber([...currentNumber]);
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
      <Modal
        title="设置备注"
        visible={!!remarksCurrent}
        onCancel={() => {
          setRemarksCurrent(null)
          setRemarksValue('')
        }}
        confirmLoading={remarksLoading}
        onOk={remarksRun}
        okText="保存"
        cancelText="取消"
        unmountOnExit={true}
      >
        <div className="py-4">
          <Input.TextArea
            placeholder="请输入备注信息"
            value={remarksValue}
            onChange={(value) => setRemarksValue(value)}
            rows={4}
            maxLength={500}
            showWordLimit
          />
        </div>
      </Modal>
    </div>
  )
}
