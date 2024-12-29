import { Button, Drawer, Space } from '@arco-design/web-react'
import { IconEye } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { tenantryUserAPI } from '@/api/admin/tenantry'
import Remark from '@/components/Remark'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import StoreListSchema from '@/pages/client/store/list/schema'
import { showMessage } from '@/utils'

export default () => {
  const [current, setCurrent] = useState<any>()
  const ref = React.useRef<SearchTableRef>()

  const { run, data, loading } = useRequest(
    async (row) => {
      setCurrent(row)
      return tenantryUserAPI.getUserStoreList({ id: row.id }).then(r => r.data.data.list)
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
          {
            schema: { label: '电话', field: 'tenantryPhone' },
            isCreate: true,
            isSearch: true,
          },
          {
            schema: { label: '备注', field: 'remarks' },
            render(v, row) {
              return (
                <Remark
                  value={v}
                  onChange={(v) => {
                    return showMessage(() => tenantryUserAPI.setRemark({
                      id: row.id,
                      remarks: v,
                    })).then(() => {
                      ref.current.refreshSearchTable()
                    })
                  }}
                >
                </Remark>
              )
            },
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
          {
            schema: {
              label: '操作',
              field: 'operator',
            },
            render(c, row) {
              return (
                <Space>
                  <Button
                    icon={<IconEye></IconEye>}
                    type="primary"
                    size="mini"
                    onClick={() => run(row)}
                  >
                    查看店铺
                  </Button>
                </Space>
              )
            },
          },
        ]}
      >
      </SearchTable>
      <Drawer
        width="75%"
        title={`查看店铺${current?.remarks ? `（${current?.remarks}）` : ''}`}
        visible={Boolean(current)}
        onCancel={() => setCurrent(undefined)}
        onOk={() => setCurrent(undefined)}
        unmountOnExit={true}
      >
        <SearchTable
          showActions={false}
          getListRequest={() => tenantryUserAPI.getUserStoreList({ id: current.id })}
          name="店铺列表"
          formItemConfigList={StoreListSchema.map(item => omit(item, 'isSearch')) as any}
        >
        </SearchTable>
      </Drawer>
    </div>
  )
}
