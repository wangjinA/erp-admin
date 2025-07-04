import { Button, DatePicker, Space, Tag, Typography } from '@arco-design/web-react'
import { SorterInfo } from '@arco-design/web-react/es/Table/interface'
import { useRequest } from 'ahooks'
import classNames from 'classnames'
import { omit } from 'lodash'
import React, { useEffect, useState } from 'react'

import { tenantryUserAPI } from '@/api/admin/tenantry'
import { shipmentAPI } from '@/api/shopeeUtils/shipment'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import { shortcuts } from '@/constants'
import { formatDate, getExpiredStatus, showMessage, showModal, sorterToRequestInfo } from '@/utils'

export default () => {
  const ref = React.useRef<SearchTableRef>()
  const [sorter, setSorter] = useState<SorterInfo>()

  const userHandle = useRequest(() => {
    return tenantryUserAPI.getList({
      pageNum: 1,
      pageSize: 1000,
    }).then(r => r.data.data.list)
  })

  const agreeHandle = useRequest(
    async (row, expiredDate) => {
      await showModal({
        content: '确定修改？',
        okButtonProps: {
          status: 'success',
        },
      })
      await showMessage(() =>
        shipmentAPI.agree({
          shopId: row.shopId,
          userLoginAccount: row.userLoginAccount,
          expiredDate,
        }),
      )
      ref.current.refreshSearchTable()
    },
    {
      manual: true,
    },
  )

  const refuseHandle = useRequest(
    async (row) => {
      await showModal({
        content: '确定拒绝？',
        okButtonProps: {
          status: 'warning',
        },
      })
      await showMessage(() =>
        shipmentAPI.refuse({
          shopId: row.shopId,
          userLoginAccount: row.userLoginAccount,
        }), '拒绝')
      ref.current.refreshSearchTable()
    },
    {
      manual: true,
    },
  )

  useEffect(() => {
    ref.current.refreshSearchTable()
  }, [JSON.stringify(sorter)])

  return (
    <div className="p-4 bg-white">
      <SearchTable
        ref={ref}
        name="店铺授权"
        getListRequest={async (params) => {
          let userLoginAccount = params.userLoginAccount || ''
          if (params.remark) {
            const ls = await tenantryUserAPI.getList({
              pageNum: 1,
              pageSize: 1000,
              remarks: params.remark,
            }).then(r => r.data.data.list)
            if (ls.length) {
              const prefix = userLoginAccount ? ',' : ''
              userLoginAccount = prefix + ls.map(o => o.tenantryPhone).toString()
            }
          }
          return shipmentAPI.getConsumerList({
            ...omit(params, 'remark'),
            ...sorterToRequestInfo(sorter),
            userLoginAccount,
          } as any)
        }}
        tableProps={
          {
            onChange(pagination, sorter: SorterInfo) {
              setSorter(sorter)
            },
          }
        }
        showActions={false}
        formItemConfigList={[
          {
            schema: { label: '序号', field: 'index' },
            render(col, row, index) {
              return index + 1
            },
          },
          {
            schema: { label: '用户账户', field: 'userLoginAccount' },
            isCreate: true,
            isSearch: true,
            render(c, row) {
              return (
                <div>
                  <Tag color="blue">{c}</Tag>
                  {row.shopName
                    ? (
                        <p>
                          <Typography.Text type="warning" copyable className="mt-1 text-sm">
                            {row.shopName}
                          </Typography.Text>
                        </p>
                      )
                    : null}
                </div>
              )
            },
          },
          {
            schema: { label: '用户备注', field: 'remark' },
            isSearch: true,
            isCreate: true,
            // isSearch: true,
            render(c, row) {
              return userHandle.data?.find(o => o.tenantryPhone === row.userLoginAccount)?.remarks || '无'
            },
          },
          // {
          //   schema: { label: '店铺名称', field: 'shopName' },
          //   isCreate: true,
          //   // isSearch: true,
          // },
          {
            schema: { label: '激活时间', field: 'activateDate' },
            render(r) {
              return r ? formatDate(r) : <Tag>未激活</Tag>
            },
          },
          {
            schema: { label: '申请时间', field: 'applyForDate' },
            render(r) {
              return r ? formatDate(r) : '-'
            },
          },
          {
            schema: { label: '过期时间', field: 'expiredDate' },
            render(c, row) {
              return (
                <DatePicker
                  className={classNames(
                    'date-picker-color-change',
                    getExpiredStatus(c),

                  )}
                  style={{
                    width: 130,
                  }}
                  shortcuts={shortcuts}
                  allowClear={false}
                  defaultValue={c}
                  onChange={(e) => {
                    agreeHandle.run(row, e)
                  }}
                />
              )
            },
            sorter: () => null,
          },
          {
            schema: {
              label: '授权状态',
              field: 'status',
            },
            render(e) {
              return <DictNameFC dictCode="shopee_utils_status" value={e}></DictNameFC>
            },
          },
          {
            schema: {
              label: '操作',
              field: 'operator',
            },
            title: '操作',
            dataIndex: 'operator',
            render(col, row) {
              return (
                <Space>
                  {
                    row?.status === '1'
                      ? (
                          <Button
                            type="primary"
                            size="mini"
                            status="danger"
                            onClick={() => refuseHandle.run(row)}
                          >
                            拒绝
                          </Button>
                        )
                      : null
                  }
                  {/* <PopconfirmDelete
                    onOk={() => {
                      Message.success('删除成功')
                    }}
                    buttonProps={{
                      size: 'mini',
                    }}
                  >
                  </PopconfirmDelete> */}
                </Space>
              )
            },
          },
        ]}
      >
      </SearchTable>
    </div>
  )
}
