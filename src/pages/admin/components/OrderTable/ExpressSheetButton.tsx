import { Button, ButtonProps, Link, Modal } from '@arco-design/web-react'
import { IconFile } from '@arco-design/web-react/icon'
import { useState } from 'react'

export default ({ value, buttonProps }: {
  value: any
  buttonProps?: ButtonProps
}) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      {buttonProps
        ? (
            <Button
              icon={<IconFile />}
              // onClick={async () => {
              //   const res = await orderAPI.getSheet(item.id)
              //   if (res.data.code !== SuccessCode) {
              //     return Message.error(res.data.msg)
              //   }
              //   setSheet(res.data.data)
              // }}
              onClick={() => {
                setVisible(true)
              }}
              {...buttonProps}
            >
              查看面单
            </Button>
          )
        : (
            <Link
              className="text-sm"
              type="text"
              icon={<IconFile />}
              onClick={() => {
                setVisible(true)
              }}
            >
              查看面单
            </Link>
          )}
      <Modal
        title="面单信息"
        style={{ width: 800 }}
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        hideCancel={true}
        onConfirm={() => {
          setVisible(false)
        }}
      >
        开发中...
        <iframe className="h-[700px] w-full border-none outline-none" src=""></iframe>
      </Modal>
    </>
  )
}
