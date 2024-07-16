import { orderAPI } from '@/api/order';
import FilterForm from '@/components/FilterForm';
import { useLocalStorageState, useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  InputTag,
  Button,
  Typography,
  Space,
  Card,
  Switch,
  Result,
  Link,
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './index.module.less';
import {
  OrderCreateSchema1,
  OrderCreateSchema2,
  OrderCreateSchema3,
} from './schema';
import classNames from 'classnames';
import { HideClass } from '@/constants/style';
import {
  IconArrowFall,
  IconArrowRise,
  IconDelete,
  IconPlus,
} from '@arco-design/web-react/icon';
import { Order } from '@/types/order';
import { useDebouncedCallback } from 'use-debounce';
import PopconfirmDelete from '@/components/PopconfirmDelete';
import { showMessageStatus, tryFn } from '@/utils';

const { Title, Paragraph } = Typography;


export default () => {
  const [formData, setFormData] = useLocalStorageState<Partial<Order>>(
    'create-order',
    {}
  );
  const [current, setCurrent] = useState(3);
  const [skuList, setSkuList] = useState([0]);

  const setFormDataDebounce = useDebouncedCallback((v: Partial<Order>) => {
    setFormData({
      ...formData,
      ...v,
    });
  }, 300);

  const [form] = Form.useForm();
  const t = useLocale(locale);
  const createHandler = useRequest(
    () => {
      console.log(formData);
      return tryFn(async () => {
        const res = await orderAPI.insert(formData);
        await showMessageStatus(res.data);
      });
    },
    {
      manual: true,
    }
  );
  const reCreateForm = () => {
    form.resetFields();
    setCurrent(1);
  };

  const toNext = async () => {
    try {
      await form.validate();
      setCurrent(current + 1);
    } catch (_) {}
  };

  useEffect(() => {
    console.log(formData);
  }, []);

  console.log(formData);
  return (
    <div className="bg-white p-4">
      <Card>
        {/* <Title heading={5}>{t['stepForm.desc.basicInfo']}</Title> */}
        <div className={styles.wrapper}>
          <Steps current={current} lineless className="mb-20">
            <Steps.Step
              title={t['stepForm.title.basicInfo']}
              description="订单基础信息"
            />
            <Steps.Step title="订单商品信息" description="详细的商品sku" />
            <Steps.Step title="买家基本信息" description="收件人信息相关" />
            <Steps.Step title="完成创建" description="创建成功" />
          </Steps>
          <FilterForm
            initialValues={formData}
            className={classNames(current !== 1 ? HideClass : '')}
            span={12}
            size="small"
            formItemConfigList={OrderCreateSchema1}
            onValuesChange={(val, vals) => {
              setFormDataDebounce(vals);
            }}
          ></FilterForm>
          <div className={classNames(current !== 2 ? HideClass : '')}>
            <Form.Provider
              onFormValuesChange={async (name, changedValues, info) => {
                const orderProductList = await Promise.all(
                  skuList.map((sku, index) =>
                    info.forms[`orderProductList[${index}]`].validate()
                  )
                );
                setFormDataDebounce({ orderProductList });
              }}
            >
              <div className="flex flex-col gap-4">
                {skuList.map((item, index) => (
                  <Card
                    key={item}
                    bordered={true}
                    title={`SKU - ${index + 1}`}
                    hoverable
                    extra={
                      skuList.length > 1 && (
                        <Space>
                          <PopconfirmDelete
                            onOk={() => {
                              skuList.splice(index, 1);
                              setSkuList([...skuList]);
                            }}
                          >
                            <Button
                              size="mini"
                              icon={<IconDelete />}
                              shape="circle"
                              status="danger"
                              style={{
                                margin: '0 20px',
                              }}
                              // onClick={() => remove(index)}
                            ></Button>
                          </PopconfirmDelete>
                          {/* <Button
                            size="mini"
                            shape="circle"
                            // onClick={() =>
                            //   move(index, index > 0 ? index - 1 : index + 1)
                            // }
                          >
                            {index > 0 ? <IconArrowRise /> : <IconArrowFall />}
                          </Button> */}
                        </Space>
                      )
                    }
                  >
                    <FilterForm
                      initialValues={formData.orderProductList?.[index]}
                      id={`orderProductList[${index}]`}
                      span={12}
                      size="small"
                      formItemConfigList={OrderCreateSchema2}
                      // formItemConfigList={OrderCreateSchema2.map(oitem => ({
                      //   ...oitem,
                      //   schema: {
                      //     ...oitem.schema,
                      //     field: `orderProductList[${index}].${oitem.schema.field}`
                      //   }
                      // }))}
                      onValuesChange={(val, vals) => {
                        setFormDataDebounce(vals);
                      }}
                    ></FilterForm>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  status="success"
                  className="mt-4"
                  icon={<IconPlus />}
                  onClick={() => {
                    skuList.push(skuList.length);
                    setSkuList([...skuList]);
                  }}
                >
                  添加
                </Button>
              </div>
            </Form.Provider>
          </div>
          {current === 4 && (
            <Result
              status="success"
              title={t['stepForm.created.success.title']}
              subTitle={t['stepForm.created.success.desc']}
              extra={[
                <Button
                  key="reset"
                  style={{ marginRight: 16 }}
                  onClick={() => {
                    setCurrent(1);
                  }}
                >
                  继续创建
                </Button>,
                <Button key="again" type="primary" onClick={reCreateForm}>
                  查看订单
                </Button>,
              ]}
            />
          )}
          <FilterForm
            initialValues={formData}
            className={classNames(current !== 3 ? HideClass : '')}
            span={12}
            size="small"
            formItemConfigList={OrderCreateSchema3}
            onValuesChange={(val, vals) => {
              setFormDataDebounce(vals);
            }}
          ></FilterForm>
          <div className="flex justify-center gap-4 mt-12">
            {current > 1 && current < 4 && (
              <Button size="large" onClick={() => setCurrent(current - 1)}>
                上一步
              </Button>
            )}
            {current < 3 && (
              <Button type="primary" size="large" onClick={toNext}>
                下一步
              </Button>
            )}
            {current === 3 && (
              <Button
                type="primary"
                size="large"
                onClick={() => createHandler.run()}
                loading={createHandler.loading}
              >
                创建
              </Button>
            )}
          </div>
        </div>
        <div className={styles['form-extra']}>
          <Title heading={6}>手动创建订单说明</Title>
          <Paragraph type="secondary">
            {t['stepForm.created.extra.desc']}
            <Button type="text">{t['stepForm.created.extra.detail']}</Button>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};
