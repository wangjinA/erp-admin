import { Button, Popconfirm, PopconfirmProps } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import { ButtonProps } from '@arco-design/web-react';

const PopconfirmDelete: React.FC<
  PopconfirmProps & { buttonProps?: ButtonProps }
> = (props) => {
  const { buttonProps, children, ...popconfirmProps } = props;
  return (
    <Popconfirm title="确认删除？" {...popconfirmProps}>
      {children || (
        <Button
          icon={<IconDelete></IconDelete>}
          status="danger"
          size="small"
          {...buttonProps}
        >
          删除
        </Button>
      )}
    </Popconfirm>
  );
};

export default PopconfirmDelete;
