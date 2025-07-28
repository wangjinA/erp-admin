// 库存日志
import { StockAPI } from '@/api/client/stock'
import LabelValue from '@/components/LabelValue'
import SearchTable from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import ProductInfo from '@/pages/client/stock/components/ProductInfo'
import { omitBy } from 'lodash'

export default () => {
  return (
    <SearchTable
      className="bg-white p-4"
      name="库存日志"
      getListRequest={StockAPI.getLogs}
      requestQueryTransform={(query) => omitBy(query, value => value === '')}
      showActions={false}
      tableProps={{
        scroll: {
          x: 1200,
        },
      }}
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
            label: '商品信息',
            field: 'logisticsProduct',
          },
          width: 340,
          render(col, row) {
            return <ProductInfo data={row}></ProductInfo>
          },
        },
        {
          schema: {
            label: '商品名称',
            field: 'productName',
          },
          hideTable: true,
          width: 100,
          isSearch: true,
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
            label: '商品编码',
            field: 'productCode',
          },
          hideTable: true,
          width: 100,
          isSearch: true,
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
            label: '变更数量',
            field: 'changeQuantity',
          },
          width: 100,
        },
        {
          schema: {
            label: '剩余库存',
            field: 'surplusStock',
          },
          width: 100,
        },
        {
          schema: {
            label: '日志时间',
            field: 'createTime',
          },
          width: 120,
        },
        {
          schema: {
            label: '说明',
            field: 'remark',
          },
          width: 120,
          render(c, row) {
            return (
              <div>
                <p>{c}</p>
                <LabelValue label="操作人" value={row.createUser}></LabelValue>
              </div>
            )
          },
        },
        {
          schema: {
            label: '日志类型',
            field: 'logType',
          },
          width: 100,
          // render(x) {
          //   return x === '1' ? '商品入库' : '变更数量'
          // },
          isSearch: true,
          hideTable: true,
          control: 'dictSelector',
          controlProps: {
            dictCode: 'stock_log_type',
          },
        },
      ]}
    >

    </SearchTable>
  )
}
