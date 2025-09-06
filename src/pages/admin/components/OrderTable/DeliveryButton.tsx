import { Button } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'

import { forwardRef } from 'react'

export const DeliveryButton = forwardRef((props: ButtonProps, ref) => {
  return (
    <Button
      ref={ref}
      type="text"
      status="warning"
      disabled={props.disabled}
      {...props}
    >
      包裹出库
    </Button>
  )
})
