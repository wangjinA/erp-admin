import { Button, ButtonProps, Popconfirm, PopconfirmProps } from '@arco-design/web-react'
import { IconDelete } from '@arco-design/web-react/icon'

import { useRequest } from 'ahooks'

import { AxiosResponse } from 'axios'

import { APIResponse } from '@/api/type'
import { showMessage, showModal } from '@/utils'

const PopconfirmDelete: React.FC<
  PopconfirmProps & { buttonProps?: ButtonProps, isModal?: boolean, deleteRequest?: () => Promise<AxiosResponse<APIResponse<any>>> }
> = (props) => {
  const { buttonProps, children, isModal, deleteRequest, ...popconfirmProps } = props

  const deleteHandle = useRequest(() => {
    if (deleteRequest) {
      return showMessage(() => deleteRequest())
    }
    return null
  }, {
    manual: true,
  })

  return isModal
    ? (
        <>
          {children || (
            <Button
              icon={<IconDelete></IconDelete>}
              status="danger"
              size="small"
              loading={deleteHandle.loading}
              onClick={() => {
                showModal({
                  content: popconfirmProps.content,
                  title: popconfirmProps.title,
                }).then(() => {
                  deleteHandle.run()
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
        <Popconfirm
          title="确认删除？"
          disabled={buttonProps?.disabled}
          okButtonProps={{
            loading: deleteHandle.loading,
          }}
          {...popconfirmProps}
          onOk={(e) => {
            deleteHandle.run()
            popconfirmProps?.onOk?.(e)
          }}
        >
          {children || (
            <Button
              icon={<IconDelete></IconDelete>}
              status="danger"
              size="small"
              loading={deleteHandle.loading}
              {...buttonProps}
            >
              删除
            </Button>
          )}
        </Popconfirm>
      )
}

export default PopconfirmDelete
