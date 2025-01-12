// 现有库存
import SearchTable from '@/components/SearchTable'

export default () => {
  return (
    <SearchTable
      className="bg-white p-4"
      name=""
      formItemConfigList={[
        {
          schema: {
            label: '商品信息',
            field: 'goodsInfo',
          },
        },
        {
          schema: {
            label: '仓库信息',
            field: 'warehouseInfo',
          },
        },
        {
          schema: {
            label: '仓位信息',
            field: 'positionInfo',
          },
        },
        {
          schema: {
            label: '库存数量',
            field: 'stockQuantity',
          },
        },
        {
          schema: {
            label: '收费信息',
            field: 'chargeInfo',
          },
        },
      ]}
    >

    </SearchTable>
  )
}
