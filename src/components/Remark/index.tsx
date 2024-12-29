import { Input, Modal } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'

import { useState } from 'react'

import styles from './index.module.less'

export default ({ value, onChange }) => {
  const [visible, setVisible] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  return (
    <div className={styles['remark-com']}>
      {value || '-'}
      <IconEdit className="remark-com-icon" onClick={() => setVisible(true)}></IconEdit>
      <Modal
        title="编辑备注"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          if (inputValue === value) {
            return setVisible(false)
          }
          onChange(inputValue).then(() => {
            setVisible(false)
          })
        }}
      >
        <Input.TextArea value={inputValue} autoFocus onChange={setInputValue} placeholder="请输入备注" rows={5}></Input.TextArea>
      </Modal>
    </div>
  )
}
