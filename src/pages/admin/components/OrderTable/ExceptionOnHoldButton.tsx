import { Button, } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import { orderAPI } from '@/api/admin/order'
import { showMessage } from '@/utils'
import { bus, EmitTypes } from '@/hooks/useEventBus'

interface ActionHistoryProps {
  buttonProps?: ButtonProps
  id: string
  abeyanceStatus: boolean;
}
export default (props: ActionHistoryProps) => {
  const { buttonProps, id, abeyanceStatus } = props

  const eohHandle = useRequest(
    async () => {
      return showMessage(() => orderAPI.exceptionOnHold({
        id,
        abeyanceStatus: abeyanceStatus ? 0 : 1,
      }), abeyanceStatus ? '取消' : '异常搁置').then(()=>{
        bus.emit(EmitTypes.refreshOrderPage)
      })
    },
    {
      manual: true,
    },
  )
  return (
    <>
      <Button
        onClick={() => {
          eohHandle.run()
        }}
        type="text"
        status="danger"
        loading={eohHandle.loading}
        {...buttonProps}
      >
        {abeyanceStatus ? '取消异常搁置' : '异常搁置'}
      </Button>
    </>
  )
}
