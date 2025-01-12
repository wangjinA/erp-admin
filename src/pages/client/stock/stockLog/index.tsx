// 库存日志
import SearchTable from '@/components/SearchTable'

export default () => {
  return (
    <SearchTable
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
            label: '类型',
            field: 'type',
          },
        },
        {
          schema: {
            label: '变更数量',
            field: 'changeQuantity',
          },
        },
        {
          schema: {
            label: '剩余库存',
            field: 'remainingStock',
          },
        },
        {
          schema: {
            label: '日志时间',
            field: 'logTime',
          },
        },
        {
          schema: {
            label: '说明',
            field: 'remark',
          },
        },
      ]}
    >

    </SearchTable>
  )
}
