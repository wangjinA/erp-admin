import { Alert, Button, Tag } from '@arco-design/web-react'
import { IconPoweroff } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { expressAPI } from '@/api/client/express'
import ReturnParcel from '@/components/ReturnParcel'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'

import { DictNameFC } from '@/components/Selectors/DictSelector'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { DividerSchema } from '@/constants/schema/common'
import { TagColors } from '@/constants/colorMap'
import { showMessage, showModal } from '@/utils'

export default () => {
  const [current, setCurrent] = useState<any>()
  const [visible, setVisible] = React.useState<boolean>(false)
  const ref = React.useRef<SearchTableRef>()

  const { run, loading } = useRequest(
    async (row) => {
      await showModal({
        content: '确定取消退件？',
        okButtonProps: {
          status: 'warning',
        },
      })
      setCurrent(row)
      await showMessage(() =>
        expressAPI.cancelReturn(row.id), '取消退件')
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
          '1. 退件管理：将您已经在仓库不需要发货或者已经完成发货多出来的商品退回到您指定的退件地址',
          '2. 无论是上门取件还是仓库快递寄回，仓库统一收取每个退件包裹1元/单的退件服务费。退件完成之后仓库将会把寄回的快递单号填入，您可通过此处自行查看退件单号',
          '3. 操作流程：新增-->选择退件仓库-->依次填入需要退件的信息-->确定。 注：上门取件务必在备注上填写取件码 ，否则将退件失败',
          '4. 无主件仓库会进行公示 15天，15天后无人认领，仓库即做销毁处理，不予任何查找或理赔',
        ].map(item => (
          <div key={item}>{item}</div>
        ))}
      />
      <SearchTable
        ref={ref}
        name="包裹认领"
        getListRequest={expressAPI.getReturnList}
        createHandle={() => {
          setVisible(true)
        }}
        requestQueryTransform={formData => ({
          ...omit(formData, 'applyTime'),
          applyStartTime: formData.applyTime?.[0],
          applyEndTime: formData.applyTime?.[1],
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
            render(col) {
              return <EntrepotNameFC value={String(col)} />
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
          },
          {
            schema: {
              label: '收件人信息',
              field: 'recipients',
            },
          },
          // {
          //   schema: {
          //     label: '退件信息',
          //     field: 'status',
          //   },
          // },
          // {
          //   schema: {
          //     label: '状态',
          //     field: 'returnStatus',
          //   },
          //   render(col) {
          //     return col || '-'
          //   },
          // },
          {
            schema: {
              label: '备注',
              field: 'storeRemark',
            },
          },
          {
            schema: {
              label: '申请时间',
              field: 'applyTime',
            },
            control: 'datePickerRange',
            isSearch: true,
          },
          {
            schema: {
              label: '状态',
              field: 'returnStatus',
            },
            render(c) {
              return (
                <Tag color={TagColors[Number(c)]}>
                  <DictNameFC dictCode="tracking_status" value={c} />
                </Tag>
              )
            },
          },
          {
            schema: {
              field: 'actions',
            },
            render(c, row) {
              return row.returnStatus !== '1'
                ? (
                    <Button
                      type="text"
                      icon={<IconPoweroff />}
                      status="warning"
                      loading={row.id === current?.id && loading}
                      onClick={async () => {
                        run(row)
                      }}
                    >
                      取消退件
                    </Button>
                  )
                : null
            },
          },
        ]}
      >
      </SearchTable>
      <ReturnParcel visible={visible} setVisible={setVisible}></ReturnParcel>
    </div>
  )
}
