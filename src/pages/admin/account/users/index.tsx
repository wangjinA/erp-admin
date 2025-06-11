import { Switch, Tag } from '@arco-design/web-react'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import { userAPI } from '@/api/admin/user'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { RoleNameFC } from '@/components/Selectors/RoleSelector'
import UserAvatar from '@/components/UserAvatar'
import { WhetherOptions } from '@/constants'
import { GlobalState } from '@/store'

export default function Users() {
  const [current, setCurrent] = useState<any>()
  const ref = React.useRef<SearchTableRef>()
  const { userInfo } = useSelector((state: GlobalState) => state)

  // const { run, loading } = useRequest(
  //   async (row) => {
  //     await showModal({
  //       content: '确定取消？',
  //       okButtonProps: {
  //         status: 'warning',
  //       },
  //     })
  //     setCurrent(row)
  //     await showMessage(() =>
  //       expressAPI.cancelReject(row.id),
  //     )
  //     ref.current.refreshSearchTable()
  //   },
  //   {
  //     manual: true,
  //   },
  // )

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
        initialValues={{
          // isLogistics: 1,
        }}
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
            schema: { label: '姓名', field: 'userName', required: true },
            isCreate: true,
            isSearch: true,
          },
          // {
          //   schema: { label: '角色', field: 'roleName' },
          // },
          {
            schema: { label: '登录账号', field: 'userLoginAccount', required: true },
            isCreate: true,
            isSearch: true,
          },
          {
            schema: { label: '密码', field: 'userPassword', required: true },
            isCreate: true,
            hideTable: true,
            controlProps: {
              type: 'password',
            },
          },
          {
            schema: { label: '用户组', field: 'roleIdList', required: true },
            isCreate: true,
            control: 'role',
            controlProps: {
              mode: 'multiple',
            },
            render(c) {
              return (
                <div className="flex gap-1">
                  {c.map(o => <Tag color="blue" key={o}><RoleNameFC value={o}></RoleNameFC></Tag>)}
                </div>
              )
            },
          },
          {
            schema: { label: '电话', field: 'telephone' },
            isCreate: true,
            isSearch: true,
          },
          ...(userInfo?.isAdmin
            ? [{
                schema: { label: '物流主账号', field: 'isLogistics', required: true },
                isCreate: true,
                isSearch: true,
                control: 'radio',
                controlProps: {
                  options: WhetherOptions,
                },
                render(col) {
                  return (
                    <Tag color={col ? 'green' : 'gray'}>
                      {col ? '是' : '否'}
                    </Tag>
                  )
                },
              }]
            : []) as any,
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
