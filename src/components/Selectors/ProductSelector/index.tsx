import { Button, Image, Modal } from '@arco-design/web-react'

import { useState } from 'react'

import { ProductItem, StockAPI } from '@/api/client/stock'
import Remark, { RemarkType } from '@/components/Remark'
import SearchTable from '@/components/SearchTable'
import ProductInfo from '@/pages/client/stock/components/ProductInfo'

export default (props) => {
  const { value, onChange } = props
  const [visible, setVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<(ProductItem & {
    num: number
  })[]>([...(value || [])])
  const [list, setList] = useState<ProductItem[]>()

  return (
    <div>
      <Button onClick={() => {
        setVisible(true)
      }}
      >
        点击选择
      </Button>
      {
        value?.length
          ? (
            <SearchTable
              className="mt-4"
              name="商品选择"
              tableProps={{
                data: value,
              }}
              formItemConfigList={[
                {
                  schema: {
                    label: '商品名称',
                    field: 'productName',
                  },
                  width: 300,
                  render: (c, row: ProductItem) => (
                    <ProductInfo data={row}></ProductInfo>
                  ),
                },
                {
                  schema: {
                    label: '数量',
                    field: 'num',
                  },
                  render(c, row) {
                    return (
                      <Remark
                        value={c}
                        title="修改数量"
                        type={RemarkType.Number}
                        onChange={(v) => {
                          row.num = v
                          console.log(value)
                          onChange([...value])
                          return Promise.resolve({
                            data: {
                              code: 0
                            }
                          })
                          // onChange()
                        }}
                      >
                      </Remark>
                    )
                  },
                },
                {
                  schema: {
                    label: '操作',
                    field: 'actions',
                  },
                  render(c, row) {
                    return (
                      <Button
                        type="text"
                        onClick={() => {
                          onChange(value.filter(o => o !== row))
                        }}
                      >
                        移除
                      </Button>
                    )
                  },
                },
              ]}
            >
            </SearchTable>
          )
          : null
      }
      <Modal
        style={{
          width: '850px',
        }}
        visible={visible}
        title="商品选择"
        onConfirm={() => {
          onChange(selectedRowKeys)
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <SearchTable
          getListRequest={(...p) => StockAPI.getProductList(...p).then((r) => {
            setList(r.data.data.list)
            setSelectedRowKeys([])
            return r
          })}
          name="商品选择"
          showActions={false}
          tableProps={{
            rowKey: 'id',
            rowSelection: {
              type: 'checkbox',
              selectedRowKeys: selectedRowKeys.map(item => item.id),
              onChange: (selectedRowKeys) => {
                setSelectedRowKeys(list.filter(oitem => selectedRowKeys.includes(oitem.id)).map(item => ({
                  ...item,
                  num: 20,
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
            },
          }}
          formItemConfigList={[
            {
              schema: {
                label: '商品名称',
                field: 'productName',
              },
              render: (c, row: ProductItem) => (
                <div className="flex items-center">
                  <Image className="size-14 mr-1 overflow-hidden object-cover" src={row.productImg}></Image>
                  <div className="w-44">{row.productName}</div>
                </div>
              ),
              isSearch: true,
            },
            {
              schema: {
                label: 'SKU',
                field: 'sku',
              },
            },
          ]}
        >

        </SearchTable>
      </Modal>
    </div>
  )
}
