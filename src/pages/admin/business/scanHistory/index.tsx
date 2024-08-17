import { usePagination } from 'ahooks'
import { omit } from 'lodash'
import React from 'react'

import { scanAPI } from '@/api/admin/entrepot'
import SearchTable from '@/components/SearchTable'
import { timeArrToObject } from '@/utils'

export default () => {
  const { pagination, data, loading } = usePagination(async (params) => {
    const res = await scanAPI.getRecord({
      ...params,
      pageNum: params?.current || pagination.current,
      pageSize: params?.pageSize || pagination.pageSize,
    })
    return res.data.data
  })
  return (
    <div className="p-4 bg-white">
      <SearchTable
        showActions={false}
        name="扫码记录"
        formItemConfigList={[
          {
            schema: {
              label: '仓库',
              field: 'sendWarehouse',
              span: 24,
            },
            control: 'entrepotRadio',
            isSearch: true,
            render(c, row) {
              return row.sendWarehouseName
            },
          },
          {
            schema: {
              label: '快递单号',
              field: 'trackingNumber',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '扫码时间',
              field: 'createTime',
            },
            control: 'datePickerRange',
            isSearch: true,
          },
          {
            schema: {
              label: '说明',
              field: 'instructions',
            },
          },
          {
            schema: {
              label: '操作人',
              field: 'signer',
            },
            isSearch: true,
          },
        ]}
        requestQueryTransform={params => ({
          ...omit(params, 'createTime'),
          ...timeArrToObject(params.createTime, 'scanningStartTime', 'scanningEndTime'),
        })}
        getListRequest={scanAPI.getRecord}
      >
      </SearchTable>
    </div>
  )
}
