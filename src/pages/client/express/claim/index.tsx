import { Alert, Button } from '@arco-design/web-react'
import { IconImport } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { omit, pick } from 'lodash'
import React, { useRef, useState } from 'react'

import { expressAPI } from '@/api/client/express'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import TrackingNo from '@/components/TrackingNo'
import { DividerSchema } from '@/constants/schema/common'
import { showMessage, showModal, timeArrToObject } from '@/utils'

export default () => {
  const [current, setCurrent] = useState<any>()
  const ref = useRef<SearchTableRef>()

  const { run, loading } = useRequest(
    async (row) => {
      await showModal({
        content: '确定认领？',
        okButtonProps: {
          status: 'warning',
        },
      })
      setCurrent(row)
      await showMessage(() => expressAPI.claimHandle(pick(row, ['sendWarehouse', 'trackingNo'])), '认领')
      ref.current.refreshSearchTable()
    },
    {
      manual: true,
    },
  )

  return (
    <div className="p-4 bg-white">
      <Alert
        style={{ marginBottom: 20 }}
        type="info"
        content={[
          '1. 包裹认领：寄过来仓库的包裹面单上没有写用户编码，仓库无法识别是谁的包裹，称之为“无主件”',
          '2. 仓库会将“无主件”进行公示，您可以通过输入完整的快递单号校验，校验正确后则可以点击认领',
          '3. 认领完成后，包裹会在问题包裹列表里，请及时录单处理',
          '4. 无主件仓库会进行公示 15天，15天后无人认领，仓库即做销毁处理，不予任何查找或理赔',
        ].map(item => (
          <div key={item}>{item}</div>
        ))}
      />
      <SearchTable
        ref={ref}
        name="包裹认领"
        getListRequest={expressAPI.getClaimList}
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
            control: 'entrepotRadio',
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
          // {
          //   schema: {
          //     label: '状态',
          //     field: 'status',
          //   },
          // },
          {
            schema: {
              label: '签收时间',
              field: 'shelfTime',
            },
            control: 'datePickerRange',
            isSearch: true,
          },
          {
            schema: {
              field: 'actions',
            },
            render(c, row) {
              return (
                <Button
                  icon={<IconImport />}
                  type="text"
                  loading={row.id === current?.id && loading}
                  onClick={async () => {
                    run(row)
                  }}
                >
                  认领
                </Button>
              )
            },
          },
          // {
          //   schema: {
          //     label: '包裹年龄',
          //     field: 'createTime',
          //   },
          // },
        ]}
      >
      </SearchTable>
    </div>
  )
}
