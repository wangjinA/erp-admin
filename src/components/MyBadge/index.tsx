import { Badge } from '@arco-design/web-react'
import { BadgeProps } from '@arco-design/web-react/lib'

interface MyBadgeProps extends BadgeProps {
}

export default (props: MyBadgeProps) => {
  return (
    <Badge
      {...props}
      text={(
        <span style={{ color: props.color, fontWeight: 700 }}>
          {props.text}
        </span>
      ) as any}

    >
    </Badge>
  )
}
