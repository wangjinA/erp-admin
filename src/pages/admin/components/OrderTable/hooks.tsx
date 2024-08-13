import { Button, Descriptions } from '@arco-design/web-react'

import { IconFile } from '@arco-design/web-react/icon'

import SendCargoInfo from './SendCargoInfo'

import { OrderTablePorps, labelClass, valueClass } from '.'

import GoodsInfo from '@/components/GoodsInfo'
import { Order } from '@/types/order'

export function useColumns(props: OrderTablePorps) {
  const { dictCode } = props
  return [
    {
      title: '商品信息',
      dataIndex: 'orderProductVOList',
      width: 550,
      render(col) {
        console.log(col)
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
          <div className="border-r h-full px-2">
            <div>
              <span className={labelClass}>尾程物流：</span>
              <span className={valueClass}>蝦皮店到店</span>
            </div>
            <div>
              <span className={labelClass}>物流单号：</span>
              <span className={valueClass}>{row.packagenumber || '-'}</span>
            </div>
            <div>
              <span className={labelClass}>申请时间：</span>
              <span className={valueClass}>{row.shippingTime}</span>
            </div>
            <div>
              <span className={labelClass}>查看单号：</span>
              <span className={valueClass}>
                <Button
                  className="px-1"
                  type="text"
                  icon={<IconFile />}
                  size="mini"
                >
                  查看面单
                </Button>
              </span>
            </div>
          </div>
        )
      },
    },
    {
      title: '买家信息',
      dataIndex: 'seller',
      width: 180,
      render(c, row) {
        return (
          <div className="border-r h-full px-2">
            <div>
              <span className={labelClass}>买家：</span>
              <span className={valueClass}>{row.buyerUsername || '-'}</span>
            </div>
            <div>
              <span className={labelClass}>收货人：</span>
              <span className={valueClass}>{row.recipients || '-'}</span>
            </div>
            <div>
              <span className={labelClass}>收货电话：</span>
              <span className={valueClass}>{row.mobilenumber || '-'}</span>
            </div>
            <div>
              <span className={labelClass}>收货地址：</span>
              <span className={valueClass}>{row.detailedAddress || '-'}</span>
            </div>
          </div>
          // <Descriptions
          //   size="small"
          //   className="border-r h-full px-2"
          //   column={1}
          //   colon=" :"
          //   data={[
          //     {
          //       label: '买家',
          //       value: row.buyerUsername || '-',
          //     },
          //     {
          //       label: '收货人',
          //       value: row.recipients || '-',
          //     },
          //     {
          //       label: '收货电话',
          //       value: row.mobilenumber || '-',
          //     },
          //     {
          //       label: '收货地址',
          //       value: row.detailedAddress || '-',
          //     },
          //   ]}
          //   labelStyle={{ textAlign: 'right' }}
          //   style={{ marginBottom: 20 }}
          // />
        )
      },
    },
    {
      title: '打包信息',
      dataIndex: 'db',
      width: 150,
      render(c, row) {
        return (
          <div className="border-r h-full px-2">
            <div>
              <span className={labelClass}>打包仓库：</span>
              <span className={valueClass}>{row.sendWarehouseText || '-'}</span>
            </div>
            <div>
              <span className={labelClass}>备注：</span>
              <span className={valueClass}>{row.remark || '-'}</span>
            </div>
          </div>
        )
      },
    },
    {
      title: '卖家信息',
      dataIndex: '卖家信息',
      width: 180,
      render(c, row: Order) {
        return (
          <div className="border-r h-full px-2">
            <div>
              <span className={labelClass}>打包仓库：</span>
              <span className={valueClass}>{row.sendWarehouseText || '-'}</span>
            </div>
            <div>
              <span className={labelClass}>卖家标识：</span>
              <span className={valueClass}>{'row.' || '-'}</span>
            </div>
            <div>
              <span className={labelClass}>卖家备注：</span>
              <span className={valueClass}>{row.remark || '-'}</span>
            </div>
            <div>
              <span className={labelClass}>仓库备注：</span>
              <span className={valueClass}>{row.entrepotRemark || '-'}</span>
            </div>
          </div>
        )
      },
    },
    {
      title: '订单金额',
      dataIndex: 'fee',
      width: 200,
      render(c, row) {
        return (
          <Descriptions
            size="small"
            className="border-r h-full px-2"
            column={1}
            colon=" :"
            data={[
              {
                label: '总费用(TWD)',
                value: row.totalCost,
              },
              {
                label: '预估运费(TWD)',
                value: row.estimatedShippingFee || '-',
              },
              {
                label: '实际运费(TWD)',
                value: row.actualShippingFee || '-',
              },
            ]}
            style={{ marginBottom: 20 }}
          />
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
  ]
}
