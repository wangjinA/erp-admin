import {
  Button,
  Grid,
  Modal,
  Tree,
  Typography,
} from '@arco-design/web-react'

import useForm from '@arco-design/web-react/es/Form/useForm'

import { IconPlus } from '@arco-design/web-react/icon'

import { useRequest } from 'ahooks'

import { useState } from 'react'

import { MenuTypeTag } from '../menu'
import { useMenuTree } from '../menu/hooks'

import { Role, roleAPI } from '@/api/admin/role'
import CreateWrap, { ActionsContext } from '@/components/CreateWrap'
import FilterForm from '@/components/FilterForm'
import List from '@/components/List'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import {
  FormModalCommonProps,
  ShowFormType,
  ShowFormTypeMap,
} from '@/constants'
import { showMessage } from '@/utils'

function Permission() {
  const allExpandedKeys = ['0-0', '0-1', '0-0-2']
  const [checkedKeys, setCheckedKeys] = useState([])
  const [expandedKeys, setExpandedKeys] = useState(allExpandedKeys)
  const [current, setCurrent] = useState<Role>(null)
  const [formRef] = useForm()
  const menuTreeHandle = useMenuTree()
  const [editCurrent, setEditCurrent] = useState<Role>(null)
  const { data: roles, loading: rolesLoading, run } = useRequest(() => {
    return roleAPI
      .get({
        pageNum: 1,
        pageSize: 30,
      })
      .then((r) => {
        if (!current) {
          setCurrent(r.data.data.list[0])
        }
        return r.data.data.list
      })
  })
  const infoHandle = useRequest(() => {
    if (!current?.id) {
      return null
    }
    return roleAPI.info(current.id).then((r: any) => {
      setCheckedKeys(r.data?.data?.menuIds || [])
    })
  }, {
    refreshDeps: [current?.id],
  })

  const removeHandle = useRequest((id) => {
    return showMessage(() => roleAPI.remove(id), '删除').then(() => {
      if (current?.id === id) {
        setCurrent(roles?.[0])
      }
      run()
    },
    )
  }, {
    manual: true,
  })

  return (
    <CreateWrap formRef={formRef} createRequest={roleAPI.create} updateRequest={roleAPI.update} refreshRequest={run}>
      <ActionsContext.Consumer>
        {({ showType, setShowType, createAction, updateAction }) => (
          <div className="bg-white p-4 pb-6">
            <Grid.Row gutter={[20, 0]}>
              <Grid.Col span={6} className="border-r border-neutral-3 pr-4">
                <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
                  <Typography.Title heading={6} className="mb-0">
                    用户组
                  </Typography.Title>
                  <Button
                    icon={<IconPlus></IconPlus>}
                    type="primary"
                    size="small"
                    className="ml-auto"
                    loading={rolesLoading || infoHandle.loading}
                    onClick={() => {
                      setShowType(ShowFormType.create)
                    }}
                  >
                    添加
                  </Button>
                </Typography.Paragraph>
                <List
                  loading={rolesLoading || infoHandle.loading}
                  data={roles}
                  titleKey="roleName"
                  active={current?.id}
                  onUpdate={(item) => {
                    console.log(item)
                    setEditCurrent(item as any)
                    setShowType(ShowFormType.edit)
                  }}
                  onActive={(item) => {
                    setCurrent(item as any)
                  }}
                  onDelete={item => removeHandle.run(item.id)}
                >
                </List>
              </Grid.Col>

              <Grid.Col span={9} className="border-neutral-3 pr-4">
                <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
                  <Typography.Title heading={6} className="mb-0">
                    功能权限
                  </Typography.Title>
                </Typography.Paragraph>
                <Tree
                  checkable
                  autoExpandParent={false}
                  checkedKeys={checkedKeys}
                  onCheck={(keys, extra) => {
                    console.log(keys, extra)
                    setCheckedKeys(keys)
                  }}
                  fieldNames={{
                    title: 'menuName',
                    key: 'menuId',
                  }}
                  renderTitle={(item: any) => {
                    return (
                      <div>
                        <span className="mr-2">{item.menuName}</span>
                        <MenuTypeTag size="small" menuType={item.menuType}></MenuTypeTag>
                      </div>
                    )
                  }}
                  treeData={menuTreeHandle.data || []}
                >
                </Tree>
                <div className="mt-10 flex justify-center gap-4">
                  <PopconfirmDelete
                    deleteRequest={() => roleAPI.remove(current?.id).then((r) => {
                      run()
                      return r
                    })}
                  >

                  </PopconfirmDelete>
                  <Button
                    type="primary"
                    loading={updateAction.loading}
                    onClick={() => {
                      updateAction.run({
                        ...current,
                        menuIds: checkedKeys,
                      })
                    }}
                  >
                    保存
                  </Button>
                </div>
              </Grid.Col>
            </Grid.Row>
            <Modal
              unmountOnExit={true}
              {...FormModalCommonProps}
              confirmLoading={createAction?.loading}
              onCancel={() => {
                setEditCurrent(null)
                setShowType(null)
                formRef.resetFields()
              }}
              onOk={async () => {
                const formData = await formRef.validate()
                if (showType === ShowFormType.create) {
                  createAction.run(formData)
                }
                else {
                  await updateAction.run(formData)
                  setEditCurrent(null)
                }
              }}
              visible={!!showType}
              title={`${ShowFormTypeMap[showType]}用户组`}
            >
              <FilterForm
                initialValues={editCurrent}
                form={formRef}
                labelLength={8}
                span={24}
                formItemConfigList={[
                  {
                    schema: {
                      label: '用户组名称',
                      span: 12,
                      field: 'roleName',
                      required: true,
                    },
                    control: 'input',
                  },
                ]}
              >
              </FilterForm>
            </Modal>
          </div>
        )}
      </ActionsContext.Consumer>
    </CreateWrap>
  )
}

export default Permission
