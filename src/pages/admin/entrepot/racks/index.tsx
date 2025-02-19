// 库存日志
import { StockAPI } from '@/api/client/stock'
import SearchTable from '@/components/SearchTable'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import { DividerSchema } from '@/constants/schema/common'

export default () => {
  return (
    <SearchTable
      className="bg-white p-4"
      name="仓位列表"
      getListRequest={StockAPI.getLogs}
      //       仓库名称
      // 货架名称
      // 仓位编号
      // 物流单号-签收时间
      showActions={false}
      formItemConfigList={[
        {
          schema: {
            field: 'sendWarehouse',
            label: '所属仓库',
            span: 24,
          },
          control: 'entrepotRadio',
          isSearch: true,
        },
        { ...DividerSchema, isSearch: true, hideTable: true },
        {
          schema: {
            label: '货架名称',
            field: 'goodsInfo',
          },
        },
        {
          schema: {
            label: '仓位编号',
            field: 'warehouseInfo',
          },
        },
        {
          schema: {
            label: '物流单号-签收时间',
            field: 'logType',
          },
          render: value => <DictNameFC dictCode="stock_log_type" value={value} />,
        },
      ]}
    >

    </SearchTable>
  )
}
