import {
  Form,
  FormInstance,
  FormProps,
  Grid,
  RowProps,
} from '@arco-design/web-react';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import createFormItem, { CreateFormItemType } from '../CreateFormItem';

const getFormItemConfigListDefaultValues = (list: CreateFormItemType[]) =>
  list.reduce((pre, cur) => {
    if (cur.schema.defaultValue !== undefined) {
      pre[cur.schema.field] = cur.schema.defaultValue;
    }
    return pre;
  }, {});

type FilterFormProps = FormProps & {
  formItemConfigList: CreateFormItemType[];
  className?: string;
  gutter?: RowProps['gutter'];
  span?: number;
};
const FilterForm = React.forwardRef(
  (
    {
      formItemConfigList,
      className = '',
      labelCol,
      onValuesChange,
      gutter = 12,
      span = 8,
      initialValues,
      ...otherFormProps
    }: FilterFormProps,
    ref
  ) => {
    const formRef = useRef<FormInstance>();
    useImperativeHandle(ref, () => formRef.current);

    // 设置一下初始值
    useEffect(() => {
      const initValues = {
        ...initialValues,
        ...formRef.current.getFieldsValue(),
        ...getFormItemConfigListDefaultValues(formItemConfigList),
      };

      setTimeout(() => {
        formRef.current?.setFieldsValue(initValues);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formItemConfigList.map((item) => item.schema.field).toString()]);

    return (
      <Form
        ref={formRef}
        labelCol={{
          ...labelCol,
          style: { flex: '0 0 6em', ...labelCol?.style },
        }}
        wrapperCol={{
          className: 'w-0 flex-1',
        }}
        onValuesChange={(value) => {
          // 因为去除筛选条件后，少了一个formItem，此时需要再获取一遍最新数据
          onValuesChange?.(value, formRef.current.getFieldsValue());
        }}
        initialValues={initialValues}
        {...otherFormProps}
        className={`${className} bg-white`}
      >
        <Grid.Row gutter={gutter}>
          {[...formItemConfigList]
            .filter((item) => item.schema.field || item.schema.key)
            .map((item) =>
              item.control ? (
                <Grid.Col
                  span={item.schema.span || span}
                  key={item.schema.field || item.schema.key}
                >
                  {createFormItem({
                    ...item,
                    schema: {
                      ...item.schema,
                      defaultValue:
                        initialValues?.[item.schema.field] ??
                        item.schema.defaultValue,
                    },
                  })}
                </Grid.Col>
              ) : null
            )}
        </Grid.Row>
      </Form>
    );
  }
);
export default FilterForm;
