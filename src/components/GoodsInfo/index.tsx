import React from 'react';
import { List, Image, Descriptions, Switch } from '@arco-design/web-react';
import styles from './index.module.less';
import classNames from 'classnames';
import { OrderResponseItem } from '@/types/order';
import FilterForm from '../FilterForm';
import DictSelector from '../Selectors/DictSelector';

interface GoodsInfoProps {
  data: OrderResponseItem['orderProductVOList'];
}

export default (props: GoodsInfoProps) => {
  const { data } = props;
  console.log(data);

  return (
    <div
      style={{ height: 'max-content', overflow: 'hidden' }}
      className="arco-list-style"
    >
      <List
        className={classNames(styles['goods-info'])}
        dataSource={data}
        bordered={true}
        render={(item, index) => (
          <div
            key={item.id}
            className={classNames([
              'h-28 grid grid-cols-2',
              index > 0 ? 'border-t' : '',
            ])}
          >
            <List.Item.Meta
              className="!items-center p-2"
              avatar={<Image className="size-24" src={item.productImg[0]} />}
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
            <div className="border-l pl-2">
              <FilterForm
                formItemConfigList={[
                  {
                    schema: {
                      label: '发货方式',
                      field: 'deliveryMethod',
                      span: 15,
                    },
                    control: (
                      <DictSelector
                        dictCode="transport_type"
                        type="radio"
                      ></DictSelector>
                    ),
                  },
                  {
                    schema: {
                      label: '',
                      field: 'deliveryMethod',
                      span: 9,
                    },
                    control: (
                      <Switch
                        checkedText="缺货打包"
                        uncheckedText="缺货打包"
                      ></Switch>
                    ),
                  },
                  {
                    schema: {
                      label: '快递单号',
                      field: 'trackingNo',
                      span: 24,
                    },
                  },
                ]}
              ></FilterForm>
            </div>
          </div>
        )}
      />
    </div>
  );
};
