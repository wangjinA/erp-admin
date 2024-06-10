import React from 'react';
import {
  Button,
  Descriptions,
  Link,
  List,
  Table,
} from '@arco-design/web-react';
import styles from './index.module.less';
import classNames from 'classnames';
import GoodsInfo from '../GoodsInfo';
import { IconFile } from '@arco-design/web-react/icon';
import { StyleProps } from '@/types';
const OrderTable: React.FC<StyleProps> = (props) => {
  const { className, style } = props;
  return (
    <Table
      className={classNames(
        styles['order-table'],
        'arco-list-style',
        className
      )}
      style={style}
      data={[1]}
      columns={[
        {
          title: '商品信息',
          key: 'goods',
          width: 550,
          render() {
            return <GoodsInfo></GoodsInfo>;
          },
          fixed: 'left',
        },
        {
          title: '发货信息',
          key: 'delivery',
          width: 210,
          render() {
            return (
              <List
                className={classNames(styles['goods-info'])}
                dataSource={new Array(4).fill({
                  title: 'Beijing Bytedance Technology Co., Ltd.',
                  description:
                    'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
                })}
                render={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      style={{ height: 91 }}
                      description={
                        <Descriptions
                          size="small"
                          column={1}
                          colon=" :"
                          data={[
                            {
                              label: '快递',
                              value: (
                                <Link
                                  href="https://www.baidu.com/s?wd=JT5258521846276"
                                  target="_blank"
                                >
                                  JT5258521846276
                                </Link>
                              ),
                            },
                            {
                              label: '仓位',
                              value: '612-04',
                            },
                          ]}
                          labelStyle={{ textAlign: 'right' }}
                          style={{ marginBottom: 20 }}
                        />
                      }
                    />
                  </List.Item>
                )}
              />
            );
          },
        },
        {
          title: '卖家信息',
          key: 'seller',
          width: 180,
          render() {
            return (
              <Descriptions
                size="small"
                column={1}
                colon=" :"
                data={[
                  {
                    label: '打包仓库',
                    value: '凤凰国际仓',
                  },
                  {
                    label: '卖家标识',
                    value: '612666',
                  },
                  {
                    label: '卖家备注',
                    value: '这小子要发大财',
                  },
                ]}
                labelStyle={{ textAlign: 'right' }}
                style={{ marginBottom: 20 }}
              />
            );
          },
        },
        {
          title: '物流信息',
          key: 'logistics',
          width: 240,
          render() {
            return (
              <Descriptions
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
                    value: 'TW245928000784Y',
                  },
                  {
                    label: '申请时间',
                    value: '2024-05-15 02:06:17',
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
          title: '费用',
          key: 'fee',
          width: 200,
          render() {
            return (
              <Descriptions
                size="small"
                column={1}
                colon=" :"
                data={[
                  {
                    label: '总费用',
                    value: '1.5',
                  },
                  {
                    label: '打包费用',
                    value: '1.5',
                  },
                  {
                    label: '打包附加费用',
                    value: '0',
                  },
                  {
                    label: '增值费用',
                    value: '0',
                  },
                ]}
                style={{ marginBottom: 20 }}
              />
            );
          },
        },
        {
          title: '操作',
          key: 'action',
        },
      ]}
    ></Table>
  );
};

export default OrderTable;
