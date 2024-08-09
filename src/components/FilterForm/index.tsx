import {
  Form,
  FormInstance,
  FormProps,
  Grid,
  RowProps,
} from '@arco-design/web-react';
import classNames from 'classnames';
import { isString, max } from 'lodash';
import React, { useEffect, useImperativeHandle, useRef } from 'react';

import createFormItem, { CreateFormItemType } from '../CreateFormItem';

import { HideClass } from '@/constants/style';

function getFormItemConfigListDefaultValues(list: CreateFormItemType[]) {
  return list.reduce((pre, cur) => {
    if (cur.schema.defaultValue !== undefined) {
      pre[cur.schema.field] = cur.schema.defaultValue;
    }
    return pre;
  }, {});
}

export type FilterFormProps = FormProps & {
  formItemConfigList: CreateFormItemType[];
  className?: string | string[];
  gutter?: RowProps['gutter'];
  span?: number;
  labelLength?: number;
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
      labelLength,
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
    }, [formItemConfigList.map((item) => item.schema.field).toString()]);

    const maxLabelLength =
      labelLength ||
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
            .map((item) => (
              <Grid.Col
                className={classNames(
                  item.formItemProps?.hidden ? HideClass : ''
                )}
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
            ))}
        </Grid.Row>
      </Form>
    );
  }
);
export default FilterForm;
