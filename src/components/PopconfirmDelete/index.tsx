import { Button, Popconfirm, PopconfirmProps } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import { ButtonProps } from '@arco-design/web-react';

export default (props: PopconfirmProps & { buttonProps?: ButtonProps }) => {
  const { buttonProps, ...popconfirmProps } = props;
  return (
    <Popconfirm title="确认删除？" {...popconfirmProps}>
      <Button
        status="warning"
        icon={<IconDelete></IconDelete>}
        size="small"
        {...buttonProps}
      >
        删除
      </Button>
    </Popconfirm>
  );
};
