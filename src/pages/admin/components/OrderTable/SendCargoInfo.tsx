import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './index.module.less';
import {
  Descriptions,
  Form,
  Link,
  Message,
  Modal,
  Tag,
} from '@arco-design/web-react';
import { OrderResponseItem } from '@/types/order';
import { showMessageStatus, showModal, showObj } from '@/utils';
import { isClient } from '@/routes';
import { useRequest } from 'ahooks';
import { orderAPI } from '@/api/client/order';
import { useDictOptions } from '@/components/Selectors/DictSelector';
import FilterForm from '@/components/FilterForm';
import EntrepotSelector from '@/components/Selectors/EntrepotSelector';
import { bus, EmitTypes } from '@/hooks/useEventBus';

interface SendCargoInfoProps {
  data: OrderResponseItem;
}

const TagColors = [
  '',
  'green',
  'orangered',
  'orange',
  'gold',
  'lime',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];
function ExpressStatus(item: OrderResponseItem['orderProductVOList'][0]) {
  const { data: trackingStatus } = useDictOptions({
    dictCode: 'tracking_status',
  });

  return (
    <div>
      <Tag bordered size="small" color={TagColors[Number(item.trackingStatus)]}>
        {
          trackingStatus?.find((oitem) => oitem.value === item.trackingStatus)
            ?.label
        }
      </Tag>
    </div>
  );
}

function ExpressStatusActions(props: {
  item: OrderResponseItem['orderProductVOList'][0];
  sendWarehouse: string;
}) {
  const { item, sendWarehouse } = props;

  const [isReturnGoods, setIsReturnGoods] = useState<boolean>(false);
  const [formRef] = Form.useForm();
  // 设置快递状态
  const updateStatusHandle = useRequest(
    async (trackingStatus) => {
      const res = await orderAPI.updateExpressStatus({
        orderProductId: item.id,
        trackingStatus,
      });
      await showMessageStatus(res.data);
      bus.emit(EmitTypes.refreshOrderPage);
    },
    {
      manual: true,
    }
  );
  // 退件
  const returnHandle = useRequest(
    async () => {
      const formData = await formRef.validate();
      const res = await orderAPI.returnOperation(formData);
      await showMessageStatus(res.data);
      setIsReturnGoods(false);
    },
    {
      manual: true,
    }
  );

  switch (item.trackingStatus) {
    case '0':
      return (
        <div>
          <Tag
            className="cursor-pointer"
            bordered
            size="small"
            color="orange"
            checked={true}
            onClick={async () => {
              await showModal({
                confirmLoading: updateStatusHandle.loading,
                content: `所有跟快递单号"${item.trackingNo}"有关联的订单都会拒收，确定要继续吗？`,
              });
              updateStatusHandle.run('2');
            }}
          >
            拒收
          </Tag>
        </div>
      );
    case '1':
      return (
        <div>
          <Tag
            className="cursor-pointer"
            bordered
            size="small"
            color="orange"
            checked={true}
            onClick={async () => {
              setIsReturnGoods(true);
            }}
          >
            退件
          </Tag>
          <Modal
            title="新增退件快递"
            visible={isReturnGoods}
            confirmLoading={returnHandle.loading}
            onCancel={() => {
              setIsReturnGoods(false);
            }}
            onOk={() => {
              returnHandle.run();
            }}
          >
            <FilterForm
              initialValues={{
                sendWarehouse,
                trackingNo: item.trackingNo,
              }}
              span={24}
              form={formRef}
              formItemConfigList={[
                {
                  schema: {
                    field: 'sendWarehouse',
                    label: '打包仓库',
                  },
                  control: <EntrepotSelector></EntrepotSelector>,
                },
                {
                  schema: {
                    field: 'trackingNo',
                    label: '物流单号',
                    required: true,
                  },
                },
                {
                  schema: {
                    field: 'recipientsInfo',
                    label: '收件信息',
                    required: true,
                  },
                  formItemProps: {
                    extra:
                      '例：张三，15270848182，东莞市xx镇南城街道A区3栋xx号',
                  },
                  control: 'textarea',
                },
                {
                  schema: {
                    field: 'storeRemark',
                    label: '备注',
                  },
                  formItemProps: {
                    extra: (
                      <span className="text-red-600">
                        如是上门取件，请务必填写取件码！
                      </span>
                    ),
                  },
                  control: 'textarea',
                },
              ]}
            ></FilterForm>
          </Modal>
        </div>
      );
    // case '2':
    //   return (
    //     <div>
    //       <Tag
    //         className="cursor-pointer"
    //         bordered
    //         size="small"
    //         color="orange"
    //         checked={true}
    //         onClick={async () => {
    //           setIsReturnGoods(true);
    //         }}
    //       >
    //         取消退件
    //       </Tag>
    //     </div>
    //   );
  }
  return <div>-</div>;
}

const SkuList: React.FC<SendCargoInfoProps> = (props) => {
  const { data } = props;
  return (
    <div className={classNames(styles['goods-info'], 'pr-2')}>
      {data.orderProductVOList?.map((item, i) => (
        <div
          key={i}
          className={classNames('h-28 border-r', i > 0 ? 'border-t' : '')}
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
                label: '状态',
                value: <ExpressStatus {...item} />,
              },
              {
                label: '操作',
                value: (
                  <ExpressStatusActions
                    item={item}
                    sendWarehouse={data.sendWarehouse}
                  />
                ),
              },
              ...showObj(item.freightSpaceName, {
                label: '仓位',
                value: item.freightSpaceName || '-',
              }),
            ]}
            labelStyle={{ textAlign: 'right' }}
            style={{ marginBottom: 20 }}
          />
        </div>
      ))}
    </div>
  );
};

export default SkuList;
