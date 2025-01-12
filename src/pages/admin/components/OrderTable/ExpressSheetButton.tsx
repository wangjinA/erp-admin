import { Button, ButtonProps, Link, Modal, Spin } from '@arco-design/web-react'
import { IconFile } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'

import { orderAPI } from '@/api/admin/order'
import { orderAPI as clientOrderAPI } from '@/api/client/order'
import { isClient } from '@/routes'
import { OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'

export default ({ orderItem, buttonProps }: {
  orderItem: OrderResponseItem
  buttonProps?: ButtonProps
}) => {
  // const [visible, setVisible] = useState(false)
  const [src, setSrc] = useState<string>('')
  useEffect(() => {
    // setSrc(orderItem?.orderPackageList?.reduce<string>((pre, cur) => pre || cur.documentUrl, ''))
  }, [orderItem])
  const { run, loading } = useRequest(async () => {
    let url = orderItem?.orderPackageList?.reduce<string>((pre, cur) => pre || cur.documentUrl, '')
    if (!url) {
      if (isClient()) {
        await showMessage(() => clientOrderAPI.getSheet(orderItem.id), '查看面单')
      }
      else {
        const list = await showMessage(() => orderAPI.createShellOrder(orderItem.id), '查看面单').then((r) => {
          return r.data.data?.list
        })
        url = list?.[0]
      }
    }
    setSrc(url)
  }, {
    manual: true,
  })
  return (
    <>
      {buttonProps
        ? (
            <Button
              loading={loading}
              icon={<IconFile />}
              // onClick={async () => {
              //   const res = await orderAPI.getSheet(item.id)
              //   if (res.data.code !== SuccessCode) {
              //     return Message.error(res.data.msg)
              //   }
              //   setSheet(res.data.data)
              // }}
              onClick={() => {
                run()
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
                // setVisible(true)
                run()
              }}
            >
              查看面单
              {loading ? <Spin size={12}></Spin> : ''}
            </Link>
          )}
      <Modal
        title="面单信息"
        style={{ width: 800 }}
        visible={!!src}
        onCancel={() => {
          setSrc('')
        }}
        hideCancel={true}
        onConfirm={() => {
          setSrc('')
        }}
      >
        <iframe className="h-[700px] w-full border-none outline-none" src={src}></iframe>
      </Modal>
    </>
  )
}
