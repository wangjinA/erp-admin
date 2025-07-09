import { Input, InputNumber, Modal } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'

import { useEffect, useState } from 'react'

import styles from './index.module.less'

import { showMessage } from '@/utils'
import { isNilPlus, isString } from '@/utils/is'
import classNames from 'classnames'

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
  notRefres?: boolean
}

export default function Remark(props: RemarkProps) {
  const { value, title = '备注', type = RemarkType.Text, notRefres, onChange } = props
  const [visible, setVisible] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [newValue, setNewValue] = useState()
  const placeholder = `请输入${title}`
  const allTitle = `编辑${title}`

  useEffect(() => {
    if (visible) {
      setInputValue((isString(newValue) ? (newValue || value) : (newValue ?? value)))
    }
  }, [visible])

  return (
    <div className={styles['remark-com']}>
      {newValue || (isString(value) ? (value || '-') : (value ?? '-'))}
      <IconEdit className={
        classNames({
          'remark-com-icon': true,
          'remark-com-icon-hover': !isNilPlus(value),
        })
      } onClick={() => setVisible(true)}></IconEdit>
      <Modal
        title={allTitle}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          if (inputValue === value) {
            return setVisible(false)
          }
          showMessage(() => onChange(inputValue), allTitle).then(() => {
            setVisible(false)
            if (notRefres) {
              setNewValue(inputValue)
            }
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
