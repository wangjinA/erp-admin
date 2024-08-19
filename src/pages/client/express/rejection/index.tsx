import { Alert, Button, Tag } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import React, { useState } from 'react'

import { expressAPI } from '@/api/client/express'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { useDictOptions } from '@/components/Selectors/DictSelector'
import EntrepotRadio from '@/components/Selectors/EntrepotRadio'
import { DividerSchema } from '@/constants/schema/common'
import { TagColors } from '@/pages/admin/components/OrderTable/SendCargoInfo'
import { showMessage, showModal } from '@/utils'

export default () => {
  const [current, setCurrent] = useState<any>()
  const ref = React.useRef<SearchTableRef>()

  const { run, loading } = useRequest(
    async (row) => {
      await showModal({
        content: '确定取消？',
        okButtonProps: {
          status: 'warning',
        },
      })
      setCurrent(row)
      await showMessage(() =>
        expressAPI.cancelReject(row.id),
      )
      ref.current.refreshSearchTable()
    },
    {
      manual: true,
    },
  )

  const { data: dictData, loading: dictLoading } = useDictOptions({
    dictCode: 'tracking_status',
  })

  return (
    <div className="p-4 bg-white">
      <Alert
        style={{ marginBottom: 20 }}
        type="info"
        content={[
          '1. 拒收管理：将您采购的商品在发往仓库途中，由于虾皮买家取消订单等因素造成不需要该商品，可以通过拒收来节省退件的成本',
          '2. 需要在仓库签收之前提交拒收信息给仓库，否则，一旦仓库签收后将无法拒收，拒收成功之后会提示已拒收状态，已拒收代表快递已经取走快递原路退回',
          '3. 操作流程：新增-->选择拒收仓库-->填入需要拒收的快递单号-->确定',
        ].map(item => (
          <div key={item}>{item}</div>
        ))}
      />
      <SearchTable
        ref={ref}
        name="包裹拒收"
        getListRequest={expressAPI.getRejectList}
        createRequest={expressAPI.addReject}
        formItemConfigList={[
          {
            schema: {
              field: 'sendWarehouse',
              label: '仓库',
              span: 24,
            },
            control: <EntrepotRadio></EntrepotRadio>,
            isSearch: true,
            isCreate: true,
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
            isCreate: true,
          },
          {
            schema: {
              label: '状态',
              field: 'status',
            },
            render(c) {
              return (
                <Tag color={TagColors[Number(c)]}>
                  {dictData?.find(({ value }) => value === c)?.label}
                </Tag>
              )
            },
          },
          {
            schema: {
              label: '拒收时间',
              field: '填充11111',
            },
            control: 'datePickerRange',
            isSearch: true,
          },
          {
            schema: {
              label: '申请时间',
              field: '填充22222',
            },
            control: 'datePickerRange',
            isSearch: true,
          },
          {
            schema: {
              field: 'actions',
            },
            render(c, row) {
              return row.rejectionStatus !== '1'
                ? (
                    <Button
                      type="text"
                      loading={row.id === current?.id && loading}
                      onClick={async () => {
                        run(row)
                      }}
                    >
                      取消拒收
                    </Button>
                  )
                : null
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
