// 仓库列表
import SearchTable from '@/components/SearchTable'

export default () => {
  return (
    <SearchTable
      name=""
      formItemConfigList={[
        {
          schema: {
            label: '仓库名称',
            field: 'name',
          },
        },
        {
          schema: {
            label: '仓库地址',
            field: 'address',
          },
        },
        {
          schema: {
            label: '仓库类型',
            field: 'type',
          },
        },
        {
          schema: {
            label: '支持店铺类型',
            field: 'storeType',
          },
        },
        {
          schema: {
            label: '支持库存',
            field: 'supportStock',
          },
        },
        {
          schema: {
            label: '创建时间',
            field: 'createTime',
          },
        },
        {
          schema: {
            label: '操作',
            field: 'operation',
          },
        },
      ]}
    >

    </SearchTable>
  )
}
