import { Button, Tag } from '@arco-design/web-react'
import { IconCheck, IconPoweroff } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import React, { useState } from 'react'

import { expressAPI } from '@/api/admin/express'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import ReturnParcel from '@/components/ReturnParcel'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'

import { DictNameFC } from '@/components/Selectors/DictSelector'
import EntrepotRadio from '@/components/Selectors/EntrepotRadio'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { DividerSchema } from '@/constants/schema/common'
import { TagColors } from '@/pages/admin/components/OrderTable/SendCargoInfo'
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
      <SearchTable
        ref={ref}
        name="包裹认领"
        getListRequest={expressAPI.getReturnList}
        createHandle={() => {
          setVisible(true)
        }}
        formItemConfigList={[
          {
            schema: {
              field: 'sendWarehouse',
              label: '仓库',
              span: 24,
            },
            control: <EntrepotRadio></EntrepotRadio>,
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
              label: '申请信息',
              field: 'recipients',
            },
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
              field: 'createTime',
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
                    <>
                      <Button
                        type="text"
                        icon={<IconPoweroff />}
                        status="warning"
                        loading={row.id === current?.id && loading}
                        onClick={() => {
                          run(row)
                        }}
                      >
                        取消退件
                      </Button>
                      <PopconfirmDelete
                        title="确认处理完成？"
                        buttonProps={{
                          // loading: row.id === current?.id && loading,
                        }}
                        onOk={() => {
                          // run(row)
                          alert('开发中')
                        }}
                      >
                        <Button
                          type="text"
                          icon={<IconCheck />}
                          status="success"
                          // loading={row.id === current?.id && loading}
                        >
                          处理完成
                        </Button>
                      </PopconfirmDelete>
                    </>
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
