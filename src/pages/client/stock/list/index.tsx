// 现有库存
import { Space, Tag } from '@arco-design/web-react'

import { StockListAPI } from '@/api/client/stock'
import LabelValue from '@/components/LabelValue'
import SearchTable from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import ProductInfo from '../components/ProductInfo'
import ApplyWarehousingButton from '../components/ApplyWarehousingButton'
import { useHistory } from 'react-router-dom'
import { showModal } from '@/utils'
import { IconCheckCircle } from '@arco-design/web-react/icon'

export default () => {
  const history = useHistory()

  return (
    <SearchTable
      className="bg-white p-4"
      tableProps={{
        scroll: {
          x: 1200
        }
      }}
      name="现有库存"
      getListRequest={StockListAPI.getList}
      formItemConfigList={[
        {
          schema: {
            field: 'sendWarehouse',
            label: '所属仓库',
            span: 24,
          },
          control: 'entrepotRadio',
          isSearch: true,
          hideTable: true,
        },
        {
          schema: {
            label: 'SKU',
            field: 'sku',
          },
          isSearch: true,
          hideTable: true,
        },
        {
          schema: {
            label: '商品名称',
            field: 'productName',
          },
          isSearch: true,
          hideTable: true,
        },
        {
          schema: {
            label: '仓位',
            field: 'seatCode',
          },
          isSearch: true,
          hideTable: true,
        },
        {
          schema: {
            label: '商品信息',
            field: 'logisticsProduct',
          },
          width: 340,
          render(item) {
            return <div key={item.id} className="flex items-center">
              <ProductInfo data={item}></ProductInfo>

            </div>
          },
        },
        {
          schema: {
            label: '仓库信息',
            field: 'sendWarehouse',
          },
          render(c) {
            return <EntrepotNameFC value={c}></EntrepotNameFC>
          },
          width: 120,
        },
        {
          schema: {
            label: '仓位信息',
            field: 'seatCode',
          },
          width: 100,
        },
        {
          schema: {
            label: '可用数量/库存数量',
            field: 'useAbleQuantity',
          },
          render(col, item, index) {
            return <Tag color="blue">{`${col || 0} / ${item.quantity || 0}`}</Tag>
          },
          width: 130,
        },
        {
          schema: {
            label: '相关信息',
            field: 'chargeInfo',
          },
          width: 300,
          render(c, row) {
            return (
              <Space direction="vertical">
                <LabelValue label="最新入库时间" value={row.lastCheckInTime}></LabelValue>
                {/* <LabelValue label="最近扣费时间" value=""></LabelValue> */}
                {/* <LabelValue label="最近扣费金额" value=""></LabelValue> */}
                {/* <LabelValue label="计费周期单量" value=""></LabelValue> */}
              </Space>
            )
          },
        },
        {
          schema: {
            label: '操作',
            field: 'actions',
          },
          render(col, row) {
            return (
              <ApplyWarehousingButton
                productInfo={row.logisticsProduct}
                refreshSearchTable={async () => {
                  await showModal({
                    okButtonProps: {
                      status: 'success',
                    },
                    title: '补货成功',
                    content: '是否前往入库管理查看？'
                  })
                  history.push('/client/stock/warehousing')
                }}
              >补货</ApplyWarehousingButton>
            )
          },
        },
      ]}
    >

    </SearchTable>
  )
}
