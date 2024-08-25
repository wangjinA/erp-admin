import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'

import { ScanParams, scanAPI } from '@/api/admin/entrepot'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import { showMessage } from '@/utils'

interface DeliveryButtonProps extends ScanParams {
  buttonProps?: ButtonProps
  onSuccess: () => void
}
export default (props: DeliveryButtonProps) => {
  const { buttonProps, onSuccess, ...scanParams } = props
  const { loading, run } = useRequest(async () => {
    await showMessage(() => scanAPI.ScanOut(scanParams))
    onSuccess()
  }, {
    manual: true,
  })
  return (
    <>
      <PopconfirmDelete
        title="确定出库？"
        buttonProps={{
          loading,
        }}
        onOk={() => {
          run()
        }}
        disabled={buttonProps?.disabled}
      >
        <Button
          type="text"
          status="warning"
          loading={loading}
          {...buttonProps}
        >
          包裹出库
        </Button>
      </PopconfirmDelete>
    </>
  )
}
