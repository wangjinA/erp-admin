import GoodsInfo from '@/components/GoodsInfo';
import { isAdmin } from '@/routes';
import { Button, Descriptions, Link } from '@arco-design/web-react';
import classNames from 'classnames';
import { OrderTablePorps } from '.';
import styles from './index.module.less';
import { IconFile } from '@arco-design/web-react/icon';
import SendCargoInfo from './SendCargoInfo';

export function useColumns(props: OrderTablePorps) {
  const { dictCode } = props;
  return [
    {
      title: '商品信息',
      dataIndex: 'orderProductVOList',
      width: 550,
      render(col) {
        console.log(col);
        return <GoodsInfo data={col}></GoodsInfo>;
      },
      fixed: 'left',
    },
    {
      title: '发货信息',
      dataIndex: 'orderProductVOList_1',
      width: 210,
      render(col, row) {
        return <SendCargoInfo data={row}></SendCargoInfo>;
      },
    },
    {
      title: '物流信息',
      dataIndex: 'logistics',
      width: 240,
      render(c, row) {
        return (
          <Descriptions
            className="border-r h-full px-2"
            size="small"
            column={1}
            colon=" :"
            data={[
              {
                label: '尾程物流',
                value: '蝦皮店到店',
              },
              {
                label: '物流单号',
                value: row.packagenumber || '-',
              },
              {
                label: '申请时间',
                value: row.shippingTime,
              },
              {
                label: '查看单号',
                value: (
                  <Button
                    className="px-1"
                    type="text"
                    icon={<IconFile />}
                    size="mini"
                  >
                    查看面单
                  </Button>
                ),
              },
            ]}
            labelStyle={{ textAlign: 'right' }}
            style={{ marginBottom: 20 }}
          />
        );
      },
    },
    {
      title: '买家信息',
      dataIndex: 'seller',
      width: 180,
      render(c, row) {
        return (
          <Descriptions
            size="small"
            className="border-r h-full px-2"
            column={1}
            colon=" :"
            data={[
              {
                label: '买家',
                value: row.buyerUsername || '-',
              },
              {
                label: '收货人',
                value: row.recipients || '-',
              },
              {
                label: '收货电话',
                value: row.mobilenumber || '-',
              },
              {
                label: '收货地址',
                value: row.detailedAddress || '-',
              },
            ]}
            labelStyle={{ textAlign: 'right' }}
            style={{ marginBottom: 20 }}
          />
        );
      },
    },
    {
      title: '打包信息',
      dataIndex: 'db',
      width: 150,
      render(c, row) {
        return (
          <Descriptions
            size="small"
            className="border-r h-full px-2"
            column={1}
            colon=" :"
            data={[
              {
                label: '打包仓库',
                value: row.sendWarehouse || '-',
              },
              {
                label: '备注',
                value: row.remark || '-',
              },
            ]}
            labelStyle={{ textAlign: 'right' }}
            style={{ marginBottom: 20 }}
          />
        );
      },
    },
    {
      title: '卖家信息',
      dataIndex: '卖家信息',
      width: 180,
      render(c, row) {
        return (
          <Descriptions
            size="small"
            className="border-r h-full px-2"
            column={1}
            colon=" :"
            data={[
              {
                label: '打包仓库',
                value: 'row.' || '-',
              },
              {
                label: '卖家标识',
                value: 'row.' || '-',
              },
              {
                label: '卖家备注',
                value: 'row.' || '-',
              },
              {
                label: '仓库备注',
                value: 'row.' || '-',
              },
            ]}
            labelStyle={{ textAlign: 'right' }}
            style={{ marginBottom: 20 }}
          />
        );
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
        );
      },
    },
    ...(dictCode === 'order_status'
      ? [
          {
            title: isAdmin() ? '费用' : '货代费用',
            dataIndex: 'hd',
            width: 180,
            render(c, row) {
              return (
                <Descriptions
                  size="small"
                  className="h-full px-2"
                  column={1}
                  colon=" :"
                  data={[
                    {
                      label: '总费用',
                      value: 1.5,
                    },
                    {
                      label: '打包费用',
                      value: 1.5,
                    },
                    ...(isAdmin()
                      ? [
                          {
                            label: '打包附加费用',
                            value: <Button>添加</Button>,
                          },
                          {
                            label: '增值费用',
                            value: <Button>添加</Button>,
                          },
                        ]
                      : []),
                  ]}
                  labelStyle={{ textAlign: 'right' }}
                  style={{ marginBottom: 20 }}
                />
              );
            },
          },
        ]
      : []),
  ];
}
