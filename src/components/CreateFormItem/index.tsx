import React, { ReactNode, ReactElement } from 'react';
import {
  ColProps,
  Form,
  FormItemProps,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Switch,
  Upload,
} from '@arco-design/web-react';
import LabelWithTips, { LabelWithTipsProps } from '../LabelWithTips';
import { IconPlus } from '@arco-design/web-react/icon';

export interface FormSchema
  extends Partial<Pick<LabelWithTipsProps, 'position'>> {
  field: string;
  label?: ReactNode | string;
  tips?: ReactNode | string;
  defaultValue?: any;
  rules?: FormItemProps['rules'];
  span?: number;
  key?: number | string;
  required?: boolean;
}

type ControlType =
  | 'input'
  | 'upload'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'number';

export interface CreateFormItemType {
  schema: FormSchema;
  control?: ControlType | ReactElement | ((schema: FormSchema) => ReactElement);
  formItemProps?: FormItemProps;
  controlProps?: Partial<any>;
}
export type CreateFormItemParams = (params: CreateFormItemType) => ReactElement;

const labelCol: ColProps = {
  style: {
    width: '8em',
    paddingLeft: 2,
  },
  // xl: {
  //   span: 6,
  // },
};
const wrapperCol: ColProps = {
  flex: 1,
  // xl: {
  //   span: 18,
  // },
};
const createFormItem: CreateFormItemParams = ({
  schema,
  control,
  formItemProps,
  controlProps,
  ...otherProps
}) => {
  const { field, label, tips, position, rules, defaultValue, required } =
    schema;
  const getFormControl = (s: FormSchema) => {
    if (typeof control === 'string') {
      switch (control.toLowerCase()) {
        case undefined:
        case 'input':
          return (
            <Input
              placeholder={`请输入${label}`}
              allowClear={true}
              {...controlProps}
            />
          );
        case 'upload':
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
        case 'select':
          return <Select {...controlProps} />;
        case 'upload':
          return (
            <Upload
              action="/"
              // fileList={file ? [file] : []}
              showUploadList={false}
              onChange={(_, currentFile) => {
                // setFile({
                //   ...currentFile,
                //   url: URL.createObjectURL(currentFile.originFile),
                // });
              }}
              // onProgress={(currentFile) => {
              //   setFile(currentFile);
              // }}
            >
              {/* <div className={`arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''}`}> */}
              <div>
                {/* {
                file && file.url ? (
                  <div className="arco-upload-list-item-picture custom-upload-avatar">
                    <img src={file.url} />
                    <div className="arco-upload-list-item-picture-mask">
                      <IconEdit />
                    </div>
                    {file.status === 'uploading' && file.percent < 100 && (
                      <Progress
                        percent={file.percent}
                        type="circle"
                        size="mini"
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translateX(-50%) translateY(-50%)',
                        }}
                      />
                    )}
                  </div>
                ) : ( */}
                <div className="arco-upload-trigger-picture">
                  <div className="arco-upload-trigger-picture-text">
                    <IconPlus />
                    <div className="mt-2">点击上传</div>
                  </div>
                </div>
                {/* )} */}
              </div>
            </Upload>
          );
        case 'number':
          return (
            <InputNumber placeholder={`请输入${label}`} {...controlProps} />
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
      colon=":"
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
      wrapperCol={wrapperCol}
      // wrapperCol={{ style: { flex: 1, width: 0 } }}
      {...defaultValueObj}
      {...formItemProps}
      {...otherProps}
    >
      {getFormControl({ ...schema })}
    </Form.Item>
  );
};

export default createFormItem;
