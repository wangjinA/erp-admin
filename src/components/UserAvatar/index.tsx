import { Image, ImageProps } from '@arco-design/web-react'
import { IconUser } from '@arco-design/web-react/icon'
import classNames from 'classnames'

interface UserAvatarProps extends ImageProps {

}
function UserAvatar(props: UserAvatarProps) {
  return (
    <Image
      error={(
        <div className="text-white text-lg h-full flex items-center justify-center">
          <IconUser />
        </div>
      )}
      {...props}
      className={classNames('size-9 bg-emerald-400 rounded-full flex items-center justify-center arco-image-cover', props.className)}
    >
    </Image>
  )
}

export default UserAvatar
