import { Button, ButtonProps, Link, Message, Modal, Space, Spin } from '@arco-design/web-react'
import { IconFile, IconPrinter } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { useState } from 'react'

import { orderAPI } from '@/api/admin/order'
import { orderAPI as clientOrderAPI } from '@/api/client/order'
import { isClient } from '@/routes'
import { OrderResponseItem } from '@/types/order'
import { showMessage } from '@/utils'
import { requestEndInfo } from '@/api'
import printJS from 'print-js'
// import { quickPrint } from '@/utils/printer'
import { createPdfBlobUrl } from '@/utils/file'

export default ({ orderItem, buttonProps }: {
  orderItem: OrderResponseItem
  buttonProps?: ButtonProps
}) => {
  const [src, setSrc] = useState<string>('')
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
        url = list?.[0] || requestEndInfo.baseUrl + `/api/logistics/order/get/tracking/number/${orderItem.id}`
      }
    }
    url = await createPdfBlobUrl(url);
    if (!url) {
      Message.error('暂未获取到面单，请刷新后重试！')
      return;
    }
    setSrc(url)
  }, {
    manual: true,
  })

  // const { run: QuickRun, loading: QuickLoading } = useRequest(async () => {
  //   return quickPrint(orderItem)
  // }, {
  //   manual: true,
  // })
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
                try {
                  printJS({
                    printable: orderItem?.orderPackageList[0].documentUrl,
                    type: 'pdf',
                    showModal: true // 可选，显示加载中弹窗
                  });
                } catch (error) {
                  const message: string = error.message || '';
                  if (message.includes('Missing printable information')) {
                    Message.error(error.message)
                  } else {
                    Message.error(error.message || '打印出错！请检查相关信息')
                  }
                }

              }}
            >
              打印
              {loading ? <Spin size={12}></Spin> : ''}
            </Link>
            {/* <Link
              className="text-sm"
              type="text"
              icon={<IconPrinter />}
              onClick={() => {
                QuickRun()
              }}
            >
              快捷打印
              {QuickLoading ? <Spin size={12}></Spin> : ''}
            </Link> */}
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
        className="modal-content-not-padding"
        title="面单信息"
        style={{ width: 800 }}
        visible={!!src}
        footer={null}
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
