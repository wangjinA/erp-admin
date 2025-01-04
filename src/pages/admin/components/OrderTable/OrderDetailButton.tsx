import { Button, ButtonProps, Descriptions, Divider, Form, InputNumber, Modal, Space, Switch } from '@arco-design/web-react'

import { useState } from 'react'

import SendCargoInfo from './SendCargoInfo'

import FilterForm from '@/components/FilterForm'
import GoodsInfo from '@/components/GoodsInfo'
import LabelValue from '@/components/LabelValue'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import { OrderResponseItem } from '@/types/order'

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
  dataIndex: 'orderProductVOList_1',
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
  dataIndex: 'orderProductVOList_1',
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
                  formItemConfigList={[
                    {
                      schema: {
                        label: '包裹类型',
                        field: 'parcelType',
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
                        value: '',
                      },
                      {
                        label: '附加费用',
                        value: '',
                      },
                      {
                        label: '总费用',
                        value: '',
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
              <Button type="primary">保存</Button>
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
