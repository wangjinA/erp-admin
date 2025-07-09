import { Button, ButtonProps, Descriptions, Form, Grid, InputNumber, List, Modal, Space, Table, Image } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { omit, pick } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { orderAPI } from '@/api/admin/order'
import FilterForm from '@/components/FilterForm'
import LabelValue from '@/components/LabelValue'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'
import classNames from 'classnames'
import { DeliveryButton } from './DeliveryButton'
import { ShopeeStatus } from '@/constants/order'
import { SendStockCargoItemInfo } from './SendStockCargoInfos'

interface OrderDetailButtonProps {
  orderItem?: OrderResponseItem
  buttonProps?: ButtonProps
  onSuccess: () => void
}

function OrderDetailButton(props: OrderDetailButtonProps) {
  const { orderItem, buttonProps, onSuccess } = props
  const [visible, setVisible] = useState(false)
  const [actualQuantityList, setActualQuantityList] = useState([])
  const [holdStockList, setHoldStockList] = useState([])
  const [updatedOrderItem, setUpdatedOrderItem] = useState<OrderResponseItem>()
  const saveHandler = useRequest(async () => {
    if (updatedOrderItem) {
      await showMessage(() => orderAPI.saveOrder({
        ...(omit(updatedOrderItem, ['orderProductVOList', 'orderPackageList'])),
        logisticsOrderProductVOList: updatedOrderItem.orderProductVOList.map((item, i) => ({
          ...item,
          actualQuantity: actualQuantityList[i] || item.actualQuantity,
          holdStock: holdStockList[i] || item.holdStock,
        })),
        logisticsOrderPackageList: updatedOrderItem.orderPackageList,
      }), '保存')
    }
    setVisible(false)
    bus.emit(EmitTypes.refreshOrderPage)
  }, {
    manual: true,
  })

  useEffect(() => {
    if (visible && orderItem?.orderProductVOList) {
      setActualQuantityList(orderItem.orderProductVOList.map(o => o.actualQuantity))
      setHoldStockList(orderItem.orderProductVOList.map(o => o.holdStock))
    }
  }, [visible])

  const modalRef = useRef<HTMLDivElement>();
  const deliveryRef = useRef<HTMLButtonElement>();
  const enterRef = useRef((e) => {
    console.log('按钮')
    if (e.key === 'Enter') {
      if (deliveryRef.current.disabled) {
        console.log('保存')
        saveHandler.run()
      } else {
        console.log('出库')
        deliveryRef.current.click();
      }
      e.preventDefault();
      e.stopPropagation();
    }
  })

  useEffect(() => {
    if (visible && modalRef.current) {
      console.log('绑定')
      modalRef.current.addEventListener('keydown', enterRef.current)
    }
    return () => {
      modalRef.current?.removeEventListener('keydown', enterRef.current)
    }
  }, [visible, modalRef.current])

return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
        type="text"
        {...buttonProps}
      >
        {
          ['1', '2'].includes(orderItem.orderStatus) ? '包裹出库' : '包裹详情'
        }
      </Button>
      <Modal
        style={{
          width: 1200,
          // height: 600,
        }}
        title={(
          <div>
            {`包裹详情 - 订单编号：${orderItem?.shrimpOrderNo}`}
          </div>
        )}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={(
          <Space className="ml-auto">
            <Button onClick={() => {
              setVisible(false)
            }}
            >
              关闭
            </Button>
            <Button
              type="primary"
              loading={saveHandler.loading}
              onClick={() => {
                saveHandler.run()
              }}
            >
              保存
            </Button>
            {/* <Button type="primary" status="warning">交运</Button> */}
            <DeliveryButton
              ref={deliveryRef}
              buttonProps={{
                type: "primary",
                status: "danger",
                disabled: orderItem.orderStatus !== '2' || [ShopeeStatus['取消中'], ShopeeStatus['已取消']].includes(orderItem.shopeeStatus),
              }}
              orderItem={orderItem}
              sendWarehouse={orderItem.sendWarehouse}
              shrimpOrderNo={orderItem.shrimpOrderNo}
              onSuccess={onSuccess}
            />
          </Space>
        )}
      >
        <div className="" tabIndex={-1} ref={modalRef}
        >
          <Table
            rowKey="id"
            pagination={false}
            scroll={{
              // x: 1600,
              y: 400,
            }}
            border={{
              wrapper: true,
              cell: true,
            }}
            data={orderItem.orderProductVOList}
            columns={[
              {
                title: '商品信息',
                dataIndex: '0',
                width: 450,
                render(col, item) {
                  return (
                    <div
                      key={item.id}
                      className={classNames([
                        'grid',
                        'h-[125px]',
                        // index > 0 ? 'border-t' : '',
                      ])}
                    >
                      <List.Item.Meta
                        className="!items-center p-2 w-full"
                        avatar={<Image className="size-24" src={item.productImg?.[0]} />}
                        title={`${item.productName.slice(0, 25)}...`}
                        // title={`${item.productName}...`}
                        description={(
                          <div>
                            <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="单  价" value={item.unitPrice}></LabelValue>
                            <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="数  量" value={item.quantity}></LabelValue>
                            <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="规格名称" value={item.specificationName}></LabelValue>
                            <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="规格SKU" value={item.sku}></LabelValue>
                          </div>
                        )}
                      />
                    </div>
                  )
                },
              },
              {
                title: '发货信息',
                dataIndex: 'fhxx',
                width: 250,
                render(col, row) {
                  return <SendStockCargoItemInfo
                    item={row}
                    orderStatus={orderItem.orderStatus}
                    sendWarehouse={orderItem.sendWarehouse}
                    orderId={orderItem.id}
                  />
                  // return <SendCargoItemInfo
                  //   item={row}
                  //   orderStatus={orderItem.orderStatus}
                  //   sendWarehouse={orderItem.sendWarehouse}
                  //   orderId={orderItem.id}
                  // />
                },
              },
              {
                title: '收货信息',
                dataIndex: 'shxx',
                width: 250,
                render(col, row, i) {
                  return (
                    <Form.Item label="实际数量" layout="vertical" colon={true}>
                      <InputNumber placeholder="请输入" value={actualQuantityList[i] || row.actualQuantity} onChange={e => {
                        actualQuantityList[i] = e;
                        setActualQuantityList([...actualQuantityList])
                      }}></InputNumber>
                    </Form.Item>
                  )
                },
              },
              // {
              //   title: '保留库存',
              //   dataIndex: 'blkc',
              //   width: 100,
              //   render(col, row, i) {
              //     return (
              //       <Switch checked={holdStockList[i] ?? row.holdStock} onChange={e => {
              //         holdStockList[i] = e;
              //         setHoldStockList([...holdStockList])
              //       }}></Switch>
              //     )
              //   },
              // },
            ]}
          >

          </Table>
          <Grid.Row className="mt-4">
            <Grid.Col span={12}>
              <div>
                <LabelValue label="卖家备注" value="暂无备注"></LabelValue>
                <LabelValue label="打包要求" value="暂无要求"></LabelValue>
                <LabelValue label="温馨提示" value={<span className="text-red-700 font-bold"><DictNameFC dictCode="tips" value="xpddd"></DictNameFC></span>}></LabelValue>
              </div>
            </Grid.Col>
            <Grid.Col span={12}>
              <div className="flex-1 border-l">
                <div className="flex">
                  <FilterForm
                    className="w-[300px]"
                    size="small"
                    span={24}
                    initialValues={{
                      ...pick(orderItem, ['parcelType', 'parcelWeight', 'parcelLength', 'parcelWide', 'parcelHigh']),
                      transportType: orderItem.transportType || 'KY',
                      parcelType: orderItem.parcelType || '0'
                    }}
                    onValuesChange={(v) => {
                      setUpdatedOrderItem({
                        ...orderItem,
                        ...v,
                      })
                    }}
                    formItemConfigList={[
                      {
                        schema: {
                          label: '运输类型',
                          field: 'transportType',
                        },
                        control: 'dictSelector',
                        controlProps: {
                          dictCode: 'transport_type',
                        },
                      },
                      {
                        schema: {
                          label: '包裹类型',
                          field: 'parcelType',
                        },
                        control: 'dictSelector',
                        controlProps: {
                          dictCode: 'parcel_type',
                        },
                      },
                      {
                        schema: {
                          label: '包裹重量',
                          field: 'parcelWeight',
                        },
                        control: 'number'
                      },
                      {
                        schema: {
                          label: '包裹长度',
                          field: 'parcelLength',
                        },
                        control: 'number'
                      },
                      {
                        schema: {
                          label: '包裹宽度',
                          field: 'parcelWide',
                        },
                        control: 'number'
                      },
                      {
                        schema: {
                          label: '包裹高度',
                          field: 'parcelHigh',
                        },
                        control: 'number'
                      },
                    ]}
                  >

                  </FilterForm>
                  <div
                    className="flex-1 border-l px-2"
                  >
                    <Descriptions
                      column={1}
                      colon={true}
                      data={[
                        {
                          label: '基本费用：',
                          value: '1',
                        },
                        {
                          label: '头程费用：',
                          value: orderItem.firstLegCost,
                        },
                        {
                          label: '附加费用：',
                          value: orderItem.appendCost,
                        },
                        {
                          label: '总费用：',
                          value: orderItem.totalCost,
                        },
                      ]}
                      style={{ marginBottom: 20 }}
                      labelStyle={{ paddingRight: 36 }}
                    />
                  </div>
                </div>
              </div>
            </Grid.Col>
          </Grid.Row>
        </div>
      </Modal>
    </>
  )
}
export default OrderDetailButton
