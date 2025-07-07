import { Button, InputNumber, Modal, Tag } from '@arco-design/web-react'
import { useRef, useState } from 'react'
import { StockItem, StockListAPI } from '@/api/client/stock'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import ProductInfo from '@/pages/client/stock/components/ProductInfo'
import LabelValue from '@/components/LabelValue'
import { IconClose, IconPlus } from '@arco-design/web-react/icon'

interface ProductStockSelectorProps {
  className?: string
  value?: StockItem[]
  onChange?: (value: StockItem[]) => void
  stockNum?: number
  disabled?: boolean
}

export default (props: ProductStockSelectorProps) => {
  const { value, className, onChange, stockNum, disabled } = props
  const [visible, setVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<(StockItem)[]>([...(value || [])])
  const [list, setList] = useState<StockItem[]>()
  const searchTableRef = useRef<SearchTableRef>()

  return (
    <div className={className}>
      {
        !value?.length ? <Button className="mx-auto w-1/2" disabled={disabled} type="primary" icon={<IconPlus></IconPlus>} long onClick={() => {
          setVisible(true)
        }}>
          选择库存
        </Button> : <div>
          {
            value.map(item => (
              <div key={item.id} className="flex items-center relative">
                <ProductInfo className="!px-2" data={item.logisticsProduct}></ProductInfo>
                <InputNumber
                  disabled={disabled || !item.useAbleQuantity}
                  value={item.useAbleQuantityChange}
                  className="w-24"
                  placeholder="数量"
                  min={1}
                  max={item.useAbleQuantity || 1} onChange={(v) => {
                    item.useAbleQuantityChange = v
                    const newSelectedRowKeys = selectedRowKeys.map(o => o.id === item.id ? {
                      ...o,
                      useAbleQuantityChange: v,
                    } : o);
                    setSelectedRowKeys(newSelectedRowKeys);
                    onChange(newSelectedRowKeys)
                  }}></InputNumber>
                <Button
                  className="absolute -right-3 -top-3"
                  status="danger"
                  icon={<IconClose />}
                  shape='circle'
                  onClick={() => {
                    const newSelectedRowKeys = selectedRowKeys.filter(o => o.id !== item.id)
                    onChange(newSelectedRowKeys)
                    setSelectedRowKeys(newSelectedRowKeys)
                  }}>
                </Button>
              </div>
            ))
          }
        </div>
      }
      <Modal
        style={{
          width: '850px',
        }}
        visible={visible}
        title="库存选择"
        onConfirm={() => {
          onChange(selectedRowKeys.map(o => ({
            ...o,
            useAbleQuantityChange: stockNum >= o.useAbleQuantity ? o.useAbleQuantity : stockNum
          })))
          searchTableRef.current.searchFormRef.resetFields();
          setVisible(false)
        }}
        onCancel={() => {
          searchTableRef.current.searchFormRef.resetFields();
          setVisible(false)
        }}
      >
        <SearchTable
          getListRequest={(...p) => StockListAPI.getList(...p).then((r) => {
            setList(r.data.data.list)
            setSelectedRowKeys([])
            return r
          })}
          name="商品选择"
          ref={searchTableRef}
          showActions={false}
          tableProps={{
            rowKey: 'id',
            rowSelection: {
              type: 'radio',
              selectedRowKeys: selectedRowKeys.map(item => item.id),
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRows, selectedRowKeys)
                setSelectedRowKeys(selectedRows.map(o => ({
                  ...o,
                })))
              },
              onSelectAll: (selected) => {
                if (selected) {
                  setSelectedRowKeys(list.map(item => ({
                    ...item,
                    num: 20,
                  })))
                }
                else {
                  setSelectedRowKeys([])
                }
              },
              checkboxProps: (record) => {
                return {
                  disabled: !record.useAbleQuantity,
                };
              },

            },
          }}
          formItemConfigList={[
            {
              schema: {
                label: '商品名称',
                field: 'productName',
              },
              render: (c, row: StockItem) => (
                <ProductInfo data={row.logisticsProduct}></ProductInfo>
              ),
              width: 340,
              isSearch: true,
            },
            {
              schema: {
                label: '相关信息',
                field: 'lastCheckInTime',
              },
              render: (c, row: StockItem) => (
                <div>
                  <LabelValue label="可用库存" value={<Tag color='blue'>{row.useAbleQuantity || 0}</Tag>}></LabelValue>
                  <LabelValue label="入库时间" value={row.lastCheckInTime}></LabelValue>
                </div>
              ),
            },
          ]}
        >
        </SearchTable>
      </Modal>
    </div>
  )
}
