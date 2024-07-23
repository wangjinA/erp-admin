import React from 'react';
import {
  Button,
  Descriptions,
  Link,
  List,
  Table,
  TableProps,
} from '@arco-design/web-react';
import styles from './index.module.less';
import classNames from 'classnames';

import { IconFile } from '@arco-design/web-react/icon';
import { StyleProps } from '@/types';
import GoodsInfo from '@/components/GoodsInfo';
import { useDictOptions } from '@/components/Selectors/DictSelector';

interface OrderTablePorps extends StyleProps {
  tableProps: TableProps;
}

const OrderTable: React.FC<OrderTablePorps> = (props) => {
  const { className, style, tableProps } = props;
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
            className="h-full px-2"
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
          {tableProps.data?.map((item) => (
            <div className="border">
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
                  <span className="arco-descriptions-item-label w-auto pb-0">
                    订单编号：
                  </span>
                  <span className="arco-descriptions-item-value pb-0">
                    {item.shrimpOrderNo}
                  </span>
                  <Button size="mini" type="text">
                    查看详情
                  </Button>
                </div>
              </header>
              <header className="gap-12 px-4 py-2 border-b grid grid-cols-[240px_240px_600px]">
                <div>
                  <span className="arco-descriptions-item-label w-auto pb-0">
                    订单编号：
                  </span>
                  <span className="arco-descriptions-item-value pb-0">
                    {item.shrimpOrderNo}
                  </span>
                </div>
                <div>
                  <span className="arco-descriptions-item-label w-auto pb-0">
                    Shopee状态：
                  </span>
                  <span className="arco-descriptions-item-value pb-0">
                    {shopeeStatus?.find(
                      (oitem) => oitem.value === item.shrimpStatus
                    )?.label || '-'}
                  </span>
                </div>
                <div>
                  <span className="arco-descriptions-item-label w-auto pb-0">店铺：</span>
                  <span className="arco-descriptions-item-value pb-0">
                    本土 台湾/萬福堂佛緣旗艦店 本命佛 化太歲 藏式手繩水晶手串
                    吊墜 開運吉祥
                  </span>
                </div>
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
                  <span className="arco-descriptions-item-label w-auto pb-0">
                    创建时间：
                  </span>
                  <span className="arco-descriptions-item-value pb-0">
                    {item.createTime || '-'}
                  </span>
                </div>
                <div>
                  <span className="arco-descriptions-item-label w-auto pb-0">
                    最后发货时间：
                  </span>
                  <span className="arco-descriptions-item-value pb-0">
                    {item.createTime || '-'}
                  </span>
                </div>
              </footer>
            </div>
          ))}
        </main>
      </div>
      {/* <Table
        {...tableProps}
        className={classNames(
          styles['order-table'],
          'arco-list-style',
          className
        )}
        columns={cols}
        style={style}
      ></Table> */}
    </div>
  );
};

export default OrderTable;
