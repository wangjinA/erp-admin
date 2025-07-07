import {
  Form,
  FormInstance,
  FormProps,
  Grid,
  RowProps,
} from '@arco-design/web-react'
import classNames from 'classnames'
import { isString, max } from 'lodash'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'

import createFormItem, { CreateFormItemType, FormType } from '../CreateFormItem'

import { HideClass } from '@/constants/style'

function getFormItemConfigListDefaultValues(list: CreateFormItemType[]) {
  return list.reduce((pre, cur) => {
    if (cur.schema.defaultValue !== undefined) {
      pre[cur.schema.field] = cur.schema.defaultValue
    }
    return pre
  }, {})
}

export type FilterFormProps = FormProps & {
  formItemConfigList: CreateFormItemType[]
  className?: string | string[]
  gutter?: RowProps['gutter']
  span?: number
  labelLength?: number
  formType?: FormType
}
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
      formType,
      ...otherFormProps
    }: FilterFormProps,
    ref,
  ) => {
    const formRef = useRef<FormInstance>()
    const [formData, setFormData] = useState<any>()

    useImperativeHandle(ref, () => formRef.current)

    // 设置一下初始值
    useEffect(() => {
      const initValues = {
        ...initialValues,
        ...formRef.current.getFieldsValue(),
        ...getFormItemConfigListDefaultValues(formItemConfigList),
      }

      setTimeout(() => {
        formRef.current?.setFieldsValue(initValues)
        setFormData(initValues)
      })
    }, [formItemConfigList.map(item => item.schema.field).toString()])

    const requiredWidth = (formItemConfigList.some(oitem => oitem.schema.required || oitem.formItemProps?.required || oitem.formItemProps?.rules?.some(jitem => jitem.required)) ? 0.6 : 0)

    const maxLabelLength
      = labelLength
      || max(
        formItemConfigList.map(item =>
          isString(item.schema.label) ? (item.schema.label as string).length : 0,
        ),
      ) + 2 + requiredWidth

    return (
      <Form
        ref={formRef}
        layout="inline"
        labelCol={{
          ...labelCol,
          style: { flex: `0 0 ${maxLabelLength}em`, ...labelCol?.style },
        }}
        onSubmit={(v) => {
          console.log(v)
        }}
        wrapperCol={{
          className: 'w-0 flex-1',
          ...(otherFormProps.wrapperCol || {}),
        }}
        onValuesChange={(value) => {
          const values = formRef.current?.getFieldsValue()
          if (values) {
            // 因为去除筛选条件后，少了一个formItem，此时需要再获取一遍最新数据
            onValuesChange?.(value, values)
            setFormData(values)
          }
        }}
        initialValues={initialValues}
        {...otherFormProps}
        className={`${className} bg-white`}
      >
        <Grid.Row gutter={gutter} className="w-full">
          {[...formItemConfigList]
            .filter(item => item.schema.field || item.schema.key)
            .map(item => (
              (item.showItemHandle ? item.showItemHandle(formData) : true)
                ? (
                  <Grid.Col
                    className={classNames(
                      item.formItemProps?.hidden ? HideClass : '',
                    )}
                    span={item.schema.span || span}
                    key={item.schema.field || item.schema.key}
                  >
                    {createFormItem({
                      ...item,
                      formItemProps: {
                        ...item.formItemProps,
                        // className: classNames(item.formItemProps?.className, span === 24 ? '!mr-0' : ''),
                        labelCol: {
                          ...labelCol,
                          ...item.formItemProps?.labelCol,
                          style: item.schema.label ? { flex: `0 0 ${maxLabelLength}em`, ...labelCol?.style, ...item.formItemProps?.labelCol?.style } : { display: 'none' },
                        },
                      },
                      schema: {
                        ...item.schema,
                        defaultValue:
                          initialValues?.[item.schema.field]
                          ?? item.schema.defaultValue,
                      },
                      formType,
                    })}
                  </Grid.Col>
                )
                : null
            ))}
        </Grid.Row>
      </Form>
    )
  },
)
export default FilterForm
