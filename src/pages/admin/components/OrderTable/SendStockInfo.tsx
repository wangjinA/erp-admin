import classNames from 'classnames'
import React from 'react'
import styles from './index.module.less'
import { OrderResponseItem } from '@/types/order'
import LabelValue from '@/components/LabelValue'
import { Tag, Typography } from '@arco-design/web-react'

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

export const SendStockInfo: React.FC<{
  item: OrderResponseItem['orderProductVOList'][0]
  orderStatus: string;
  sendWarehouse: string;
  orderId: string;
}> = ({ item, orderStatus, sendWarehouse, orderId }) => {
  return <div className="h-full p-2">
    <LabelValue label="快递" value={<Tag color="magenta">库存发货 x1</Tag>}></LabelValue>
    <LabelValue label="仓位" value={item.freightSpaceName}></LabelValue>
    <LabelValue label="商品编号" value={<Typography.Text copyable={{ text: "xxx" }}><Tag color="blue">xx</Tag></Typography.Text>}></LabelValue>
  </div>
}

const SendCargoInfo: React.FC<SendCargoInfoProps> = (props) => {
  const { data } = props
  return (
    <div className={classNames(styles['goods-info'], 'pr-2 h-full')}>
      {data.orderProductVOList?.map((item, i) => (
        <div
          key={i}
          className={classNames('h-[105px] border-r', i > 0 ? 'border-t' : '')}
        >
          <SendStockInfo
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
