import {
  ColProps,
  DatePicker,
  Form,
  FormItemProps,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from '@arco-design/web-react'
import { omit } from 'lodash'
import React, { ReactElement, ReactNode } from 'react'

import LabelWithTips, { LabelWithTipsProps } from '../LabelWithTips'
import EntrepotRadio from '../Selectors/EntrepotRadio'
import RoleSelector from '../Selectors/RoleSelector'
import Upload from '../Upload'

import { TimeDefaultProps, TimeRangeDefaultProps } from '@/constants'

export interface FormSchema
  extends Partial<Pick<LabelWithTipsProps, 'position'>> {
  field: string
  label?: ReactNode | string
  tips?: ReactNode | string
  defaultValue?: any
  rules?: FormItemProps['rules']
  span?: number
  key?: number | string
  required?: boolean
}

type ControlType =
  | 'input'
  | 'textarea'
  | 'switch'
  | 'upload'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'number'
  | 'datePicker'
  | 'datePickerRange'
  | 'entrepotRadio'
  | 'role'

export interface CreateFormItemType {
  schema: FormSchema
  control?: ControlType | ReactElement | ((schema: FormSchema) => ReactElement)
  formItemProps?: FormItemProps
  controlProps?: Partial<any>
  showItemHandle?: (values?: any) => boolean
}
export type CreateFormItemParams = (params: CreateFormItemType) => ReactElement

const labelCol: ColProps = {
  style: {
    width: '8em',
    paddingLeft: 2,
  },
  // xl: {
  //   span: 6,
  // },
}
const wrapperCol: ColProps = {
  flex: 1,
  // xl: {
  //   span: 18,
  // },
}
const createFormItem: CreateFormItemParams = ({
  schema,
  control,
  formItemProps,
  controlProps,
  ...otherProps
}) => {
  const {
    field,
    label = '',
    tips,
    position,
    rules,
    defaultValue,
    required,
  } = schema

  const getFormControl = (s: FormSchema) => {
    if (typeof control === 'function') {
      return control(s)
    }
    else if (typeof control === 'object') {
      return control
    }
    else {
      switch (control) {
        case undefined:
        case 'input':
          return (
            <Input
              placeholder={`请输入${label}`}
              allowClear={true}
              {...controlProps}
            />
          )
        case 'radio':
          return <Radio.Group type="button" {...controlProps} />
        case 'textarea':
          return (
            <Input.TextArea placeholder="请输入" rows={4} {...controlProps} />
          )
        case 'switch':
          return (
            <Switch checkedText="是" uncheckedText="否" {...controlProps} />
          )
        case 'select':
          return (
            <Select
              allowClear={true}
              placeholder={`请选择${label}`}
              {...controlProps}
            />
          )
        case 'upload':
          return <Upload {...controlProps}></Upload>
        case 'number':
          return (
            <InputNumber placeholder={`请输入${label}`} {...controlProps} />
          )
        case 'datePicker':
          return <DatePicker {...TimeDefaultProps} {...controlProps} />
        case 'datePickerRange':
          return (
            <DatePicker.RangePicker
              className="w-full"
              {...TimeRangeDefaultProps}
              {...controlProps}
            />
          )
        case 'entrepotRadio':
          return (
            <EntrepotRadio {...controlProps} />
          )
        case 'role':
          return (
            <RoleSelector {...controlProps} />
          )
        default:
          return <span>{control}</span>
      }
    }
  }
  const defaultValueObj
    = defaultValue !== undefined ? { initialValue: defaultValue } : {}

  return (
    <Form.Item
      colon={label ? ':' : ''}
      key={field}
      label={<LabelWithTips label={label} tips={tips} position={position} />}
      field={field}
      rules={
        rules || required
          ? [
              {
                required: true,
                message: ['input', 'number'].includes(control as string)
                  ? `请输入${label}`
                  : `请完善${label}`,
              },
            ]
          : []
      }
      // labelCol={{
      //   style: {
      //     width: '8em',
      //     paddingLeft: 2,
      //   },
      // }}
      labelCol={{
        style: {
          ...(!label ? { display: 'none' } : {}),
        },
      }}
      wrapperCol={wrapperCol}
      // wrapperCol={{ style: { flex: 1, width: 0 } }}
      {...defaultValueObj}
      {...formItemProps}
      {...omit(otherProps, ['render', 'showItemHandle', 'hideTable'])}
    >
      {getFormControl({ ...schema })}
    </Form.Item>
  )
}

export default createFormItem
