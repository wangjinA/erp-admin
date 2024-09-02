import { Alert } from '@arco-design/web-react'
import { omit } from 'lodash'
import React from 'react'

import { expressAPI } from '@/api/client/express'
import MyBadge from '@/components/MyBadge'
import SearchTable from '@/components/SearchTable'
import EntrepotRadio from '@/components/Selectors/EntrepotRadio'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import TrackingNo from '@/components/TrackingNo'
import { DividerSchema } from '@/constants/schema/common'
import { timeArrToObject } from '@/utils'

export default () => {
  return (
    <div className="p-4 bg-white">
      <Alert
        style={{ marginBottom: 20 }}
        type="info"
        content={[
          '1. 问题包裹：您采购发往仓库的包裹，仓库收到包裹后扫描发现您没有提交打包信息给仓库，仓库便会通过问题包裹通知您及时录单提交打包',
          '2. 您没有提交打包信息给仓库是无法匹配订单信息打包出库的，请在获取快递单号后，务必第一时间提交打包',
          '3. 如果是您单方面没有提交订单信息给仓库打包出库导致成为问题包裹，造成丢件、打包出库异常等后果，仓库一律不予理赔',
        ].map(item => (
          <div key={item}>{item}</div>
        ))}
      />
      <SearchTable
        name="问题包裹"
        showActions={false}
        getListRequest={expressAPI.getProblemList}
        requestQueryTransform={params => ({
          ...omit(params, ['shelfTime']),
          ...timeArrToObject(params.shelfTime, 'shelfStartTime', 'shelfEndTime'),
        })}
        formItemConfigList={[
          {
            schema: {
              field: 'sendWarehouse',
              label: '仓库',
              span: 24,
            },
            control: <EntrepotRadio></EntrepotRadio>,
            isSearch: true,
            render(c) {
              return <EntrepotNameFC value={c}></EntrepotNameFC>
            },
          },
          {
            ...DividerSchema,
            isSearch: true,
          },
          {
            schema: {
              label: '快递单号',
              field: 'trackingNo',
            },
            isSearch: true,
            render(c) {
              return <TrackingNo value={c}></TrackingNo>
            },
          },
          {
            schema: {
              label: '仓位',
              field: 'freightSpaceName',
            },
            render(c) {
              return c || '-'
            },
          },
          {
            schema: {
              label: '状态',
              field: 'claimStatus',
            },
            render(c) {
              const status: any = ['warning', 'success'][Number(c)]
              const text = ['未认领', '已认领'][Number(c)]
              return <MyBadge status={status} text={text}></MyBadge>
            },
          },
          {
            schema: {
              label: '签收时间',
              field: 'shelfTime',
            },
            control: 'datePickerRange',
            isSearch: true,
          },
          // {
          //   schema: {
          //     label: '问题件',
          //     field: 'ss',
          //   },
          // },
          {
            schema: {
              label: '签收人',
              field: 'signerUser',
            },
            render(c) {
              return c || '-'
            },
          },
          // {
          //   schema: {
          //     label: '包裹年龄',
          //     field: 'operator0',
          //   },
          // },
        ]}
      >
      </SearchTable>
    </div>
  )
}
