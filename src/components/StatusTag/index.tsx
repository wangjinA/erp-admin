import { Tag } from '@arco-design/web-react'
import React from 'react'

export interface TagInfoMap {
  value: any
  text: string
  color?: string
}

interface StatusTagProps {
  tagInfos: TagInfoMap[]
  value: string
}

const StatusTag: React.FC<StatusTagProps> = (props) => {
  const { tagInfos, value } = props
  const target = tagInfos.find(item => item.value === value) || {
    color: '#000',
    text: value,
  }
  return (
    <Tag bordered={true} color={target.color}>
      {target.text}
    </Tag>
  )
}

export default StatusTag
