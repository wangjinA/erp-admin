import { Tag, Typography } from '@arco-design/web-react'
import { IconCheckCircle, IconCheckCircleFill, IconCloseCircle, IconCloseCircleFill, IconEmpty } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import classNames from 'classnames'
import React, { useState } from 'react'

import styles from './index.module.less'

import { orderAPI } from '@/api/admin/order'
import { expressAPI } from '@/api/client/express'
import LabelValue from '@/components/LabelValue'
import MyBadge from '@/components/MyBadge'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import ReturnParcel from '@/components/ReturnParcel'
import { useDictOptions } from '@/components/Selectors/DictSelector'
import TrackingNo from '@/components/TrackingNo'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { isClient } from '@/routes'
import { OrderResponseItem, PickingStatus } from '@/types/order'
import { showMessage, showModal } from '@/utils'

interface SendCargoInfoProps {
  data: OrderResponseItem
}

export const SendStockItemInfo: React.FC<{
  item: OrderResponseItem['orderProductVOList'][0]
  orderStatus: string
  sendWarehouse: string
  orderId: string
}> = ({ item }) => {
  return (
    <div className="h-full p-2">
      <LabelValue
        label="快递"
        value={(
          <Tag color="magenta">
            库存发货 x
            {item.stockUse}
          </Tag>
        )}
      >
      </LabelValue>
      {/* <LabelValue label="仓位" value={item.freightSpaceName}></LabelValue> */}
      <LabelValue label="库存SKU" value={<Typography.Text copyable={{ text: item.logisticsProduct?.sku }}><Tag color="blue">{item.logisticsProduct?.sku}</Tag></Typography.Text>}></LabelValue>
    </div>
  )
}

interface SendCargoInfoProps {
  data: OrderResponseItem
}

export const TagColors = [
  '',
  'green',
  'orangered',
  'gold',
  'red',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
  'lime',
  'orange',
]
function ExpressStatus(item: OrderResponseItem['orderProductVOList'][0]) {
  const { data: trackingStatus } = useDictOptions({
    dictCode: 'tracking_status',
  })
  const statusText = trackingStatus?.find(oitem => oitem.value === item.trackingStatus)
    ?.label
  const color = TagColors[Number(item.trackingStatus)]
  return (
    <>
      <MyBadge
        status="default"
        style={{
          transform: ' translateY(-2px)',
        }}
        color={color}
        text={statusText}
      >
      </MyBadge>
    </>
  )
}

function ExpressStatusActions(props: {
  item: OrderResponseItem['orderProductVOList'][0]
  sendWarehouse: string
  orderId: string
}) {
  const { item, sendWarehouse, orderId } = props

  const [isReturnGoods, setIsReturnGoods] = useState<boolean>(false)
  // const [formRef] = Form.useForm()
  // 设置快递状态
  // const updateStatusHandle = useRequest(
  //   async (trackingStatus) => {
  //     await showMessage(() => expressAPI.updateExpressStatus({
  //       orderProductId: item.id,
  //       trackingStatus,
  //     }))
  //     bus.emit(EmitTypes.refreshOrderPage)
  //   },
  //   {
  //     manual: true,
  //   },
  // )
  // 拒收
  const rejectHandle = useRequest(
    async () => {
      await showMessage(() => expressAPI.addReject({
        orderId,
        trackingNo: item.trackingNo,
      }), '快递拒收申请')
      bus.emit(EmitTypes.refreshOrderPage)
    },
    {
      manual: true,
    },
  )

  // 取消拒收
  const cancelRejectHandle = useRequest(
    async () => {
      await showMessage(() => expressAPI.orderCancelReject({
        orderId,
        trackingNo: item.trackingNo,
      }), '取消拒收')
      bus.emit(EmitTypes.refreshOrderPage)
    },
    {
      manual: true,
    },
  )
  if (item.trackingNo) {
    switch (item.trackingStatus) {
      case '0':
        return (
          <div>
            <Tag
              className="cursor-pointer"
              bordered
              size="small"
              color="orange"
              checked={true}
              onClick={async () => {
                await showModal({
                  confirmLoading: rejectHandle.loading,
                  content: `所有跟快递单号"${item.trackingNo}"有关联的订单都会拒收，确定要继续吗？`,
                })
                rejectHandle.run()
              }}
            >
              拒收
            </Tag>
          </div>
        )
      case '1':
        return (
          <div>
            <Tag
              className="cursor-pointer"
              bordered
              size="small"
              color="orange"
              checked={true}
              onClick={async () => {
                setIsReturnGoods(true)
              }}
            >
              退件
            </Tag>
            <ReturnParcel
              visible={isReturnGoods}
              setVisible={setIsReturnGoods}
              sendWarehouse={sendWarehouse}
              trackingNo={item.trackingNo}
              onSuccess={() => {
                bus.emit(EmitTypes.refreshOrderPage)
              }}
            >
            </ReturnParcel>
          </div>
        )
      case '2':
        return (
          <div>
            <PopconfirmDelete
              title="确定取消拒收吗？"
              onOk={async () => {
                cancelRejectHandle.run()
              }}
            >
              <Tag
                className="cursor-pointer"
                bordered
                size="small"
                color="orange"
                checked={true}
              >
                取消拒收
              </Tag>
            </PopconfirmDelete>
          </div>
        )
      case '4':
        return (
          <div>
            <PopconfirmDelete
              title="确定取消退件吗？"
              onOk={async () => {
                await showMessage(() => expressAPI.orderCancelReturn({
                  orderId,
                  trackingNo: item.trackingNo,
                }), '退件取消')
                bus.emit(EmitTypes.refreshOrderPage)
              }}
            >
              <Tag
                className="cursor-pointer"
                bordered
                size="small"
                color="orange"
                checked={true}
              >
                取消退件
              </Tag>
            </PopconfirmDelete>

          </div>
        )
    }
  }
  return <div>-</div>
}

export const SendCargoItemInfo: React.FC<{
  item: OrderResponseItem['orderProductVOList'][0]
  orderStatus: string
  sendWarehouse: string
  orderId: string
}> = ({ item, orderStatus, sendWarehouse, orderId }) => {
  let trackingNoContent = null

  const pickingStatusHandle = useRequest(async (params: {
    productId: number
    pickingStatus: PickingStatus
  }) => {
    return showMessage(() => orderAPI.updatePickingStatus(params)).then(() => {
      bus.emit(EmitTypes.refreshOrderPage)
    })
  }, {
    manual: true,
  })

  if (item.stockOutStatus) {
    trackingNoContent = <Tag color="orangered" icon={<IconEmpty />}>缺货打包</Tag>
  }
  else if (item.trackingNo) {
    trackingNoContent = (
      <Typography.Text
        copyable={{
          text: item.trackingNo,
        }}
      >
        <TrackingNo
          value={item.trackingNo}
        >
        </TrackingNo>
      </Typography.Text>
    )
  }
  else {
    trackingNoContent = <Tag>未填</Tag>
  }

  const defaultIconStyle = {
    fontSize: 22,
    cursor: 'pointer',
    color: '#86909c',
  }

  return (
    <div className="h-full p-2 flex justify-between">
      <div>
        <LabelValue
          label="快递"
          value={trackingNoContent}
        >
        </LabelValue>
        {
          item.trackingNo
            ? (
                <>
                  <LabelValue
                    label="状态"
                    value={<ExpressStatus {...item} />}
                  >
                  </LabelValue>
                  {
                    ['0', '1', '2'].includes(orderStatus) && isClient()
                      ? (
                          <LabelValue
                            valueClassName="inline-flex"
                            label="操作"
                            value={(
                              <ExpressStatusActions
                                orderId={orderId}
                                item={item}
                                sendWarehouse={sendWarehouse}
                              />
                            )}
                          />
                        )
                      : null
                  }
                </>
              )
            : null
        }
        {item.freightSpaceName
          ? (
              <LabelValue label="仓位" value={item.freightSpaceName}></LabelValue>
            )
          : null}
      </div>
      <div className="flex flex-col pr-10">
        {/* <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #86909c', paddingLeft: 1 }} className="border-box flex justify-center items-center mb-2">
          <IconMessage style={{ ...defaultIconStyle, fontSize: 14 }} />
        </div> */}
        <div
          className="mb-1"
          onClick={() => {
            pickingStatusHandle.run({
              productId: item.id,
              pickingStatus: item.pickingStatus === PickingStatus.PICKED ? PickingStatus.DEFAULT : PickingStatus.PICKED,
            })
          }}
        >
          {item.pickingStatus === PickingStatus.PICKED ? <IconCheckCircleFill style={{ ...defaultIconStyle, color: 'green' }} /> : <IconCheckCircle style={defaultIconStyle} />}
        </div>

        <div onClick={() => {
          pickingStatusHandle.run({
            productId: item.id,
            pickingStatus: item.pickingStatus === PickingStatus.UNPICKED ? PickingStatus.DEFAULT : PickingStatus.UNPICKED,
          })
        }}
        >
          {item.pickingStatus === PickingStatus.UNPICKED ? <IconCloseCircleFill style={{ ...defaultIconStyle, color: 'red' }} /> : <IconCloseCircle style={defaultIconStyle} /> }
        </div>
      </div>
    </div>
  )
}

export const SendStockCargoItemInfo: React.FC<{
  item: OrderResponseItem['orderProductVOList'][0]
  orderStatus: string
  sendWarehouse: string
  orderId: string
}> = (props) => {
  const { item, orderStatus, sendWarehouse, orderId } = props
  return item.deliveryMethod === '1'
    ? (
        <SendStockItemInfo
          item={item}
          orderStatus={orderStatus}
          sendWarehouse={sendWarehouse}
          orderId={orderId}
        />
      )
    : (
        <SendCargoItemInfo
          item={item}
          orderStatus={orderStatus}
          sendWarehouse={sendWarehouse}
          orderId={orderId}
        />
      )
}

const SendStockCargoInfos: React.FC<SendCargoInfoProps> = (props) => {
  const { data } = props
  return (
    <div className={classNames(styles['goods-info'], 'pr-2 h-full')}>
      {data.orderProductVOList?.map((item, i) => (
        <div
          key={item.id}
          className={classNames('h-[105px] border-r', i > 0 ? 'border-t' : '')}
        >
          <SendStockCargoItemInfo
            item={item}
            orderStatus={data.orderStatus}
            sendWarehouse={data.sendWarehouse}
            orderId={data.id}
          />
        </div>
      ))}
    </div>
  )
}

export default SendStockCargoInfos
