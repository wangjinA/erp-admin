import React, { useState } from 'react';
import {
  Button,
  Descriptions,
  Empty,
  Link,
  List,
  Message,
  Modal,
  Pagination,
  Table,
  TableProps,
  Timeline,
} from '@arco-design/web-react';
import styles from './index.module.less';
import classNames from 'classnames';

import { IconEdit, IconFile } from '@arco-design/web-react/icon';
import { StyleProps } from '@/types';
import GoodsInfo from '@/components/GoodsInfo';
import DictSelector, {
  getDictName,
  useDictName,
  useDictOptions,
} from '@/components/Selectors/DictSelector';
import { APIListResponse } from '@/api/type';
import { Order } from '@/types/order';
import { PaginationResult } from 'ahooks/lib/usePagination/types';
import OrderHeaderStatusInfo from './OrderHeaderStatusInfo';
import { EndType, getEndType, isAdmin } from '@/routes';
import { useRequest } from 'ahooks';
import { OrderPageProps } from '@/pages/client/order/orderPage';
import { showModal } from '@/utils';
import FilterForm from '@/components/FilterForm';
import { OrderCreateSchema2 } from '@/pages/client/order/create/schema';
import useForm from '@arco-design/web-react/es/Form/useForm';
import EntrepotSelector from '@/components/Selectors/EntrepotSelector';

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
  const [addVisiable, setAddVisiable] = useState(false);
  const [record, setRecord] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sheet, setSheet] = useState<any>();

  const [form] = useForm();
  // const { data: shopeeStatus } = useDictOptions({
  //   dictCode: 'shopee_status',
  //   displayName: '',
  // });
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
                  <Button
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    编辑打包
                  </Button>
                  <Button
                    onClick={() => {
                      showModal({
                        content: '确定要取消打包吗？',
                      }).then((res) => {
                        Message.success('取消成功！');
                      });
                    }}
                  >
                    取消打包
                  </Button>
                  <Button icon={<IconFile />} onClick={() => setSheet(1)}>
                    查看面单
                  </Button>
                  <Button
                    loading={false}
                    onClick={() => {
                      Message.success('更新成功！');
                    }}
                  >
                    更新订单
                  </Button>
                  {/* <Button>发货预报</Button> */}
                  {/* <Button>订单收入</Button> */}
                  <Button>隔离订单</Button>
                  <Button
                    onClick={() => {
                      setAddVisiable(true);
                    }}
                  >
                    添加商品
                  </Button>
                  {/* <Button>打印出货单</Button> */}
                  <Button
                    onClick={() => {
                      showModal({
                        content: '确定要申请预刷吗?',
                      }).then(() => {
                        Message.success('预刷成功！');
                      });
                    }}
                  >
                    申请预刷
                  </Button>
                  <Button icon={<IconFile />} onClick={() => setRecord(true)}>
                    操作记录
                  </Button>
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
              <footer className="flex border-t py-2 px-4">
                <div className="gap-12 grid grid-cols-[240px_280px]">
                  <div>
                    <span className={labelClass}>创建时间：</span>
                    <span className={valueClass}>{item.createTime || '-'}</span>
                  </div>
                  <div>
                    <span className={labelClass}>最后发货时间：</span>
                    <span className={valueClass}>{item.createTime || '-'}</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className={labelClass}>备注：</span>
                  <span className={valueClass}>暂无</span>
                  <Button type="text">
                    <IconEdit />
                  </Button>
                </div>
              </footer>
            </div>
          ))}
        </main>
        {data?.list.length ? (
          <Pagination
            className="mt-4 flex justify-end"
            total={data?.total}
            onChange={(pageNumber: number, pageSize: number) => {
              pagination.changePageSize(pageSize);
              pagination.changeCurrent(pageNumber);
            }}
          ></Pagination>
        ) : null}
        {!data?.list.length && <Empty className="py-28"></Empty>}
      </div>
      <Modal
        title="添加商品"
        visible={addVisiable}
        onCancel={() => setAddVisiable(false)}
        onOk={async () => {
          const formData = await form.validate();
          console.log(formData);
          Message.success('添加成功');
          setAddVisiable(false);
        }}
      >
        <FilterForm
          span={24}
          form={form}
          formItemConfigList={OrderCreateSchema2}
        ></FilterForm>
      </Modal>
      <Modal
        title="查看面单"
        visible={sheet}
        onCancel={() => setSheet(null)}
        onOk={async () => {
          setSheet(null);
        }}
      >
        面单信息，开发中...
      </Modal>
      <Modal
        title="操作记录"
        visible={record}
        onCancel={() => setRecord(false)}
        onOk={async () => {
          setRecord(false);
        }}
      >
        <Timeline>
          {[1, 2, 3, 4].map((item) => (
            <Timeline.Item key={item} label="2017-03-10">
              The first milestone
            </Timeline.Item>
          ))}
        </Timeline>
      </Modal>
      <Modal
        title="编辑订单"
        visible={edit}
        onCancel={() => setEdit(false)}
        onOk={async () => {
          setEdit(false);
        }}
      >
        <FilterForm
          span={24}
          form={form}
          formItemConfigList={[
            {
              schema: {
                field: 'test',
                label: '打包仓库',
              },
              formItemProps: {
                disabled: true,
              },
              control: <EntrepotSelector></EntrepotSelector>,
            },
            {
              schema: {
                field: 'transportType',
                label: '运输类型',
              },
              control: (
                <DictSelector
                  type="radio"
                  dictCode="transport_type"
                ></DictSelector>
              ),
            },
            {
              schema: {
                field: 'aaaaa',
                label: '备注',
              },
              control: 'textarea',
            },
          ]}
        ></FilterForm>
      </Modal>
    </div>
  );
};

export default OrderTable;
