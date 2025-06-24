import { Button, Message, Modal, Popconfirm, Space } from "@arco-design/web-react"
import { useRequest } from "ahooks"
import { OrderPageDict, PageQuery } from ".."
import { orderAPI as adminOrderApi } from '@/api/admin/order'
import { saveAs } from 'file-saver'
import { entrepotAPI, scanAPI } from '@/api/admin/entrepot'
import { uniq } from "lodash"
import { showMessage, showModal } from "@/utils"
import { bus, EmitTypes } from "@/hooks/useEventBus"
import { IconExport } from "@arco-design/web-react/icon"
import { BatchApplyShippingCarrierList, OrderStatus, SystemName } from "@/constants/order"
import RefreshButton from "@/pages/admin/components/OrderTable/RefreshButton"
import DownloadSheetButton from "@/pages/admin/components/OrderTable/DownloadSheetButton"

interface PageActionsProps {
  selectIds: string[];
  data: any;
  activeTab: string;
  getPageQuery: (p: PageQuery) => any
  dictCode: OrderPageDict
}

const PageActions = (props: PageActionsProps) => {
  const { data, selectIds, activeTab, dictCode, getPageQuery } = props;

  const exportOrderListHandle = useRequest(async () => {
    const body = getPageQuery({
      isBindSelect: true
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
      title: '温馨提示'
    })
  }, {
    manual: true,
  })

  const outListHandle = useRequest(async () => {
    await showMessage(() => scanAPI.outList({
      orderIdList: selectIds,
    }), '出库')
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
      [id]: r
    }))))).reduce((pre, cur) => ({
      ...pre,
      ...cur,
    }), {})
    const batchList = orderIds.map(orderId => ({
      orderId,
      senderRealName: entrepotSenderMap[data.list.find(o => o.id === orderId)?.sendWarehouse]?.default || SystemName
    }))
    await showMessage(() => adminOrderApi.shipmentBatch(batchList), '批量出货')
      .then(res => {
        const errorList = (res.data?.data?.list || []).map(o => ({
          msg: o.msg,
          orderId: data.list.find(item => item.id === o.orderId)?.shrimpOrderNo || '获取失败'
        }));
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

  const isNotOutOrder = dictCode !== OrderPageDict.OUT_ORDER_STATUS

  return <Space size={8}>
    <Popconfirm title="确认导出订单？" onOk={() => exportOrderListHandle.run()} okButtonProps={{
      loading: exportOrderListHandle.loading,
    }}>
      <Button
        type="outline"
        icon={<IconExport />}
        loading={exportOrderListHandle.loading}
      >
        导出订单 {selectIds.length ? `(${selectIds.length}个)` : ''}
      </Button>
    </Popconfirm>
    {isNotOutOrder ? <Button
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
    </Button> : null}
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
    {isNotOutOrder ? <Button
      type="outline"
      loading={shipmentBatchHandle.loading}
      disabled={activeTab !== OrderStatus['已出库']}
      onClick={async () => {
        if (!selectIds.length) {
          return Message.error('请选择订单')
        }
        const ids = data.list.filter(item =>
          BatchApplyShippingCarrierList.includes(item.shippingCarrier || item.orderPackageList?.[0]?.shippingCarrier),
        ).map(o => o.id)

        const tips = `只有${BatchApplyShippingCarrierList.join('、')}的订单才能批量出货`;

        if (!ids.length) {
          Message.error(tips)
          return;
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
          } else {
            shipmentBatchHandle.run(successIds)
          }
        } else {
          Message.error('不符合出货条件，请检查订单状态和承运商信息！');
        }
      }}
    >
      批量出货
    </Button> : null}
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
}

export default PageActions