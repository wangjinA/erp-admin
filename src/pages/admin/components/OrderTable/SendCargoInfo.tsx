import { Form, Link, Tag } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import classNames from 'classnames'
import React, { useState } from 'react'

import styles from './index.module.less'

import { labelClass, valueClass } from '.'

import { expressAPI } from '@/api/client/express'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import ReturnParcel from '@/components/ReturnParcel'
import { useDictOptions } from '@/components/Selectors/DictSelector'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { OrderResponseItem } from '@/types/order'
import { showMessageStatus, showModal } from '@/utils'

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

  return (
    <Tag bordered size="small" color={TagColors[Number(item.trackingStatus)]}>
      {
        trackingStatus?.find(oitem => oitem.value === item.trackingStatus)
          ?.label
      }
    </Tag>
  )
}

function ExpressStatusActions(props: {
  item: OrderResponseItem['orderProductVOList'][0]
  sendWarehouse: string
}) {
  const { item, sendWarehouse } = props

  const [isReturnGoods, setIsReturnGoods] = useState<boolean>(false)
  const [formRef] = Form.useForm()
  // 设置快递状态
  const updateStatusHandle = useRequest(
    async (trackingStatus) => {
      const res = await expressAPI.updateExpressStatus({
        orderProductId: item.id,
        trackingStatus,
      })
      await showMessageStatus(res.data)
      bus.emit(EmitTypes.refreshOrderPage)
    },
    {
      manual: true,
    },
  )
  // 退件
  const returnHandle = useRequest(
    async () => {
      const formData = await formRef.validate()
      const res = await expressAPI.returnOperation(formData)
      await showMessageStatus(res.data)
      setIsReturnGoods(false)
    },
    {
      manual: true,
    },
  )

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
                confirmLoading: updateStatusHandle.loading,
                content: `所有跟快递单号"${item.trackingNo}"有关联的订单都会拒收，确定要继续吗？`,
              })
              updateStatusHandle.run('2')
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
              updateStatusHandle.run('0')
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
              updateStatusHandle.run('1')
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
  return <div>-</div>
}

const SkuList: React.FC<SendCargoInfoProps> = (props) => {
  const { data } = props
  return (
    <div className={classNames(styles['goods-info'], 'pr-2')}>
      {data.orderProductVOList?.map((item, i) => (
        <div
          key={i}
          className={classNames('h-[125px] border-r', i > 0 ? 'border-t' : '')}
        >
          <div className="h-full px-2">
            <div>
              <span className={labelClass}>快递：</span>
              <span className={valueClass}>
                <Link
                  href={`https://www.baidu.com/s?wd=${item.trackingNo}`}
                  target="_blank"
                >
                  {item.trackingNo}
                </Link>
              </span>
            </div>
            <div>
              <span className={labelClass}>状态：</span>
              <span className={valueClass}><ExpressStatus {...item} /></span>
            </div>
            <div>
              <span className={labelClass}>操作：</span>
              <span className={classNames(valueClass, 'inline-flex')}>
                <ExpressStatusActions
                  item={item}
                  sendWarehouse={data.sendWarehouse}
                />
              </span>
            </div>
            {item.freightSpaceName
              ? (
                  <div>
                    <span className={labelClass}>仓位：</span>
                    <span className={valueClass}>{item.freightSpaceName || '-'}</span>
                  </div>
                )
              : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkuList
