import React from 'react';
import { List, Image, Descriptions } from '@arco-design/web-react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Order } from '@/types/order';

interface GoodsInfoProps {
  data: Order['orderProductList'];
}

export default (props: GoodsInfoProps) => {
  const { data } = props;
  return (
    <div
      style={{ height: 'max-content', overflow: 'hidden' }}
      className="arco-list-style"
    >
      <List
        className={classNames(styles['goods-info'])}
        dataSource={data}
        render={(item, index) => (
          <List.Item.Meta
            className={classNames(['h-28 !items-center', index > 0 ? 'border-t' : ''])}
            key={index}
            avatar={
              <Image
                className="size-24"
                src="https://img.alicdn.com/bao/uploaded/i1/2200798012881/O1CN01pZ7wCC1X9XeviUTY2_!!0-item_pic.jpg"
              />
            }
            title={item.productName}
            description={
              <Descriptions
                size="mini"
                column={2}
                colon=" :"
                data={[
                  {
                    label: '单  价',
                    value: item.unitPrice,
                  },
                  {
                    label: '数  量',
                    value: item.quantity,
                  },
                  {
                    label: '规格名称',
                    value: item.specificationName,
                    span: 24,
                  },
                  {
                    label: '规格SKU',
                    value: item.sku,
                    span: 24,
                  },
                ]}
                labelStyle={{ textAlign: 'right' }}
                style={{ marginBottom: 20 }}
              />
            }
          />
        )}
      />
    </div>
  );
};
