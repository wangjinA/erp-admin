import { Message } from '@arco-design/web-react'
import { IconCopy } from '@arco-design/web-react/icon'

import clipboard from '@/utils/clipboard'

function CopyText({ children, value, gap = 4 }) {
  return (
    <span>
      {children}
      {/* <span
        className="cursor-pointer"
      > */}
      <IconCopy
        style={{ cursor: 'pointer', color: 'rgb(22, 93, 255)', marginLeft: gap }}
        onClick={() => {
          clipboard(value)
          Message.success('复制成功')
        }}
      >
      </IconCopy>
      {/* </span> */}
    </span>
  )
}
export default CopyText
