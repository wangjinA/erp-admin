import { Divider } from '@arco-design/web-react';

export const DividerSchema = {
  schema: {
    field: 'Divider',
    span: 24,
  },
  formItemProps: {
    noStyle: true,
  },
  control: <Divider className="mt-1 mb-3"></Divider>,
};
