import { Form, Select, Switch, Tag } from '@arco-design/web-react'
import { TagProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import { omit } from 'lodash'
import React, { useState } from 'react'

import { MenuTypeOptipns } from '../../account/menu'
import { MenuSize, listToTree } from '../../account/menu/hooks'

import { clientMenuAPI } from '@/api/admin/menu'
import { expressAPI } from '@/api/client/express'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { colors } from '@/constants/statusTag'
import { formatDate, showMessage, showModal, timeArrToObject } from '@/utils'

function SelectParentMenu(props: { menuType: string }) { // 动态选择
  const { menuType, ...otherProps } = props
  const handle = useRequest(async () => {
    const res = await clientMenuAPI.list({
      pageNum: 1,
      pageSize: MenuSize,
      menuType: menuType === 'C' ? 'M' : 'C',
    })
    return res.data.data.list.map(item => ({
      label: item.menuName,
      value: item.menuId,
    }))
  }, {
    refreshDeps: [menuType],
  })
  return <Select placeholder="请选择" options={handle.data || []} loading={handle.loading} {...otherProps}></Select>
}

export function MenuTypeTag({ menuType, size }: { menuType: string, size?: TagProps['size'] }) {
  return <Tag size={size} color={colors[MenuTypeOptipns.findIndex(o => o.value === menuType)]}>{MenuTypeOptipns.find(o => o.value === menuType)?.label}</Tag>
}

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
        majorKey="menuId"
        ref={ref}
        formProps={{
          onChange(e) {
            console.log(e)
          },
        }}
        name="店铺菜单"
        getListRequest={(params) => {
          return clientMenuAPI.list({
            ...params,
            pageNum: 1,
            pageSize: MenuSize,
          }).then((r) => {
            r.data.data.list = listToTree(r.data.data.list)
            r.data.data.pageSize = 1
            r.data.data.total = r.data.data.list.length

            return r
          })
        }}
        createRequest={clientMenuAPI.create}
        updateRequest={clientMenuAPI.update}
        removeRequest={clientMenuAPI.remove}
        requestQueryTransform={params => ({
          ...omit(params, ['applyTime', 'rejectionTime']),
          ...timeArrToObject(params.applyTime, 'applyStartTime', 'applyEndTime'),
          ...timeArrToObject(params.rejectionTime, 'rejectionStartTime', 'rejectionEndTime'),
        })}
        formItemConfigList={[
          {
            schema: { label: '名称', field: 'menuName', required: true },
            isCreate: true,
          },
          {
            schema: { label: '菜单类型', field: 'menuType', required: true },
            isCreate: true,
            control: 'select',
            controlProps: {
              options: MenuTypeOptipns,
            },
            render(c) {
              return <MenuTypeTag menuType={c}></MenuTypeTag>
            },
          },
          {
            schema: { label: '路径', field: 'menuPath' },
            isCreate: true,
          },
          // {
          //   schema: { label: '标识', field: 'menuPerms', required: true },
          //   isCreate: true,
          // },
          {
            schema: {
              label: '父级菜单',
              field: 'parentId',
            },
            isCreate: true,
            hideTable: true,
            showItemHandle(formData) {
              if (!formData?.menuType || formData?.menuType === 'M') {
                return false
              }
              return true
            },
            formItemProps: {
              noStyle: true,
            },
            control: (
              <Form.Item noStyle={true} shouldUpdate={(a, b) => a.menuType !== b.menuType}>
                {(values) => {
                  return (
                    <Form.Item
                      rules={[{
                        required: true,
                        message: '请选择',
                      }]}
                      field="parentId"
                      label={values.menuType === 'C' ? '目录' : '菜单'}
                    >
                      <SelectParentMenu menuType={values.menuType}></SelectParentMenu>
                    </Form.Item>
                  )
                }}
              </Form.Item>
            ),
          },
          {
            schema: { label: '创建时间', field: 'createTime' },
            render(c) {
              return formatDate(c)
            },
          },
          {
            schema: { label: '修改时间', field: 'updateTime' },
            render(c) {
              return formatDate(c)
            },
          },
          {
            schema: { label: '状态', field: 'menuStatus' },
            render(col, row) {
              return (
                <Switch
                  defaultChecked={col === '0'}
                  type="line"
                  checkedText="启用"
                  uncheckedText="禁用"
                  onChange={(e) => {
                    showMessage(() =>
                      clientMenuAPI.update({
                        ...(omit(row, 'children') as any),
                        menuStatus: e ? '0' : '1',
                      }))
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
