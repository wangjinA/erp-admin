import classNames from 'classnames'

import { labelClass, valueClass } from '.'

import { useDictOptions } from '@/components/Selectors/DictSelector'
import { OrderResponseItem } from '@/types/order'
import { getRemainingTime } from '@/utils/date'

export default ({ data }: { data: OrderResponseItem }) => {
  const { data: shopeeStatus } = useDictOptions({
    dictCode: 'shopee_status',
  })
  const dateInfo = getRemainingTime(data.shipByDate, '发货')
  return data.createType === '0'
    ? (
        <>
          <div>
            <span className={labelClass}>Shopee状态：</span>
            <span className={valueClass}>
              {
                shopeeStatus?.find(
                  oitem => oitem.value === data.shopeeStatus,
                )?.label || '-'
              }
            </span>
          </div>
          <div>
            <span className={labelClass}>店铺：</span>
            <span className={valueClass}>
              本土 台湾/萬福堂佛緣旗艦店 本命佛 化太歲 藏式手繩水晶手串 吊墜
              開運吉祥
            </span>
          </div>
          <div className="ml-auto">
            <span className={classNames(valueClass, 'text-red-500 font-bold')}>
              {data.shipByDate ? `${dateInfo.dateStr}` : ''}
            </span>
          </div>
        </>
      )
    : (
        <div>
          <span className={labelClass}>订单类型：</span>
          <span className={valueClass}>跨境 台湾/自建</span>
        </div>
      )
}
