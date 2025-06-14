import { Button, ButtonProps, Link, Modal, Space, Spin } from '@arco-design/web-react'
import { IconFile, IconPrinter } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'

import { orderAPI } from '@/api/admin/order'
import { orderAPI as clientOrderAPI } from '@/api/client/order'
import { isClient } from '@/routes'
import { OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'
import { requestEndInfo } from '@/api'
import printJS from 'print-js'
import { quickPrint } from '@/utils/printer'

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
        // url = list?.[0]
        url = requestEndInfo + `/api/logistics/order/get/tracking/number/${orderItem.id}`
      }
    }
    setSrc(url)
  }, {
    manual: true,
  })
  
  const { run: QuickRun, loading: QuickLoading } = useRequest(async () => {
    return quickPrint(orderItem)
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
          <Space>
            <Link
              className="text-sm"
              type="text"
              icon={<IconPrinter />}
              onClick={() => {
                // setVisible(true)
                // run()
                printJS({
                  printable: orderItem?.orderPackageList[0].documentUrl,
                  type: 'pdf',
                  showModal: true // 可选，显示加载中弹窗
                });

              }}
            >
              打印
              {loading ? <Spin size={12}></Spin> : ''}
            </Link>
            <Link
              className="text-sm"
              type="text"
              icon={<IconPrinter />}
              onClick={() => {
                QuickRun()
              }}
            >
              快捷打印
              {QuickLoading ? <Spin size={12}></Spin> : ''}
            </Link>
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
          </Space>
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
        {src ? <iframe className="h-[700px] w-full border-none outline-none" src={src}></iframe> : <Spin loading={true}></Spin>}
      </Modal>
    </>
  )
}
