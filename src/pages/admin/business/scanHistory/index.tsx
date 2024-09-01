import { Badge } from '@arco-design/web-react'
import { omit } from 'lodash'
import React from 'react'

import { checkIsProblem } from '../signfor'

import { scanAPI } from '@/api/admin/entrepot'
import SearchTable from '@/components/SearchTable'
import TrackingNo from '@/components/TrackingNo'
import { formatDate, timeArrToObject } from '@/utils'

export default () => {
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
            render(c) {
              return (
                <TrackingNo
                  value={c}
                >
                </TrackingNo>
              )
            },
          },
          {
            schema: {
              label: '扫码时间',
              field: 'createTime',
            },
            control: 'datePickerRange',
            isSearch: true,
            render(c) {
              return formatDate(c)
            },
          },
          {
            schema: {
              label: '说明',
              field: 'instructions',
            },
            render(c) {
              return <Badge status={checkIsProblem(c) ? 'error' : 'success'} text={c}></Badge>
            },
          },
          {
            schema: {
              label: '操作人',
              field: 'operator',
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
