// 库存日志
import { StockAPI } from '@/api/client/stock'
import SearchTable from '@/components/SearchTable'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import { DividerSchema } from '@/constants/schema/common'

export default () => {
  return (
    <SearchTable
      className="bg-white p-4"
      name="库存日志"
      getListRequest={StockAPI.getLogs}
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
        { ...DividerSchema, isSearch: true, hideTable: true },
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
            field: 'logType',
          },
          render: value => <DictNameFC dictCode="stock_log_type" value={value} />,
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
