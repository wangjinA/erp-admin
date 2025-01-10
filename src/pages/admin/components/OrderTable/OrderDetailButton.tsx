import { Button, ButtonProps, Descriptions, Divider, Form, Image, InputNumber, List, Modal, Space, Switch, Table } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import classNames from 'classnames'
import { pick } from 'lodash'
import { useState } from 'react'

import SendCargoInfo from './SendCargoInfo'

import { orderAPI } from '@/api/admin/order'
import FilterForm from '@/components/FilterForm'
import GoodsInfo from '@/components/GoodsInfo'
import LabelValue from '@/components/LabelValue'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'

interface OrderDetailButtonProps {
  orderItem?: OrderResponseItem
  buttonProps?: ButtonProps
}

const columns = [{
  title: '商品信息',
  dataIndex: 'orderProductVOList',
  width: 300,
  render(col) {
    return <GoodsInfo data={col}></GoodsInfo>
  },
  fixed: 'left',
}, {
  title: '发货信息',
  dataIndex: 'orderProductVOList_1',
  width: 210,
  render(col, row) {
    return <SendCargoInfo data={row}></SendCargoInfo>
  },
}, {
  title: '收货信息',
  dataIndex: 'orderProductVOList_2',
  width: 210,
  render(col, row) {
    return (
      <div>
        <Form.Item label="实际数量" layout="vertical" colon={true}>
          <InputNumber placeholder="请输入"></InputNumber>
        </Form.Item>
      </div>
    )
  },
}, {
  title: '保留库存',
  dataIndex: 'orderProductVOList_3',
  width: 210,
  render(col, row) {
    return (
      <div className="p-8">
        <Switch></Switch>
      </div>
    )
  },
}]

function OrderDetailButton(props: OrderDetailButtonProps) {
  const { orderItem, buttonProps } = props
  const [visible, setVisible] = useState(false)
  const [updatedOrderItem, setUpdatedOrderItem] = useState<OrderResponseItem>()
  const saveHandler = useRequest(async () => {
    if (updatedOrderItem) {
      await showMessage(() => orderAPI.saveOrder(updatedOrderItem))
    }
    setVisible(false)
    bus.emit(EmitTypes.refreshOrderPage)
  }, {
    manual: true,
  })
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
          height: 700,
        }}
        title={(
          <div>
            {`包裹详情 - 订单编号：${orderItem?.shrimpOrderNo}`}
          </div>
        )}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className="h-[600px]">

          <div className="flex-1 flex">
            <div className="w-[700px] p-2">
              <div className="h-[425px]">
                <header className="flex items-center">
                  {columns.map(item => (
                    <div
                      className="font-medium px-4 py-2"
                      style={{
                        width: item.width,
                        flex: item.width ? 'auto' : 1,
                      }}
                      key={item.dataIndex}
                    >
                      {item.title}
                    </div>
                  ))}
                </header>
                <main className="flex flex-col gap-4 bg-white text-left">
                  <div className="border">
                    <main className="flex p-1">
                      {columns.map(oitem => (
                        <div
                          style={{
                            width: oitem.width,
                            flex: oitem.width ? 'auto' : 1,
                          }}
                          key={oitem.dataIndex}
                        >
                          {oitem.render(orderItem[oitem.dataIndex], orderItem)}
                        </div>
                      ))}
                    </main>
                  </div>
                </main>
                <Table
                  data={orderItem.orderProductVOList}
                  columns={[
                    {
                      title: '商品信息',
                      dataIndex: '0',
                      width: 550,
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
                              avatar={<Image className="size-24" src={item.productImg[0]} />}
                              title={item.productName}
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
                      width: 550,
                      render() {
                        return <SendCargoInfo data={orderItem}></SendCargoInfo>
                      },
                    },
                    {
                      title: '收货信息',
                      dataIndex: 'fhxx',
                      width: 550,
                      render() {
                        return (
                          <Form.Item label="实际数量" layout="vertical" colon={true}>
                            <InputNumber placeholder="请输入"></InputNumber>
                          </Form.Item>
                        )
                      },
                    },
                    {
                      title: '发货信息',
                      dataIndex: '保留库存',
                      width: 550,
                    },
                  ]}
                >

                </Table>
              </div>
              <Divider className="my-4"></Divider>
              <div>
                <LabelValue label="卖家备注" value="暂无备注"></LabelValue>
                <LabelValue label="打包要求" value="暂无要求"></LabelValue>
                <LabelValue label="温馨提示" value={<span className="text-red-700 font-bold"><DictNameFC dictCode="tips" value="xpddd"></DictNameFC></span>}></LabelValue>
              </div>
            </div>
            <div className="flex-1 border-l">
              <div className="flex">
                <FilterForm
                  className="w-[300px]"
                  size="small"
                  span={24}
                  initialValues={pick(orderItem, ['parcelType', 'parcelWeight', 'parcelLength', 'parcelWide', 'parcelHigh'])}
                  onValuesChange={(v) => {
                    setUpdatedOrderItem({
                      ...orderItem,
                      ...v,
                    })
                  }}
                  formItemConfigList={[
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
                    },
                    {
                      schema: {
                        label: '包裹长度',
                        field: 'parcelLength',
                      },
                    },
                    {
                      schema: {
                        label: '包裹宽度',
                        field: 'parcelWide',
                      },
                    },
                    {
                      schema: {
                        label: '包裹高度',
                        field: 'parcelHigh',
                      },
                    },
                  ]}
                >

                </FilterForm>
                <div
                  className="flex-1 border-l p-2"
                >
                  <Descriptions
                    column={1}
                    colon={true}
                    data={[
                      {
                        label: '基本费用',
                        value: '1',
                      },
                      {
                        label: '头程费用',
                        value: orderItem.firstLegCost,
                      },
                      {
                        label: '附加费用',
                        value: orderItem.appendCost,
                      },
                      {
                        label: '总费用',
                        value: orderItem.totalCost,
                      },
                    ]}
                    style={{ marginBottom: 20 }}
                    labelStyle={{ paddingRight: 36 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <footer className="h-[60px] border-t flex">
            <Space className="ml-auto">
              <Button onClick={() => {
                setVisible(false)
              }}
              >
                关闭
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  saveHandler.run()
                }}
              >
                保存
              </Button>
              <Button type="primary" status="warning">交运</Button>
              <Button type="primary" status="danger">出库</Button>
            </Space>
          </footer>
        </div>
      </Modal>
    </>
  )
}
export default OrderDetailButton
