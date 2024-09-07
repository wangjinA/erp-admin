// import {
//   Button,
//   DatePicker,
//   Message,
//   Space,
//   Switch,
//   Table,
// } from '@arco-design/web-react'
// import { IconEdit } from '@arco-design/web-react/icon'
// import React from 'react'

// import FilterForm from '@/components/FilterForm'

// import PopconfirmDelete from '@/components/PopconfirmDelete'

// export default () => {
//   return (
//     <div className="p-4 bg-white">
//       <div>
//         <FilterForm
//           span={6}
//           initialValues={{
//             entrepot: '0',
//           }}
//           formItemConfigList={[
//             {
//               schema: {
//                 label: '快递单号',
//                 field: 'deliveryNo',
//               },
//               control: 'input',
//             },
//             {
//               schema: {
//                 label: '操作人',
//                 field: 'operatorName',
//               },
//               control: 'input',
//             },
//             {
//               schema: {
//                 label: '扫码时间',
//                 field: 'scanTime',
//               },
//               control: (props: any) => (
//                 <DatePicker.RangePicker showTime={true} {...props} />
//               ),
//             },
//           ]}
//         >
//         </FilterForm>
//       </div>
//       <Table
//         className="mt-4"
//         columns={[
//           {
//             title: '序号',
//             key: 'index',
//             render(col, row, index) {
//               return index + 1
//             },
//           },
//           {
//             title: '员工姓名',
//             dataIndex: 'employeeName',
//           },
//           {
//             title: '登录账号',
//             dataIndex: 'loginAccount',
//           },
//           {
//             title: '用户组',
//             dataIndex: 'userGroup',
//           },
//           {
//             title: '状态',
//             dataIndex: 'status',
//             render(col) {
//               return (
//                 <Switch
//                   checked={col}
//                   type="line"
//                   checkedText="启用"
//                   uncheckedText="禁用"
//                 >
//                 </Switch>
//               )
//             },
//           },
//           {
//             title: '操作',
//             dataIndex: 'operator',
//             render() {
//               return (
//                 <Space>
//                   <Button
//                     icon={<IconEdit></IconEdit>}
//                     type="primary"
//                     size="mini"
//                   >
//                     编辑
//                   </Button>
//                   <PopconfirmDelete
//                     onOk={() => {
//                       Message.success('删除成功')
//                     }}
//                     buttonProps={{
//                       size: 'mini',
//                     }}
//                   >
//                   </PopconfirmDelete>
//                 </Space>
//               )
//             },
//           },
//         ]}
//         data={[
//           {
//             key: 1,
//             employeeName: '1234567890',
//             loginAccount: '仓库1',
//             userGroup: '备注',
//             status: true,
//           },
//           {
//             key: 2,
//             employeeName: '1234567890',
//             loginAccount: '仓库1',
//             userGroup: '备注',
//             status: false,
//           },
//           {
//             key: 3,
//             employeeName: '1234567890',
//             loginAccount: '仓库1',
//             userGroup: '备注',
//             status: true,
//           },
//         ]}
//       >
//       </Table>
//     </div>
//   )
// }

import { Switch } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { userAPI } from '@/api/admin/user'
import { expressAPI } from '@/api/client/express'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { WhetherOptions } from '@/constants'
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
            render(col, row, index) {
              return index + 1
            },
            control: 'upload',
            isCreate: true,
          },
          {
            schema: { label: '是否为管理员', field: 'isAdmin' },
            render(col, row, index) {
              return index + 1
            },
            control: 'select',
            controlProps: {
              options: WhetherOptions,
            },
            isCreate: true,
          },
          {
            schema: { label: '员工姓名', field: 'employeeName' },
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
            schema: { label: '状态', field: 'status' },
            render(col) {
              return (
                <Switch
                  checked={col}
                  type="line"
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
