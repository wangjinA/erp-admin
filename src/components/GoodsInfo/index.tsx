import React, { useRef, useState } from 'react';
import { List, Image, Descriptions, Switch } from '@arco-design/web-react';
import styles from './index.module.less';
import classNames from 'classnames';
import { OrderResponseItem } from '@/types/order';
import FilterForm from '../FilterForm';
import DictSelector from '../Selectors/DictSelector';
import { cloneDeep } from 'lodash';

interface GoodsInfoProps {
  data: OrderResponseItem['orderProductVOList'];
  isEdit?: boolean;
  onChange?: (data) => void;
}

export default (props: GoodsInfoProps) => {
  const { data, isEdit, onChange } = props;
  // const [privateData, setPrivateData] = useState(cloneDeep(data));
  const dataRef = useRef(data);
  console.log(data);
  console.log(dataRef.current);

  return (
    <div
      style={{ height: 'max-content', overflow: 'hidden' }}
      className="arco-list-style"
    >
      <List
        className={classNames(styles['goods-info'])}
        dataSource={data || []}
        bordered={isEdit}
        render={(item, index) => (
          <div
            key={item.id}
            className={classNames([
              'grid grid-cols-2',
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
            {isEdit ? (
              <div className="border-l pl-2">
                <FilterForm
                  initialValues={item}
                  onChange={(_, v: any) => {
                    dataRef.current[index] = v;
                    onChange?.(dataRef.current);
                  }}
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
                        field: 'stockOutStatus',
                        span: 9,
                      },
                      formItemProps: {
                        triggerPropName: 'checked',
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
            ) : null}
          </div>
        )}
      />
    </div>
  );
};
