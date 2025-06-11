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
import DictSelector from '../Selectors/DictSelector'
import EntrepotRadio from '../Selectors/EntrepotRadio'
import EntrepotSelector from '../Selectors/EntrepotSelector'
import ProductSelector from '../Selectors/ProductSelector'
import RegionSelector from '../Selectors/RegionSelector'
import RoleSelector from '../Selectors/RoleSelector'
import ShopRadio, { ShopSelector } from '../Selectors/ShopRadio'
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

export enum FormType {
  default = 'default',
  preview = 'preview',
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
  | 'entrepotSelector'
  | 'role'
  | 'dictSelector'
  | 'regionSelector'
  | 'shopRadio'
  | 'shopSelector'
  | 'productSelector'

export interface CreateFormItemType {
  schema: FormSchema
  control?: ControlType | ReactElement | ((schema: FormSchema) => ReactElement)
  formItemProps?: FormItemProps
  controlProps?: Partial<any>
  formType?: FormType
  showItemHandle?: (values?: any) => boolean
}
export type CreateFormItemParams = (params: CreateFormItemType) => ReactElement

// const labelCol: ColProps = {
//   style: {
//     width: '8em',
//     paddingLeft: 2,
//   },
//   // xl: {
//   //   span: 6,
//   // },
// }
const wrapperCol: ColProps = {
  flex: 1,
  // xl: {
  //   span: 18,
  // },
}

function FormControl(props: Pick<CreateFormItemType, 'schema' | 'control' | 'controlProps' | 'formType'> & {
  value?: any
  checked?: boolean
  onChange?: (value: any) => void
}) {
  const {
    schema,
    control,
    controlProps,
    formType,
    ...restProps
  } = omit(props, ['formItemProps', 'hideTable']) // 避免加入dom attribute

  const {
    label = '',
  } = schema

  const {
    value,
    checked,
  } = restProps

  const isPreview = formType === FormType.preview

  if (typeof control === 'function') {
    return control({
      ...schema,
      ...restProps,
    })
  }
  else if (typeof control === 'object') {
    return control
  }
  else {
    switch (control) {
      case undefined:
      case 'input':
        return (
          isPreview
            ? <span>{value || '-'}</span>
            : (
                <Input
                  placeholder={`请输入${label}`}
                  allowClear={true}
                  {...controlProps}
                  {...restProps}
                />
              )
        )
      case 'radio':
        return isPreview ? <span>{controlProps?.options?.find(item => item.value === value)?.label || '-'}</span> : <Radio.Group type="button" {...controlProps} {...restProps} />
      case 'textarea':
        return isPreview
          ? <span>{value}</span>
          : (
              <Input.TextArea placeholder="请输入" rows={4} {...controlProps} {...restProps} />
            )
      case 'switch':
        return isPreview
          ? <span>{checked ? controlProps?.checkedText || '是' : controlProps?.unCheckedText || '否'}</span>
          : (
              <Switch checkedText="是" uncheckedText="否" {...controlProps} {...restProps} />
            )
      case 'select':
        return (
          <Select
            allowClear={true}
            placeholder={`请选择${label}`}
            {...controlProps}
            {...restProps}
          />
        )
      case 'upload':
        return <Upload {...controlProps} {...restProps}></Upload>
      case 'number':
        return (
          isPreview ? <span>{value}</span> : <InputNumber placeholder={`请输入${label}`} {...controlProps} {...restProps} />
        )
      case 'datePicker':
        return isPreview ? <span>{value}</span> : <DatePicker {...TimeDefaultProps} {...controlProps} {...restProps} />
      case 'datePickerRange':
        return (
          isPreview
            ? <span>{value}</span>
            : (
                <DatePicker.RangePicker
                  className="w-full"
                  {...TimeRangeDefaultProps}
                  {...controlProps}
                  {...restProps}
                />
              )
        )
      case 'entrepotRadio':
        return (
          <EntrepotRadio {...controlProps} {...restProps} />
        )
      case 'entrepotSelector':
        return (
          <EntrepotSelector {...controlProps} {...restProps} />
        )
      case 'role':
        return <RoleSelector {...controlProps} {...restProps} />
      case 'dictSelector':
        return <DictSelector {...controlProps as any} {...restProps} />

      case 'regionSelector':
        return <RegionSelector {...controlProps as any} {...restProps} />
      case 'shopRadio':
        return <ShopRadio {...controlProps as any} {...restProps} />
      case 'shopSelector':
        return <ShopSelector {...controlProps as any} {...restProps} />
      case 'productSelector':
        return <ProductSelector {...controlProps as any} {...restProps} />
      default:
        return <span>{control}</span>
    }
  }
}

const createFormItem: CreateFormItemParams = (props: CreateFormItemType) => {
  const {
    schema,
    control,
    formItemProps,
    controlProps,
    formType,
    ...otherProps
  } = props
  const {
    field,
    label = '',
    tips,
    position,
    rules,
    defaultValue,
    required,
  } = schema

  const isPreview = formType === FormType.preview
  const defaultValueObj
    = defaultValue !== undefined ? { initialValue: defaultValue } : {}
  return (
    <Form.Item
      colon={label ? ':' : ''}
      key={field}
      label={<LabelWithTips label={label} tips={tips} position={position} />}
      field={field}
      rules={
        ((rules?.length) || required)
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
      {/* {getFormControl({ ...schema })} */}
      <FormControl {...props}></FormControl>
    </Form.Item>
  )
}

export default createFormItem
