import { Button, Message, Modal, Popconfirm, Space, Typography } from '@arco-design/web-react'
import { IconExport } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { saveAs } from 'file-saver'

import { chunk, uniq } from 'lodash'

import { OrderPageDict, PageQuery } from '..'

import { requestPoolLimit } from '@/api'
import { entrepotAPI, scanAPI } from '@/api/admin/entrepot'
import { orderAPI as adminOrderApi } from '@/api/admin/order'

import { BatchApplyShippingCarrierList, OrderStatus, SystemName } from '@/constants/order'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import DownloadSheetButton from '@/pages/admin/components/OrderTable/DownloadSheetButton'
import RefreshButton from '@/pages/admin/components/OrderTable/RefreshButton'
import { showMessage, showModal } from '@/utils'

interface PageActionsProps {
  selectIds: string[]
  data: any
  activeTab: string
  getPageQuery: (p: PageQuery) => any
  dictCode: OrderPageDict
}

function PageActions(props: PageActionsProps) {
  const { data, selectIds, activeTab, dictCode, getPageQuery } = props

  const exportOrderListHandle = useRequest(async () => {
    const body = getPageQuery({
      isBindSelect: true,
    })
    const res = await adminOrderApi.exportOrderList(body)
    // 提取文件名
    const disposition = res.headers['content-disposition']
    let fileName = '订单导出.xlsx'
    if (disposition) {
      const match = disposition.match(/filename="?([^"]+)"?/)
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1])
      }
    }
    // 下载
    saveAs(res.data, fileName)
    Modal.success({
      content: '订单导出成功，请注意查收！',
      title: '温馨提示',
    })
  }, {
    manual: true,
  })

  const outListHandle = useRequest(async () => {
    await showMessage(() => {
      const requestList = chunk(selectIds, 20).map(list => () => scanAPI.outList({
        orderIdList: list,
      }))
      return requestPoolLimit(requestList)
    }, '出库')
    bus.emit(EmitTypes.refreshOrderPage)
  }, {
    manual: true,
  })

  const shipmentBatchHandle = useRequest(async (orderIds: string[]) => {
    const selectDatas = data.list.filter(item => selectIds.includes(item.id))
    const entrepotIds = uniq<string>(selectDatas.map(item => item.sendWarehouse))
    // 仓库和发货人的映射
    const entrepotSenderMap = (await Promise.all(entrepotIds.map(id => entrepotAPI.getSenderAll({
      entrepotId: id,
    }).then(r => ({
      [id]: r,
    }))))).reduce((pre, cur) => ({
      ...pre,
      ...cur,
    }), {})
    const batchList = orderIds.filter(id => !data.list.find(o => o.id === id)?.shippingTime).map(orderId => ({
      orderId,
      senderRealName: entrepotSenderMap[data.list.find(o => o.id === orderId)?.sendWarehouse]?.default || SystemName,
    }))
    if (!batchList.length) {
      return Message.info('已全部出货成功')
    }
    await showMessage(() => {
      const requestList = chunk(batchList, 20).map(list => () => adminOrderApi.shipmentBatch(list))
      return requestPoolLimit(requestList)
    }, '批量出货')
      .then((res) => {
        const errorList = (res.data?.data?.list || []).map(o => ({
          msg: o.msg,
          orderId: data.list.find(item => item.id === o.orderId)?.shrimpOrderNo || '获取失败',
        }))
        if (errorList.length) {
          Modal.confirm({
            noticeType: 'warning',
            title: errorList.length !== batchList.length ? '部分订单出货失败' : '批量出货失败',
            content: errorList.map(item => `${item.msg}，订单编号：${item.orderId}`).join('\n'),
          })
        }
      })
    bus.emit(EmitTypes.refreshOrderPage)
  }, {
    manual: true,
  })

  const destroyListHandle = useRequest(async () => {
    return showMessage(() => adminOrderApi.overseasWarehouseReturnDestroyBatch({
      ids: selectIds,
    }), '销毁').then(() => {
      bus.emit(EmitTypes.refreshOrderPage)
    })
  }, {
    manual: true,
  })

  const isNotOutOrder = dictCode !== OrderPageDict.OUT_ORDER_STATUS

  return (
    <Space size={8}>
      <Popconfirm
        title="确认导出订单？"
        onOk={() => exportOrderListHandle.run()}
        okButtonProps={{
          loading: exportOrderListHandle.loading,
        }}
      >
        <Button
          type="outline"
          icon={<IconExport />}
          loading={exportOrderListHandle.loading}
        >
          导出订单
          {' '}
          {selectIds.length ? `(${selectIds.length}个)` : ''}
        </Button>
      </Popconfirm>
      {isNotOutOrder
        ? (
            <Button
              type="outline"
              loading={outListHandle.loading}
              disabled={activeTab >= OrderStatus['已出库']}
              onClick={async () => {
                if (!selectIds.length) {
                  return Message.error('请选择订单')
                }
                await showModal({
                  content: `确定出库 ${selectIds.length} 个订单？`,
                  okButtonProps: {
                    status: 'success',
                  },
                })

                outListHandle.run()
              }}
            >
              批量出库
            </Button>
          )
        : null}
      <RefreshButton
        ids={selectIds}
        buttonProps={{
          type: 'outline',
          status: 'default',
        }}
      >
        批量更新订单
      </RefreshButton>
      {isNotOutOrder ? <DownloadSheetButton getPageQuery={getPageQuery} selectIds={selectIds}></DownloadSheetButton> : null}
      {isNotOutOrder ? (
        <Button
          type="outline"
          loading={shipmentBatchHandle.loading}
          disabled={activeTab !== OrderStatus['已出库']}
          onClick={async () => {
            if (!selectIds.length) {
              return Message.error('请选择订单')
            }
            const ids = data.list.filter(item =>
              BatchApplyShippingCarrierList.some(o => (item.shippingCarrier || item.orderPackageList?.[0]?.shippingCarrier).includes(o)),
            ).map(o => o.id)

            const tips = `只有${BatchApplyShippingCarrierList.join('、')}的订单才能批量出货`

            if (!ids.length) {
              Message.error(tips)
              return
            }
            const successIds = selectIds.filter(id => ids.includes(id))

            // 选中的id和匹配的承运商id 都要存在
            if (successIds.length) {
              if (selectIds.length !== successIds.length) {
                // Modal.confirm({
                //   title: '温馨提示',
                //   content: `${tips}，其他承运商的订单请手动单个出货！`,
                //   okText: '确认出货',
                //   onOk() {
                //     shipmentBatchHandle.run(successIds)
                //   }
                // })
                await showModal({
                  content: `${tips}，其他承运商的订单请手动单个出货！`,
                  okButtonProps: {
                    status: 'success',
                  },
                }).then(() => {
                  shipmentBatchHandle.run(successIds)
                })
              }
              else {
                shipmentBatchHandle.run(successIds)
              }
            }
            else {
              Message.error('不符合出货条件，请检查订单状态和承运商信息！')
            }
          }}
        >
          批量出货
        </Button>
      ) : null}
      {
        isNotOutOrder
          ? null
          : (
              <Button
                type="outline"
                status="danger"
                loading={destroyListHandle.loading}
                onClick={() => {
                  if (!selectIds.length) {
                    return Message.error('请选择订单')
                  }
                  const notTakeDownItems = data.list.filter(item => selectIds.includes(item.id) && dayjs().valueOf() < dayjs(item.overseasWarehouseDelistingTime).valueOf())
                  showModal({
                    content: notTakeDownItems.length > 0
                      ? (
                          <div>
                            <div>
                              以下订单退件未过期，请确认是否销毁选中的
                              {selectIds.length}
                              个订单？
                            </div>
                            <div>
                              {notTakeDownItems.map(item => (
                                <div className="mb-2">
                                  <div>
                                    <span>订单编号：</span>
                                    <Typography.Text copyable>
                                      {item.shrimpOrderNo}
                                    </Typography.Text>
                                  </div>
                                  <div>
                                    <span>下架时间：</span>
                                    <span>{item.overseasWarehouseDelistingTime}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      : `确认销毁选中的${selectIds.length}个订单？`,
                  }).then(() => {
                    destroyListHandle.run()
                  })
                }}
              >
                批量销毁
              </Button>
            )
      }
      {/* <Button
        type="outline"
        status="warning"
        loading={cancelListHandle.loading}
        onClick={async () => {
          if (!selectIds.length) {
            return Message.error('请选择订单')
          }
          await showModal({
            content: `确认取消选中的${selectIds.length}个订单？`,
          })
          cancelListHandle.run()
        }}
      >
        批量取消订单
      </Button> */}
    </Space>
  )
}

export default PageActions
