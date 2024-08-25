import { Button, ButtonProps, Popconfirm, PopconfirmProps } from '@arco-design/web-react'
import { IconDelete } from '@arco-design/web-react/icon'

import { showModal } from '@/utils'

const PopconfirmDelete: React.FC<
  PopconfirmProps & { buttonProps?: ButtonProps, isModal?: boolean }
> = (props) => {
  const { buttonProps, children, isModal, ...popconfirmProps } = props
  return isModal
    ? (
        <>
          {children || (
            <Button
              icon={<IconDelete></IconDelete>}
              status="danger"
              size="small"
              onClick={() => {
                showModal({
                  content: popconfirmProps.content,
                  title: popconfirmProps.title,
                }).then(() => {
                  popconfirmProps.onOk({} as any)
                })
              }}
              {...buttonProps}
            >
              删除
            </Button>
          )}
        </>
      )
    : (
        <Popconfirm title="确认删除？" disabled={buttonProps?.disabled} {...popconfirmProps}>
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
      )
}

export default PopconfirmDelete
