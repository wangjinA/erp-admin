import { Tooltip, Typography } from '@arco-design/web-react'
import { IconQuestionCircle } from '@arco-design/web-react/icon'
import classNames from 'classnames'
import React from 'react'

interface TitleProps {
  title: string
  tipsContent?: React.ReactNode
  className?: string
}

const Title: React.FC<TitleProps> = (props) => {
  const { title, tipsContent, className, children } = props
  return (
    <div className={classNames('flex items-center mb-4', className)}>
      <div className="w-1 h-4 bg-blue-500 rounded-r mr-2" />
      <Typography.Title heading={6} style={{ margin: 0 }} className="truncate">
        {title}
      </Typography.Title>
      {tipsContent
        ? (
            <Tooltip content={tipsContent}>
              <IconQuestionCircle className="ml-2 text-gray-500 cursor-pointer hover:text-black" />
            </Tooltip>
          )
        : null}
      {children}
    </div>
  )
}

export default Title
