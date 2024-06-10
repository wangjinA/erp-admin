import {
  Form,
  FormInstance,
  FormProps,
  Grid,
  RowProps,
} from '@arco-design/web-react';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import createFormItem, { CreateFormItemType } from '../CreateFormItem';
import { isString, max } from 'lodash';
import { login } from '@/api/user';

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
      gutter = [0, 10],
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

    const maxLabelLength =
      max(
        formItemConfigList.map((item) =>
          isString(item.schema.label) ? item.schema.label.length : 0
        )
      ) + 2;

    return (
      <Form
        ref={formRef}
        layout="inline"
        labelCol={{
          ...labelCol,
          style: { flex: `0 0 ${maxLabelLength}em`, ...labelCol?.style },
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
        <Grid.Row gutter={gutter} className="w-full">
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
