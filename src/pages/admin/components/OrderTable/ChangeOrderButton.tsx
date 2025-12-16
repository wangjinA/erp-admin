import { orderAPI } from "@/api/admin/order"
import GoodsInfo from "@/components/GoodsInfo"
import LabelValue from "@/components/LabelValue"
import { DictNameFC } from "@/components/Selectors/DictSelector"
import { ShopNameFC } from "@/components/Selectors/ShopRadio"
import { ShopeeStatus } from "@/constants/order"
import { bus, EmitTypes } from "@/hooks/useEventBus"
import { OrderResponseItem } from "@/types/order"
import { showMessage, showModal } from "@/utils"
import { Button, Drawer, Form, Grid, Input, Space, Table } from "@arco-design/web-react"
import { useRequest } from "ahooks"
import { useState } from "react"

interface ChangeOrderButton {
  orderItem: OrderResponseItem
}

export default (props: ChangeOrderButton) => {
  const { orderItem } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm<{ shrimpOrderNo: string }>();

  const changeHandle = useRequest(async () => {
    const { shrimpOrderNo } = await form.validate();
    await showModal({
      content: `[${shrimpOrderNo}]确认换单重出？`
    })
    return showMessage(() => orderAPI.overseasWarehouseReturnReOutOverseasWarehouseReturnOrder({
      id: orderItem.id,
      orderNo: shrimpOrderNo
    }), '换单').then(() => {
      setVisible(false)
      bus.emit(EmitTypes.refreshOrderPage)
    })
  }, {
    manual: true
  })

  const searchHandle = useRequest(async () => {
    const { shrimpOrderNo } = await form.validate();
    return orderAPI.getList({
      "selectLogisticsOrderVO": {
        "shrimpOrderNo": shrimpOrderNo,
      },
      "selectOrderProductVO": {},
      "selectLogisticsVO": {},
      "pageNum": 1,
      "pageSize": 1
    } as any).then(r => r.data.data.list)
  }, {
    manual: true
  })

  return <>
    <Button
      status="success"
      size="small"
      onClick={() => {
        setVisible(true);
      }}
    >
      换单
    </Button>
    <Drawer
      title={`${orderItem.shrimpOrderNo} - 换单重出`}
      width="65%"
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
      footer={null}
    >
      <Form form={form}>
        <Grid.Row>
          <Grid.Col span={12}>
            <Form.Item field="shrimpOrderNo">
              <Input.Search
                placeholder="请输入订单编号"
                searchButton='查询'
                onSearch={() => {
                  searchHandle.run()
                }}>
              </Input.Search>
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
      </Form>
      <Table
        data={searchHandle.data}
        loading={searchHandle.loading}
        columns={[
          {
            title: '订单信息',
            dataIndex: 'orderInfo',
            width: 300,
            render(c, row) {
              return <Space direction="vertical" size={5}>
                <LabelValue label="订单编号" value={row.shrimpOrderNo} />
                <span className={[ShopeeStatus['取消中'], ShopeeStatus['已取消']].includes(row.shopeeStatus) ? 'text-red-500 font-bold' : ''}>
                  <LabelValue label="Shopee状态" value={<DictNameFC dictCode="shopee_status" value={row.shopeeStatus} />} />
                </span>
                <LabelValue label="店铺" value={<ShopNameFC value={row.platformShopId}></ShopNameFC>} />
                <LabelValue label="创建时间" value={row.createTime} />
                {/* <LabelValue label="最后发货时间" value={<ShopNameFC value={row.platformShopId}></ShopNameFC>} /> */}
              </Space>
            }
          }, {
            title: '商品信息',
            dataIndex: 'goodsInfo',
            render(c, row) {
              return <GoodsInfo data={row.orderProductVOList}></GoodsInfo>
            }
          }, {
            title: '操作',
            width: 120,
            dataIndex: 'actions',
            render() {
              return <Button
                type="text"
                status="success"
                loading={changeHandle.loading}
                onClick={() => {
                  changeHandle.run()
                }}>
                换单重出
              </Button>
            }
          }
        ]}>

      </Table>
    </Drawer>
  </>
}