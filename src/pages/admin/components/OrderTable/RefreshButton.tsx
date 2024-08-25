import { Button, Message } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'

import { orderAPI as adminOrderApi } from '@/api/admin/order'
import { orderAPI } from '@/api/client/order'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { isAdmin } from '@/routes'
import { showMessage } from '@/utils'

interface RefreshButtonProps {
  buttonProps?: ButtonProps
  ids: number[]
}
export default (props: RefreshButtonProps) => {
  const { buttonProps, ids } = props
  const refreshHandle = useRequest(
    async () => {
      if (!ids?.length) {
        return Message.error('请选择订单')
      }
      await showMessage(() => isAdmin() ? adminOrderApi.refresh(ids) : orderAPI.refresh(ids[0]), '更新')
      bus.emit(EmitTypes.refreshOrderPage)
    },
    {
      manual: true,
    },
  )
  return (
    <>
      <Button
        type="text"
        status="warning"
        loading={refreshHandle.loading}
        onClick={() => {
          refreshHandle.run()
        }}
        {...buttonProps}
      >
        更新订单
      </Button>
    </>
  )
}
