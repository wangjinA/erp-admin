import React from 'react'

import { entrepotAPI } from '@/api/admin/entrepot'
import SearchTable from '@/components/SearchTable'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import EntrepotRadio from '@/components/Selectors/EntrepotRadio'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { DividerSchema } from '@/constants/schema/common'

export default () => {
  return (
    <div className="p-4 bg-white">
      <SearchTable
        showActions={false}
        name="扫码记录"
        formItemConfigList={[
          {
            schema: {
              field: 'sendWarehouse',
              label: '所属仓库',
              span: 24,
            },
            control: <EntrepotRadio></EntrepotRadio>,
            render(c) {
              return <EntrepotNameFC value={c}></EntrepotNameFC>
            },
          },
          DividerSchema,
          {
            schema: {
              label: '订单号',
              field: 'shrimpOrderNo',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '运单号',
              field: 'trackingNumber',
            },
          },
          {
            schema: {
              label: '尾程物流',
              field: '',
            },
          },
          {
            schema: {
              label: '类型',
              field: 'businessType',
            },
            render(c) {
              return <DictNameFC value={c} dictCode="business_type"></DictNameFC>
            },
          },
          {
            schema: {
              label: '地区',
              field: 'region',
            },
          },
          {
            schema: {
              label: '出库时间',
              field: 'stockRemovalTime',
            },
          },
          {
            schema: {
              label: '打包收费',
              field: 'packCost',
            },
          },
          {
            schema: {
              label: '包裹重量',
              field: 'parcelWeight',
            },
          },
          {
            schema: {
              label: '头程收费',
              field: 'firstLegCost',
            },
          },
          {
            schema: {
              label: '附加收费',
              field: 'appendCost',
            },
          },
          {
            schema: {
              label: '增值收费',
              field: 'addedCost',
            },
          },
          {
            schema: {
              label: '打包员',
              field: 'operatorUser',
            },
          },
          {
            schema: {
              label: '库存发货数',
              field: 'inventoryShippedQuantity',
            },
          },
          {
            schema: {
              label: '快递包裹数',
              field: 'quantityExpressGoods',
            },
          },
        ]}
        getListRequest={entrepotAPI.getDeliveryHistory}
      >
      </SearchTable>
    </div>
  )
}
