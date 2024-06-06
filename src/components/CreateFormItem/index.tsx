import React, { ReactNode, ReactElement } from 'react';
import {
  Form,
  FormItemProps,
  Input,
  Radio,
  Switch,
} from '@arco-design/web-react';
import LabelWithTips, { LabelWithTipsProps } from '../LabelWithTips';

export interface FormSchema
  extends Partial<Pick<LabelWithTipsProps, 'position'>> {
  field: string;
  label?: ReactNode | string;
  tips?: ReactNode | string;
  defaultValue?: any;
  rules?: Array<any>;
  span?: number;
  key?: number | string;
}
export interface CreateFormItemType {
  schema: FormSchema;
  control?: string | ReactElement | ((schema: FormSchema) => ReactElement);
  formItemProps?: FormItemProps;
  controlProps?: Partial<any>;
}
export type CreateFormItemParams = (params: CreateFormItemType) => ReactElement;

const createFormItem: CreateFormItemParams = ({
  schema,
  control,
  formItemProps,
  controlProps,
}) => {
  const { field, label, tips, position, rules, defaultValue } = schema;
  const getFormControl = (s: FormSchema) => {
    if (!control || control === 'input') {
      return <Input placeholder="请输入" allowClear={true} {...controlProps} />;
    } else if (typeof control === 'string') {
      switch (control.toLowerCase()) {
        case 'radio':
          return <Radio.Group type="button" {...controlProps} />;
        case 'textarea':
          return (
            <Input.TextArea placeholder="请输入" rows={4} {...controlProps} />
          );
        case 'switch':
          return (
            <Switch checkedText="是" uncheckedText="否" {...controlProps} />
          );
        default:
          return <span>{control}</span>;
      }
    } else if (typeof control === 'function') {
      return control(s);
    } else {
      return control;
    }
  };
  const defaultValueObj =
    defaultValue !== undefined ? { initialValue: defaultValue } : {};

  return (
    <Form.Item
      key={field}
      label={<LabelWithTips label={label} tips={tips} position={position} />}
      field={field}
      rules={rules}
      wrapperCol={{ style: { flex: 1, width: 0 } }}
      {...defaultValueObj}
      {...formItemProps}
    >
      {getFormControl({ ...schema })}
    </Form.Item>
  );
};

export default createFormItem;
