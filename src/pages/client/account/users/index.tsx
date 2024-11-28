import { Avatar, Image, Message, Switch } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { userAPI } from '@/api/client/user'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { WhetherOptions } from '@/constants'
import { showMessage } from '@/utils'

export default () => {
  const [current, setCurrent] = useState<any>()
  const ref = React.useRef<SearchTableRef>()

  const { run: changeEnable, loading } = useRequest(
    async ({ id, enable }: {
      id: any
      enable: number
    }) => {
      await showMessage(() => userAPI.enableUser({
        id,
        enable,
      }), '切换')
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
        getListRequest={userAPI.userList}
        createRequest={userAPI.insertUser}
        removeRequest={userAPI.removeUser}
        updateRequest={userAPI.updateUser}
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
                <Avatar>
                  <Image
                    alt="avatar"
                    src={col}
                  />
                </Avatar>
              )
            },
            control: 'upload',
            controlProps: {
              limit: 1,
            },
            isCreate: true,
          },
          {
            schema: { label: '是否为管理员', field: 'isAdmin' },
            render(col, row) {
              return (
                <Switch
                  onClick={() => {
                    Message.warning({
                      content: '管理员不可取消',
                      duration: 2000,
                    })
                  }}
                  checked={!!col}
                  checkedText="是"
                  uncheckedText="否"
                >
                </Switch>
              )
            },
            control: 'select',
            controlProps: {
              options: WhetherOptions,
            },
          },
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
            schema: { label: '用户组', field: 'roleIds' },
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
            render(col, row) {
              return (
                <Switch
                  defaultChecked={!col}
                  checkedText="启用"
                  uncheckedText="禁用"
                  loading={loading}
                  onChange={(e) => {
                    changeEnable({
                      id: row.id,
                      enable: Number(!e),
                    })
                  }}
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
