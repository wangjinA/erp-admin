// 现有库存
import { Button, Space } from '@arco-design/web-react'

import { StockListAPI } from '@/api/client/stock'
import LabelValue from '@/components/LabelValue'
import SearchTable from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { DividerSchema } from '@/constants/schema/common'

export default () => {
  return '开发中...'
  return (
    <SearchTable
      className="bg-white p-4"
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
        { ...DividerSchema, isSearch: true, hideTable: true },
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
            field: 'goodsName',
          },
          isSearch: true,
          hideTable: true,
        },
        {
          schema: {
            label: '仓位',
            field: 'position',
          },
          isSearch: true,
          hideTable: true,
        },
        {
          schema: {
            label: '商品信息',
            field: 'goodsInfo',
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
        },
        {
          schema: {
            label: '仓位信息',
            field: 'seatId',
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
            label: '可用/冻结数量',
            field: 'availableQuantity',
          },
        },
        {
          schema: {
            label: '收费信息',
            field: 'chargeInfo',
          },
          render(c, row) {
            return (
              <Space>
                <LabelValue label="最新入库时间" value=""></LabelValue>
                <LabelValue label="最近扣费时间" value=""></LabelValue>
                <LabelValue label="最近扣费金额" value=""></LabelValue>
                <LabelValue label="计费周期单量" value=""></LabelValue>
              </Space>
            )
          },
        },
        {
          schema: {
            label: '操作',
            field: 'acitons',
          },
          render() {
            return (
              <div>
                <Button type="primary" onClick={() => {}}>补货</Button>
              </div>
            )
          },
        },
      ]}
    >

    </SearchTable>
  )
}
