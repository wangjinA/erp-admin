import { Divider } from '@arco-design/web-react'

import { CreateFormItemType } from '@/components/CreateFormItem'

export const DividerSchema = {
  schema: {
    field: 'Divider',
    span: 24,
  },
  formItemProps: {
    noStyle: true,
  },
  control: <Divider className="mt-1 mb-3"></Divider>,
}

export const SwitchFormItem: Partial<CreateFormItemType> = {
  formItemProps: {
    normalize: v => Number(v),
    formatter: v => v === 1,
    triggerPropName: 'checked',
  },
  control: 'switch',
}
