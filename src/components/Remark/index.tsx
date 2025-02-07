import { Input, InputNumber, Modal } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'

import { useState } from 'react'

import styles from './index.module.less'

import { showMessage } from '@/utils'

export enum RemarkType {
  Text = 'text',
  Number = 'number',
}

interface RemarkProps {
  // { value, onChange }
  value: any
  onChange: (value: any) => Promise<any>
  title?: string
  type?: RemarkType
}

export default (props: RemarkProps) => {
  const { value, title = '备注', type = RemarkType.Text, onChange } = props
  const [visible, setVisible] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const placeholder = `请输入${title}`
  return (
    <div className={styles['remark-com']}>
      {value ?? '-'}
      <IconEdit className="remark-com-icon" onClick={() => setVisible(true)}></IconEdit>
      <Modal
        title={`编辑${title}`}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          if (inputValue === value) {
            return setVisible(false)
          }
          showMessage(() => onChange(inputValue), title).then(() => {
            setVisible(false)
          })
        }}
      >
        {type === RemarkType.Text
          ? <Input.TextArea value={inputValue} autoFocus onChange={setInputValue} placeholder={placeholder} rows={5}></Input.TextArea>
          : <InputNumber value={inputValue} autoFocus onChange={setInputValue} placeholder={placeholder}></InputNumber>}
      </Modal>
    </div>
  )
}
