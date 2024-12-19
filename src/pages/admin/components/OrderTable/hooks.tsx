import { Button, Space } from '@arco-design/web-react'

import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import ActionHistory from './ActionHistory'
import DeliveryButton from './DeliveryButton'
import SendCargoInfo from './SendCargoInfo'

import ShipmentButton from './ShipmentButton'

import { OrderTablePorps } from '.'

import { orderAPI } from '@/api/admin/order'
import GoodsInfo from '@/components/GoodsInfo'
import LabelValue from '@/components/LabelValue'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import TrackingNumber from '@/components/TrackingNumber'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { isAdmin } from '@/routes'
import { Order, OrderResponseItem } from '@/types/order'
import { showMessage, showModal, stringToMasked } from '@/utils'

export function useColumns(props: OrderTablePorps) {
  const { dictCode } = props
  const { pathname } = useLocation()
  const showMj = useMemo(() => {
    return ['/client/order/all'].includes(pathname)
  }, [pathname])
  const showActions = isAdmin()
  return [
    {
      title: '商品信息',
      dataIndex: 'orderProductVOList',
      width: 550,
      render(col) {
        return <GoodsInfo data={col}></GoodsInfo>
      },
      fixed: 'left',
    },
    {
      title: '发货信息',
      dataIndex: 'orderProductVOList_1',
      width: 210,
      render(col, row) {
        return <SendCargoInfo data={row}></SendCargoInfo>
      },
    },
    {
      title: '物流信息',
      dataIndex: 'logistics',
      width: 240,
      render(c, row) {
        return (
          <div className="border-r h-full p-2">
            {/* <LabelValue label="尾程物流" value={<DictNameFC value={row.orderPackageList[0]?.shippingCarrier} dictCode="logistics_channel"></DictNameFC>}></LabelValue> */}
            <LabelValue label="尾程物流" value={row.orderPackageList[0]?.shippingCarrier}></LabelValue>
            <LabelValue label="物流单号" value={<TrackingNumber orderItem={row}></TrackingNumber>}></LabelValue>
            {row.shippingTime ? <LabelValue label="出货时间" value={row.shippingTime}></LabelValue> : null}
            {/* <LabelValue
              label="查看单号"
              value={(
                <Button
                  className="px-1"
                  type="text"
                  icon={<IconFile />}
                  size="mini"
                >
                  查看面单
                </Button>
              )}
            >
            </LabelValue> */}
          </div>
        )
      },
    },
    ...(showMj
      ? [{
          title: '买家信息',
          dataIndex: 'seller',
          width: 180,
          render(c, row) {
            return (
              <div className="border-r h-full p-2">
                <LabelValue label="买家" value={stringToMasked(row.buyerUsername)}></LabelValue>
                <LabelValue label="收货人" value={stringToMasked(row.recipients)}></LabelValue>
                <LabelValue label="收货电话" value={stringToMasked(row.mobileNumber)}></LabelValue>
                <LabelValue label="收货地址" value={stringToMasked(row.detailedAddress)}></LabelValue>
              </div>
            )
          },
        }]
      : []),
    {
      title: '打包信息',
      dataIndex: 'db',
      width: 150,
      render(c, row) {
        return (
          <div className="border-r h-full p-2">
            <LabelValue label="打包仓库" value={<EntrepotNameFC value={row.sendWarehouse} />}></LabelValue>
            <LabelValue label="仓库备注" value={row.entrepotRemark}></LabelValue>
            <LabelValue label="卖家备注" value={row.remark}></LabelValue>
          </div>
        )
      },
    },
    ...(showMj
      ? [{
          title: '卖家信息',
          dataIndex: '卖家信息',
          width: 180,
          render(c, row: Order) {
            return (
              <div className="border-r h-full p-2">
                <LabelValue label="打包仓库" value={<EntrepotNameFC value={row.sendWarehouse} />}></LabelValue>
                {/* <LabelValue label="卖家标识" value="row"></LabelValue> */}
                <LabelValue label="卖家备注" value={row.remark}></LabelValue>
                <LabelValue label="仓库备注" value={row.entrepotRemark}></LabelValue>
              </div>
            )
          },
        }]
      : []),
    {
      title: '订单金额',
      dataIndex: 'fee',
      width: 200,
      render(c, row) {
        return (
          <div className="border-r h-full p-2">
            <LabelValue label="总费用(TWD)" value={row.orderAmount}></LabelValue>
            <LabelValue label="预估运费(TWD)" value={row.estimatedShippingFee}></LabelValue>
            <LabelValue label="实际运费(TWD)" value={row.actualShippingFee}></LabelValue>
          </div>
        )
      },
    },
    ...(dictCode === 'order_status'
      ? [
          // {
          //   title: isAdmin() ? '费用' : '货代费用',
          //   dataIndex: 'hd',
          //   width: 180,
          //   render(c, row) {
          //     return (
          //       <Descriptions
          //         size="small"
          //         className="h-full px-2"
          //         column={1}
          //         colon=" :"
          //         data={[
          //           {
          //             label: '总费用',
          //             value: 1.5,
          //           },
          //           {
          //             label: '打包费用',
          //             value: 1.5,
          //           },
          //           ...(isAdmin()
          //             ? [
          //                 {
          //                   label: '打包附加费用',
          //                   value: <Button>添加</Button>,
          //                 },
          //                 {
          //                   label: '增值费用',
          //                   value: <Button>添加</Button>,
          //                 },
          //               ]
          //             : []),
          //         ]}
          //         labelStyle={{ textAlign: 'right' }}
          //         style={{ marginBottom: 20 }}
          //       />
          //     )
          //   },
          // },
        ]
      : []),
    ...(showActions
      ? [{
          title: '操作',
          dataIndex: 'actions',
          width: 120,
          render(c, row: OrderResponseItem) {
            return (
              <div className="h-full p-2 flex justify-center">
                <Space direction="vertical" size={4}>
                  <Button
                    type="text"
                    size="small"
                    disabled={['5', '6'].includes(row.orderStatus)}
                    onClick={async () => {
                      await showModal({
                        content: '确定要取消打包吗？',
                        onOk() {
                          return showMessage(
                            () => orderAPI.cancel([row.id]),
                            '取消打包',
                          )
                        },
                      })
                      bus.emit(EmitTypes.refreshOrderPage)
                    }}
                  >
                    取消订单
                  </Button>
                  <DeliveryButton
                    sendWarehouse={row.sendWarehouse}
                    trackingNo={row.trackingNo}
                    shrimpOrderNo={row.shrimpOrderNo}
                    onSuccess={() => {
                      bus.emit(EmitTypes.refreshOrderPage)
                    }}
                    buttonProps={{ size: 'small', disabled: row.orderStatus !== '2' }}
                  />
                  <ShipmentButton
                    orderItem={row}
                    sendWarehouse={row.sendWarehouse}
                    trackingNo={row.trackingNo}
                    shrimpOrderNo={row.shrimpOrderNo}
                    onSuccess={() => {
                      bus.emit(EmitTypes.refreshOrderPage)
                    }}
                    buttonProps={{
                      size: 'small',
                      //  disabled: !row.needFill
                    }}
                  />
                  <ActionHistory
                    buttonProps={{
                      type: 'text',
                      icon: null,
                    }}
                    id={row.id}
                  >
                  </ActionHistory>
                </Space>
              </div>
            )
          },
        }]
      : []
    ),
  ]
}
