import classNames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import { Descriptions, Link, Message, Tag } from '@arco-design/web-react';
import { OrderResponseItem } from '@/types/order';
import { showModal } from '@/utils';
import { isClient } from '@/routes';

interface SendCargoInfoProps {
  data: OrderResponseItem;
}

const TagColors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];
function ExpressStatus(item: OrderResponseItem['orderProductVOList'][0]) {
  switch (item.trackingStatus) {
    case '1':
      return (
        <div>
          <Tag bordered size="small" color="green">
            已收
          </Tag>
        </div>
      );
    case '0':
      return (
        <div>
          <Tag bordered size="small" color="red">
            未收
          </Tag>
          {isClient() ? (
            <Tag
              className="cursor-pointer"
              bordered
              size="small"
              color="orange"
              checked={true}
              onClick={() => {
                showModal({
                  content: `所有跟快递单号"${item.trackingNo}"有关联的订单都会拒收，确定要继续吗？`,
                }).then((res) => {
                  Message.success('拒收成功');
                });
              }}
            >
              拒收
            </Tag>
          ) : null}
        </div>
      );
  }
  return <div></div>;
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
};

export default SkuList;
