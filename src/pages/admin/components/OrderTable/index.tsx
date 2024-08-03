import React, { useState } from 'react';
import {
  Button,
  Empty,
  Message,
  Modal,
  Pagination,
  Spin,
  Timeline,
} from '@arco-design/web-react';
import { IconEdit, IconFile, IconPlus } from '@arco-design/web-react/icon';
import { StyleProps } from '@/types';
import GoodsInfo from '@/components/GoodsInfo';
import DictSelector from '@/components/Selectors/DictSelector';
import { APIListResponse } from '@/api/type';
import { Order, OrderResponseItem } from '@/types/order';
import { PaginationResult } from 'ahooks/lib/usePagination/types';
import OrderHeaderStatusInfo from './OrderHeaderStatusInfo';
import { useRequest } from 'ahooks';
import { OrderPageProps } from '@/pages/client/order/orderPage';
import { showMessageStatus, showModal, tryFn } from '@/utils';
import FilterForm from '@/components/FilterForm';
import { OrderCreateSchema2 } from '@/pages/client/order/create/schema';
import useForm from '@arco-design/web-react/es/Form/useForm';
import EntrepotSelector from '@/components/Selectors/EntrepotSelector';
import { orderAPI } from '@/api/client/order';
import PopconfirmDelete from '@/components/PopconfirmDelete';
import { SuccessCode } from '@/api';
import { useColumns } from './hooks';
import { omit } from 'lodash';
import { bus } from '@/hooks/useEventBus';

export interface OrderTablePorps extends StyleProps {
  // tableProps: TableProps;
  data?: APIListResponse<OrderResponseItem>['data'];
  dictCode: OrderPageProps['dictCode'];
  loading: boolean;
  run: any;
  pagination: PaginationResult<
    APIListResponse<Order>['data'],
    any
  >['pagination'];
}

export const labelClass = 'arco-descriptions-item-label w-auto pb-0';
export const valueClass = 'arco-descriptions-item-label w-auto pb-0';

const OrderTable: React.FC<OrderTablePorps> = (props) => {
  const { className, style, run, dictCode, data, pagination } = props;
  const [addVisiable, setAddVisiable] = useState(false);
  const [record, setRecord] = useState(false);
  const [edit, setEdit] = useState<any>();
  const [sheet, setSheet] = useState<any>();
  // const [editProductList, setEditProductList] = useState<any>();

  const columns = useColumns(props);
  const refreshHandler = useRequest(
    async (id) => {
      const res = await orderAPI.refresh(id);
      await showMessageStatus(res.data);
    },
    {
      manual: true,
    }
  );
  const logHandler = useRequest(
    async (id) => {
      return orderAPI.getLog(id).then((r) => r.data);
    },
    {
      manual: true,
    }
  );
  const updateHandler = useRequest(
    async () => {
      const res = await orderAPI.update(
        omit(edit, ['orderProductVOList', 'orderPackageList'])
      );
      await showMessageStatus(res.data);
      setEdit(null);
      bus.emit('refresh-order-page')
    },
    {
      manual: true,
    }
  );

  const [form] = useForm();
  // const { data: shopeeStatus } = useDictOptions({
  //   dictCode: 'shopee_status',
  //   displayName: '',
  // });

  return (
    <div className={className}>
      <div>
        <header className="flex">
          {columns.map((item) => (
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
        <main className="flex flex-col gap-4 bg-white">
          {data?.list?.map((item) => (
            <div className="border" key={item.id}>
              <header className="flex items-center p-2 border-b">
                <Button.Group>
                  <Button
                    onClick={() => {
                      console.log(item);
                      setEdit({
                        ...item,
                        logisticsOrderProductList: item.orderProductVOList,
                      });
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
                  <Button
                    icon={<IconFile />}
                    onClick={async () => {
                      // `${getRequestEndInfo.baseUrl}/`
                      const res = await orderAPI.getSheet(item.id);
                      if (res.data.code !== SuccessCode) {
                        return Message.error(res.data.msg);
                      }
                      setSheet(res.data.data);
                    }}
                  >
                    查看面单
                  </Button>
                  <Button
                    loading={refreshHandler.loading}
                    onClick={() => {
                      refreshHandler.run(item.id);
                    }}
                  >
                    更新订单
                  </Button>
                  {/* <Button>发货预报</Button> */}
                  {/* <Button>订单收入</Button> */}
                  {/* <Button>隔离订单</Button> */}
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
                        okButtonProps: {
                          status: 'default',
                        },
                      }).then(() => {
                        Message.success('预刷成功！');
                      });
                    }}
                  >
                    申请预刷
                  </Button>
                  <Button
                    icon={<IconFile />}
                    onClick={() => {
                      logHandler.run(item.id);
                      setRecord(true);
                    }}
                  >
                    操作记录
                  </Button>
                  <PopconfirmDelete
                    title="删除订单"
                    content="确认删除订单？操作不可逆！"
                    isModal={true}
                    onOk={async () => {
                      const res = await orderAPI.remove(item.id);
                      await showMessageStatus(res.data);
                      run();
                    }}
                  ></PopconfirmDelete>
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
                {columns.map((oitem) => (
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
        {data?.list?.length ? (
          <Pagination
            className="mt-4 flex justify-end"
            total={data?.total}
            onChange={(pageNumber: number, pageSize: number) => {
              pagination.changePageSize(pageSize);
              pagination.changeCurrent(pageNumber);
            }}
          ></Pagination>
        ) : null}
        {!data?.list?.length && <Empty className="py-28"></Empty>}
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
        <Spin loading={logHandler.loading} className="mx-auto block">
          {!logHandler.loading && !logHandler.data?.list?.length ? (
            <Empty description="暂无记录"></Empty>
          ) : (
            <Timeline>
              {logHandler.data?.list.map((item) => (
                <Timeline.Item key={item} label="2017-03-10">
                  The first milestone
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </Spin>
      </Modal>
      <Modal
        style={{
          width: 870,
        }}
        title="编辑订单"
        visible={Boolean(edit)}
        onCancel={() => setEdit(null)}
        confirmLoading={updateHandler.loading}
        onOk={async () => {
          updateHandler.run();
        }}
      >
        <FilterForm
          span={24}
          form={form}
          initialValues={edit}
          formItemConfigList={[
            {
              schema: {
                field: 'sendWarehouse',
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
                field: 'remark',
                label: '备注',
              },
              control: 'textarea',
            },
          ]}
          onChange={(_, v) => {
            setEdit({
              ...edit,
              ...v,
            });
          }}
        ></FilterForm>
        <GoodsInfo
          data={edit?.orderProductVOList}
          isEdit={true}
          onChange={(e) => {
            setEdit({
              ...edit,
              logisticsOrderProductList: e,
            });
          }}
        ></GoodsInfo>
        <Button
          className="mt-4"
          type="outline"
          long={true}
          icon={<IconPlus></IconPlus>}
          onClick={() => {
            setAddVisiable(true);
          }}
        >
          添加商品
        </Button>
      </Modal>
    </div>
  );
};

export default OrderTable;
