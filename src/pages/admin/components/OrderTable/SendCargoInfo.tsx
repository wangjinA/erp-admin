import { Tag } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import classNames from 'classnames'
import React, { useState } from 'react'

import styles from './index.module.less'

import { expressAPI } from '@/api/client/express'
import CopyText from '@/components/CopyText'
import LabelValue from '@/components/LabelValue'
import MyBadge from '@/components/MyBadge'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import ReturnParcel from '@/components/ReturnParcel'
import { useDictOptions } from '@/components/Selectors/DictSelector'
import TrackingNo from '@/components/TrackingNo'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { isClient } from '@/routes'
import { OrderResponseItem } from '@/types/order'
import { showMessage, showModal } from '@/utils'

interface SendCargoInfoProps {
  data: OrderResponseItem
}

export const TagColors = [
  '',
  'green',
  'orangered',
  'orange',
  'gold',
  'lime',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
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
  orderStatus: string;
  sendWarehouse: string;
  orderId: string;
}> = ({ item, orderStatus, sendWarehouse, orderId }) => {
  return <div className="h-full p-2">
    <LabelValue
      label="快递"
      value={item.trackingNo
        ? (
          <CopyText
            value={item.trackingNo}
            gap={1}
          >
            <TrackingNo
              value={item.trackingNo}
            >
            </TrackingNo>
          </CopyText>
        )
        : <Tag>未填</Tag>}
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
}

const SendCargoInfo: React.FC<SendCargoInfoProps> = (props) => {
  const { data } = props
  return (
    <div className={classNames(styles['goods-info'], 'pr-2')}>
      {data.orderProductVOList?.map((item, i) => (
        <div
          key={i}
          className={classNames('h-[105px] border-r', i > 0 ? 'border-t' : '')}
        >
          {/* <div className="h-full p-2">
            <LabelValue
              label="快递"
              value={item.trackingNo
                ? (
                  <CopyText
                    value={item.trackingNo}
                    gap={1}
                  >
                    <TrackingNo
                      value={item.trackingNo}
                    >
                    </TrackingNo>
                  </CopyText>
                )
                : <Tag>未填</Tag>}
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
                      ['0', '1', '2'].includes(data.orderStatus) && isClient()
                        ? (
                          <LabelValue
                            valueClassName="inline-flex"
                            label="操作"
                            value={(
                              <ExpressStatusActions
                                item={item}
                                sendWarehouse={data.sendWarehouse}
                                orderId={data.id}
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
          </div> */}
          <SendCargoItemInfo
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

export default SendCargoInfo
