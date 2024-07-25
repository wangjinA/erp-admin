import React from 'react';
import {
  Button,
  Descriptions,
  Empty,
  Link,
  List,
  Pagination,
  Table,
  TableProps,
} from '@arco-design/web-react';
import styles from './index.module.less';
import classNames from 'classnames';

import { IconFile } from '@arco-design/web-react/icon';
import { StyleProps } from '@/types';
import GoodsInfo from '@/components/GoodsInfo';
import { useDictOptions } from '@/components/Selectors/DictSelector';
import { APIListResponse } from '@/api/type';
import { Order } from '@/types/order';
import { PaginationResult } from 'ahooks/lib/usePagination/types';
import { OrderPageProps } from '../../order/orderPage';
import OrderHeaderStatusInfo from './OrderHeaderStatusInfo';
import { EndType, getEndType, isAdmin } from '@/routes';

interface OrderTablePorps extends StyleProps {
  // tableProps: TableProps;
  data?: APIListResponse<Order>['data'];
  dictCode: OrderPageProps['dictCode'];
  loading: boolean;
  pagination: PaginationResult<
    APIListResponse<Order>['data'],
    any
  >['pagination'];
}

export const labelClass = 'arco-descriptions-item-label w-auto pb-0';
export const valueClass = 'arco-descriptions-item-label w-auto pb-0';

const OrderTable: React.FC<OrderTablePorps> = (props) => {
  const { className, style, dictCode, data, pagination } = props;
  const { data: shopeeStatus } = useDictOptions({
    dictCode: 'shopee_status',
    displayName: '',
  });
  const cols = [
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
        return (
          <div className={classNames(styles['goods-info'], 'pr-2')}>
            {row.orderProductVOList?.map((item, i) => (
              <div
                key={i}
                className={classNames(
                  'h-28 pt-2 border-r',
                  i > 0 ? 'border-t' : ''
                )}
              >
                <Descriptions
                  size="small"
                  column={1}
                  colon=" :"
                  data={[
                    {
                      label: '快递',
                      value: (
                        <Link
                          href={`https://www.baidu.com/s?wd=${item.trackingNo}`}
                          target="_blank"
                        >
                          {item.trackingNo}
                        </Link>
                      ),
                    },
                    {
                      label: '仓位',
                      value: item.freightSpaceName || '-',
                    },
                  ]}
                  labelStyle={{ textAlign: 'right' }}
                  style={{ marginBottom: 20 }}
                />
              </div>
            ))}
          </div>
        );
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
  return (
    <div>
      <div>
        <header className="flex">
          {cols.map((item) => (
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
        <main className="flex flex-col gap-4">
          {data?.list?.map((item) => (
            <div className="border" key={item.id}>
              <header className="flex items-center p-2 border-b">
                <Button.Group>
                  <Button>编辑打包</Button>
                  <Button>取消打包</Button>
                  <Button>查看面单</Button>
                  <Button>更新订单</Button>
                  <Button>发货预报</Button>
                  <Button>订单收入</Button>
                  <Button>隔离订单</Button>
                  <Button>添加商品</Button>
                  <Button>打印出货单</Button>
                </Button.Group>
                <div className="flex items-center ml-auto">
                  <span className={labelClass}>订单编号：</span>
                  <span className={valueClass}>{item.shrimpOrderNo}</span>
                  <Button size="mini" type="text">
                    查看详情
                  </Button>
                </div>
              </header>
              <header className="gap-12 px-4 py-2 border-b grid grid-cols-[240px_240px_600px]">
                <div>
                  <span className={labelClass}>订单编号：</span>
                  <span className={valueClass}>{item.shrimpOrderNo}</span>
                </div>
                <OrderHeaderStatusInfo data={item}></OrderHeaderStatusInfo>
              </header>
              <main className="flex p-4">
                {cols.map((oitem) => (
                  <div
                    style={{
                      width: oitem.width,
                      flex: oitem.width ? 'auto' : 1,
                    }}
                    key={oitem.dataIndex}
                  >
                    {oitem.render(item[oitem.dataIndex], item)}
                  </div>
                ))}
              </main>
              <footer className="gap-12 px-4 py-2 border-t grid grid-cols-[240px_280px]">
                <div>
                  <span className={labelClass}>创建时间：</span>
                  <span className={valueClass}>{item.createTime || '-'}</span>
                </div>
                <div>
                  <span className={labelClass}>最后发货时间：</span>
                  <span className={valueClass}>{item.createTime || '-'}</span>
                </div>
              </footer>
            </div>
          ))}
        </main>
        {data?.list.length && (
          <Pagination
            total={data?.total}
            onChange={(pageNumber: number, pageSize: number) => {
              pagination.changePageSize(pageSize);
              pagination.changeCurrent(pageNumber);
            }}
          ></Pagination>
        )}
        {!data?.list.length && <Empty className="py-28"></Empty>}
      </div>
    </div>
  );
};

export default OrderTable;
