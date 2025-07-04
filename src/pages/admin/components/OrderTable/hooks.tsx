import { Tag, Typography } from '@arco-design/web-react'
import { OrderTablePorps } from '.'
import GoodsInfo from '@/components/GoodsInfo'
import LabelValue from '@/components/LabelValue'
import TrackingNumber from '@/components/TrackingNumber'
import { isAdmin, isClient } from '@/routes'
import { OrderResponseItem } from '@/types/order'
import { stringToMasked } from '@/utils'
import { ShippingCarrierColorMap } from '@/constants/order'
import classNames from 'classnames'
import OrderTableActions from './admin/OrderTableActions'
import { useLocation } from "react-router"
import { OrderPageDict } from '@/pages/client/order/orderPage'
import SendInfos from './SendStockCargoInfos'

export function useColumns(props: OrderTablePorps) {
  const { dictCode } = props
  const location = useLocation()

  const showActions = (isClient() && dictCode === OrderPageDict.OUT_ORDER_STATUS) || (isAdmin() && !location.pathname.includes('business/returnToShelves'))
  return [
    {
      title: '商品信息',
      dataIndex: 'orderProductVOList',
      width: 500,
      render(col) {
        return <GoodsInfo data={col}></GoodsInfo>
      },
      fixed: 'left',
    },
    {
      title: '发货信息',
      dataIndex: 'orderProductVOList_1',
      width: 260,
      render(col, row) {
        return <SendInfos data={row}></SendInfos>
      },
    },
    {
      title: '物流信息',
      dataIndex: 'logistics',
      width: 220,
      render(c, row) {
        const shippingCarrier = row.orderPackageList?.[0]?.shippingCarrier || row.logisticsOrderPackageList?.[0]?.shippingCarrier
        const isShowMjInfo = ['线下', '宅配'].some(o => shippingCarrier?.includes(o)) || row.createType !== '0';
        return (
          <div className="border-r h-full p-2">
            {/* <LabelValue label="尾程物流" value={<DictNameFC value={row.orderPackageList[0]?.shippingCarrier} dictCode="logistics_channel"></DictNameFC>}></LabelValue> */}
            <LabelValue
              label="尾程物流"
              value={
                shippingCarrier ? <Tag color={ShippingCarrierColorMap[shippingCarrier]}>{shippingCarrier}</Tag> : null
              }
            >
            </LabelValue>
            <LabelValue label="物流单号" value={
              <TrackingNumber orderItem={row}></TrackingNumber>
            }></LabelValue>
            {row.shippingTime ? <LabelValue label="出货时间" value={row.shippingTime}></LabelValue> : null}
            {
              isShowMjInfo ? <>
                <LabelValue label="收货地址" value={
                  <Typography.Text copyable>
                    {`${row.recipients} ${row.mobileNumber} ${row.province || ''} ${row.city || ''} ${row.detailedAddress || ''}`}
                  </Typography.Text>
                }></LabelValue>
              </> : null
            }
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
    ...(isClient()
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
              {row.messageToSeller ? <LabelValue valueClassName="text-red-500 font-bold" label="买家留言" value={row.messageToSeller}></LabelValue> : null}
              <LabelValue label="收货地址" value={stringToMasked(row.detailedAddress)}></LabelValue>
            </div>
          )
        },
      }]
      : []),
    // {
    //   title: '打包信息',
    //   dataIndex: 'db',
    //   width: 150,
    //   render(c, row) {
    //     return (
    //       <div className="border-r h-full p-2">
    //         <LabelValue label="打包仓库" value={<EntrepotNameFC value={row.sendWarehouse} />}></LabelValue>
    //         <LabelValue label="仓库备注" value={row.entrepotRemark}></LabelValue>
    //         {
    //           isAdmin() ? <LabelValue label="卖家备注" value={row.remark}></LabelValue> : null
    //         }
    //       </div>
    //     )
    //   },
    // },
    ...(isAdmin()
      ? [{
        title: '卖家信息',
        dataIndex: 'sellerInfo',
        width: 180,
        render(c, row: OrderResponseItem) {
          return (
            <div className="border-r h-full p-2">
              {/* <LabelValue label="打包仓库" value={<EntrepotNameFC value={row.sendWarehouse} />}></LabelValue> */}
              <LabelValue label="卖家标识" value={row.tenantryNo}></LabelValue>
              <LabelValue valueClassName={classNames({
                'text-red-500 font-bold': row.remark
              })} label="卖家备注" value={row.remark}></LabelValue>
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
          return <OrderTableActions orderItem={row} dictCode={dictCode}></OrderTableActions>
        },
      }]
      : []
    ),
  ]
}
