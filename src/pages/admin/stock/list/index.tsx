// 现有库存
import { Button, InputNumber, Modal, Space, Tag } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'

import { StockItem, StockListAPI } from '@/api/client/stock'
import LabelValue from '@/components/LabelValue'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import ProductInfo from '@/pages/client/stock/components/ProductInfo'
import { showMessage } from '@/utils'

export default () => {
  const [editData, setEditData] = useState<StockItem>()
  const [editInventoryModalVisible, setEditInventoryModalVisible] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const ref = useRef<SearchTableRef>()

  const { run, loading } = useRequest(async () => {
    return showMessage(() => StockListAPI.changeQuantity({ id: editData.id, quantity })).then(() => {
      setEditData(null)
      ref.current.refreshSearchTable()
      setEditInventoryModalVisible(false)
    })
  }, {
    manual: true,
  })

  return (
    <div>
      <SearchTable
        ref={ref}
        className="bg-white p-4"
        tableProps={{
          scroll: {
            x: 1200,
          },
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
              return (
                <div key={item.id} className="flex items-center">
                  <ProductInfo data={item}></ProductInfo>
                </div>
              )
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
            width: 120,
            align: 'center',
            render: (_, row) => {
              return (
                <Button
                  type="text"
                  size="small"
                  status="default"
                  onClick={() => {
                    setEditData(row)
                    setQuantity(row.useAbleQuantity || 0)
                    setEditInventoryModalVisible(true)
                  }}
                >
                  编辑库存
                </Button>
              )
            },
          },
        ]}
      >

      </SearchTable>
      <Modal
        title="编辑库存"
        visible={editInventoryModalVisible}
        onCancel={() => setEditInventoryModalVisible(false)}
        confirmLoading={loading}
        onOk={() => {
          run()
        }}
      >
        <InputNumber
          placeholder='请输入库存数量'
          value={quantity}
          onChange={setQuantity}
          step={1}
          precision={0}
        />
      </Modal>
    </div>
  )
}
