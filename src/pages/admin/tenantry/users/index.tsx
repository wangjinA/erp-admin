import { useRequest } from 'ahooks'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { tenantryUserAPI } from '@/api/admin/tenantry'
import { expressAPI } from '@/api/client/express'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
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

  return (
    <div className="p-4 bg-white">
      <SearchTable
        ref={ref}
        name="用户管理"
        getListRequest={tenantryUserAPI.getList}
        // createRequest={tenantryUserAPI.create}
        // removeRequest={tenantryUserAPI.remove}
        // updateRequest={tenantryUserAPI.update}
        requestQueryTransform={params => ({
          ...omit(params, ['applyTime', 'rejectionTime']),
          // ...timeArrToObject(params.applyTime, 'applyStartTime', 'applyEndTime'),
          // ...timeArrToObject(params.rejectionTime, 'rejectionStartTime', 'rejectionEndTime'),
        })}
        showActions={false}
        formItemConfigList={[
          {
            schema: { label: '序号', field: 'index' },
            render(col, row, index) {
              return index + 1
            },
          },
          // {
          //   schema: { label: '用户头像', field: 'headImg' },
          //   render(col) {
          //     return (
          //       <UserAvatar
          //         src={col}
          //       />
          //     )
          //   },
          //   control: 'upload',
          //   controlProps: {
          //     limit: 1,
          //   },
          //   isCreate: true,
          // },
          {
            schema: { label: '用户名', field: 'tenantryName' },
            isCreate: true,
            isSearch: true,
          },
          // {
          //   schema: { label: '角色', field: 'roleName' },
          // },
          // {
          //   schema: { label: '登录账号', field: 'userLoginAccount' },
          //   isCreate: true,
          //   isSearch: true,
          // },
          {
            schema: { label: '密码', field: 'userPassword' },
            isCreate: true,
            hideTable: true,
            controlProps: {
              type: 'password',
            },
          },
          // {
          //   schema: { label: '用户组', field: 'roleIdList' },
          //   isCreate: true,
          //   control: 'role',
          //   controlProps: {
          //     mode: 'multiple',
          //   },
          // },
          {
            schema: { label: '电话', field: 'tenantryPhone' },
            isCreate: true,
            isSearch: true,
          },
          {
            schema: { label: '状态', field: 'userStatus' },
            render(col) {
              return col ? '禁用' : '启用'
              // return (
              //   <Switch
              //     checked={!col}
              //     checkedText="启用"
              //     uncheckedText="禁用"
              //   >
              //   </Switch>
              // )
            },
          },
          // {
          //   title: '操作',
          //   dataIndex: 'operator',
          //   render() {
          //     return (
          //       <Space>
          //         <Button
          //           icon={<IconEdit></IconEdit>}
          //           type="primary"
          //           size="mini"
          //         >
          //           编辑
          //         </Button>
          //         <PopconfirmDelete
          //           onOk={() => {
          //             Message.success('删除成功')
          //           }}
          //           buttonProps={{
          //             size: 'mini',
          //           }}
          //         >
          //         </PopconfirmDelete>
          //       </Space>
          //     )
          //   },
          // },
        ]}
      >
      </SearchTable>
    </div>
  )
}
