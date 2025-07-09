import { Tag, Typography } from '@arco-design/web-react'
import { omit } from 'lodash'
import React from 'react'
import { tenantryUserAPI } from '@/api/admin/tenantry'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { ShowFormType } from '@/constants'
import Remark from '@/components/Remark'

export default function Member() {
  const ref = React.useRef<SearchTableRef>()

  return (
    <div className="p-4 bg-white">
      <SearchTable
        showActions={false}
        ref={ref}
        name="用户管理"
        getListRequest={tenantryUserAPI.listByCurrentUser}
        requestQueryTransform={params => ({
          ...omit(params, ['applyTime', 'rejectionTime']),
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
            schema: { label: '用户编号', field: 'tenantryNo', required: true },
            isSearch: true,
            render(c) {
              return <Typography.Text copyable><Tag color="blue">{c}</Tag></Typography.Text>
            },
          },
          {
            schema: { label: '备注', field: 'logisticsRemark' },
            isSearch: true,
            render(c, row) {
              return <Remark value={c} onChange={(v) => {
                return tenantryUserAPI.setLogisticsRemark({
                  id: row.id,
                  logisticsRemark: v,
                }).then(r =>{
                  ref.current.refreshSearchTable();
                  return r;
                })
              }}></Remark>
            },
          },
          {
            schema: { label: '姓名', field: 'userName', required: true },
            isSearch: true,
          },
          // {
          //   schema: { label: '角色', field: 'roleName' },
          // },
          {
            schema: { label: '登录账号', field: 'userLoginAccount', required: true },
            isSearch: true,
          },
          {
            schema: { label: '密码', field: 'userPassword', required: true },
            hideTable: true,
            controlProps: {
              type: 'password',
            },
            dynamicHandle({ showType }) {
              return {
                controlProps: {
                  required: showType === ShowFormType.create,
                  type: 'password',
                  placeholder: showType === ShowFormType.create ? '请输入密码' : '不修改请留空',
                },
              }
            },
          },
        ]}
      >
      </SearchTable>
    </div>
  )
}
