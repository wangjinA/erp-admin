import { Switch } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { userAPI } from '@/api/admin/user'
import { expressAPI } from '@/api/client/express'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import UserAvatar from '@/components/UserAvatar'
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
        getListRequest={userAPI.list}
        createRequest={userAPI.create}
        removeRequest={userAPI.remove}
        updateRequest={userAPI.update}
        requestQueryTransform={params => ({
          ...omit(params, ['applyTime', 'rejectionTime']),
          // ...timeArrToObject(params.applyTime, 'applyStartTime', 'applyEndTime'),
          // ...timeArrToObject(params.rejectionTime, 'rejectionStartTime', 'rejectionEndTime'),
        })}
        formItemConfigList={[
          {
            schema: { label: '序号', field: 'index' },
            render(col, row, index) {
              return index + 1
            },
          },
          {
            schema: { label: '用户头像', field: 'headImg' },
            render(col) {
              return (
                <UserAvatar
                  src={col}
                />
              )
            },
            control: 'upload',
            controlProps: {
              limit: 1,
            },
            isCreate: true,
          },
          // {
          //   schema: { label: '是否为管理员', field: 'isAdmin' },
          //   render(col) {
          //     return (
          //       // <Badge>
          //       //   是
          //       // </Badge>
          //       <Switch
          //         checked={!!col}
          //         checkedText="是"
          //         uncheckedText="否"
          //       >
          //       </Switch>
          //     )
          //   },
          //   control: 'select',
          //   controlProps: {
          //     options: WhetherOptions,
          //   },
          // },
          {
            schema: { label: '姓名', field: 'userName' },
            isCreate: true,
            isSearch: true,
          },
          {
            schema: { label: '角色', field: 'roleName' },
          },
          {
            schema: { label: '登录账号', field: 'userLoginAccount' },
            isCreate: true,
            isSearch: true,
          },
          {
            schema: { label: '密码', field: 'userPassword' },
            isCreate: true,
            hideTable: true,
            controlProps: {
              type: 'password',
            },
          },
          {
            schema: { label: '用户组', field: 'roleIdList' },
            isCreate: true,
            control: 'role',
            controlProps: {
              mode: 'multiple',
            },
          },
          {
            schema: { label: '电话', field: 'telephone' },
            isCreate: true,
            isSearch: true,
          },
          {
            schema: { label: '状态', field: 'userStatus' },
            render(col) {
              return (
                <Switch
                  checked={!col}
                  checkedText="启用"
                  uncheckedText="禁用"
                >
                </Switch>
              )
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
