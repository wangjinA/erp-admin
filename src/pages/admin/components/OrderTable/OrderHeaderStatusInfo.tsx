import classNames from 'classnames'

import { labelClass, valueClass } from '.'

import LabelValue from '@/components/LabelValue'
import { useDictOptions } from '@/components/Selectors/DictSelector'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { ShopNameFC } from '@/components/Selectors/ShopRadio'
import { isClient } from '@/routes'
import { OrderResponseItem } from '@/types/order'
import { getRemainingTime } from '@/utils/date'

export default ({ data }: { data: OrderResponseItem }) => {
  const { data: shopeeStatus } = useDictOptions({
    dictCode: 'shopee_status',
  })
  const dateInfo = getRemainingTime(data.shipByDate, '发货')
  return (
    <>
      {
        isClient()
          ? (
              data.createType === '0'
                ? (
                    <>
                      <LabelValue
                        className="w-[180px]"
                        label="Shopee状态"
                        value={
                          shopeeStatus?.find(
                            oitem => oitem.value === data.shopeeStatus,
                          )?.label || '-'
                        }
                      >
                      </LabelValue>
                      <LabelValue className="w-[240px] truncate" label="店铺" value={<ShopNameFC value={data.platformShopId}></ShopNameFC>}></LabelValue>
                    </>
                  )
                : (

                    <LabelValue className="w-[240px]" label="订单类型" value="跨境 台湾/自建"></LabelValue>
                  )
            )
          : (
              null
            )
      }
      {
        data.sendWarehouse && data.sendWarehouse !== '0'
          ? (
              <div className="w-[240px]">
                <span className={labelClass}>仓库：</span>
                <span className={valueClass}>
                  <EntrepotNameFC value={data.sendWarehouse}></EntrepotNameFC>
                </span>
              </div>
            )
          : null
      }
      {/* {data.remark ? <LabelValue className="w-[240px]" valueClassName="text-red-500 font-bold" label="商家备注" value={data.remark}></LabelValue> : <div></div>} */}
      <div className="ml-auto">
        <span className={classNames(valueClass, 'text-red-500 font-bold')}>
          {data.shipByDate ? `${dateInfo.dateStr}` : ''}
        </span>
      </div>
    </>
  )
}
