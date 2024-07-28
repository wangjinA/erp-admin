import { ModalProps, RangePickerProps } from '@arco-design/web-react';

export const TimeRangeDefaultProps = {
  showTime: {
    defaultValue: ['00:00', '23:59'],
    format: 'HH:mm',
  },
  format: 'YYYY-MM-DD HH:mm',
};

export const TimeDefaultProps = {
  format: 'YYYY-MM-DD HH:mm',
  className: "w-full"
};

export enum ShowFormType {
  'create' = 'create',
  'edit' = 'edit',
  'view' = 'view',
}

export const ShowFormTypeMap = {
  [ShowFormType.create]: '创建',
  [ShowFormType.edit]: '编辑',
  [ShowFormType.view]: '查看',
};

export const ShowFormTypeActionMap = {
  [ShowFormType.create]: '添加',
  [ShowFormType.edit]: '修改',
};

export const WhetherOptions = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
];
export const WhetherBooleanOptions = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

export const FormModalCommonProps: ModalProps = {
  style: {
    width: '900px',
  },
};
