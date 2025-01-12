import SearchTable from '@/components/SearchTable'

// 入库管理
export default () => {
  return (
    <SearchTable
      name=""
      formItemConfigList={[
        {
          schema: {
            label: '入库编码',
            field: 'warehousingCode',
          },
        },
        {
          schema: {
            label: '发往仓库',
            field: 'warehouse',
          },
        },
        {
          schema: {
            label: '商品信息',
            field: 'goodsInfo',
          },
        },
        {
          schema: {
            label: '快递单号',
            field: 'expressNumber',
          },
        },
        {
          schema: {
            label: '发货/收货数量',
            field: 'quantity',
          },
        },
        {
          schema: {
            label: '上架服务费',
            field: 'shelfServiceCharge',
          },
        },
        {
          schema: {
            label: '状态',
            field: 'status',
          },
        },
      ]}
    >

    </SearchTable>
  )
}
