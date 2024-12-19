import { ModalProps, RangePickerProps } from '@arco-design/web-react'
import dayjs from 'dayjs'

const timeRangeShortcuts: any[] = [
  {
    text: '今天',
    value: () => [dayjs().startOf('day'), dayjs()],
  },
  {
    text: '昨天',
    value: () => [
      dayjs().subtract(1, 'day').startOf('day'),
      dayjs().subtract(1, 'day').endOf('day'),
    ],
  },
  {
    text: '最近一周',
    value: () => [dayjs().startOf('week'), dayjs()],
  },
  {
    text: '上周',
    value: () => [
      dayjs()
        .subtract(1, 'week')
        .startOf('week')
        .add(1, 'day'),
      dayjs().subtract(1, 'week').endOf('week').add(1, 'day'),
    ],
  },
  {
    text: '最近一个月',
    value: () => [
      dayjs().startOf('day').subtract(1, 'month'),
      dayjs(),
    ],
  },
  {
    text: '上个月',
    value: () => [
      dayjs()
        .subtract(1, 'month')
        .startOf('day'),
      dayjs().subtract(1, 'month').endOf('day'),
    ],
  },
  {
    text: '最近三个月',
    value: () => [
      dayjs().startOf('day').subtract(3, 'month'),
      dayjs(),
    ],
  },
]

export const TimeRangeDefaultProps: RangePickerProps = {
  showTime: {
    defaultValue: ['00:00:00', '23:59:59'],
    format: 'HH:mm',
  },
  format: 'YYYY-MM-DD HH:mm:ss',
  shortcuts: timeRangeShortcuts,
  shortcutsPlacementLeft: true,
}

export const TimeRangeDisabledDateProps: RangePickerProps = {
  disabledDate: (current) => {
    return current.isAfter(dayjs().endOf('day')) || current.isBefore(dayjs().subtract(3, 'month'))
  },
}

export const TimeDefaultProps = {
  format: 'YYYY-MM-DD HH:mm:ss',
  className: 'w-full',
}

export enum ShowFormType {
  create = 'create',
  edit = 'edit',
  view = 'view',
}

export const ShowFormTypeMap = {
  [ShowFormType.create]: '创建',
  [ShowFormType.edit]: '编辑',
  [ShowFormType.view]: '查看',
}

export const ShowFormTypeActionMap = {
  [ShowFormType.create]: '添加',
  [ShowFormType.edit]: '修改',
}

export const WhetherOptions = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
]
export const WhetherBooleanOptions = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
]

export const FormModalCommonProps: ModalProps = {
  style: {
    width: '900px',
  },
}
