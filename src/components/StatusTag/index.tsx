import { Tag, TagProps } from '@arco-design/web-react'
import React from 'react'

export interface TagInfoMap {
  value: any
  text: any
  color?: string
}

interface StatusTagProps extends TagProps {
  tagInfos: TagInfoMap[]
  value: any
}

const StatusTag: React.FC<StatusTagProps> = (props) => {
  const { tagInfos, value, ...rest } = props
  const target = tagInfos.find(item => item.value === value) || {
    color: '#000',
    text: value,
  }
  return (
    <Tag bordered={true} color={target.color} {...rest}>
      {target.text}
    </Tag>
  )
}

export default StatusTag
