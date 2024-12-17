import {
  Button,
  Grid,
  Message,
  Modal,
  Space,
  Spin,
  Tag,
  Transfer,
  Tree,
} from '@arco-design/web-react'

import useForm from '@arco-design/web-react/es/Form/useForm'

import { IconPlus } from '@arco-design/web-react/icon'

import { useRequest } from 'ahooks'

import { useState } from 'react'

import { useSelector } from 'react-redux'

import { useClientMenuTree } from '../../account/menu/hooks'
import { MenuTypeTag } from '../menu'

import { tenantryUserAPI } from '@/api/admin/tenantry'
import { Role, roleAPI } from '@/api/client/role'
import CreateWrap, { ActionsContext } from '@/components/CreateWrap'
import FilterForm from '@/components/FilterForm'
import List from '@/components/List'
import Title from '@/components/Title'
import {
  FormModalCommonProps,
  ShowFormType,
  ShowFormTypeMap,
} from '@/constants'
import { GlobalState } from '@/store'
import { showMessage } from '@/utils'

function Permission() {
  const allExpandedKeys = ['0-0', '0-1', '0-0-2']
  const [checkedKeys, setCheckedKeys] = useState([])
  const [expandedKeys, setExpandedKeys] = useState(allExpandedKeys)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [current, setCurrent] = useState<Role>(null)
  const [addUserVisible, setAddUserVisible] = useState(false)
  const [editCurrent, setEditCurrent] = useState(null)
  const [addUserLoading, setAddUserLoading] = useState(false)
  const [formRef] = useForm()
  const { clientMenuList } = useSelector((state: GlobalState) => state)

  const menuTreeHandle = useClientMenuTree()
  // 获取用户组详情
  const infoHandle = useRequest((id) => {
    if (!id) {
      return
    }
    return roleAPI.info(id).then((r: any) => {
      setCheckedKeys(r.data?.data?.menuIds || [])
      setCurrent(r.data.data)
      setSelectedKeys(r.data.data?.roleUserInfoVOList?.map(item => item.userId) || [])
    })
  }, {
    manual: true,
  })

  console.log(selectedKeys)

  // 获取用户组下的用户
  const roleUsersHandle = useRequest(() => {
    if (!addUserVisible) {
      return
    }
    return tenantryUserAPI.getDPList({
      pageNum: 1,
      pageSize: 30,
    }).then((r: any) => {
      return r.data.data
    })
  }, {
    refreshDeps: [current?.id, addUserVisible],
  })

  // 获取用户组列表
  const { data: roles, loading: rolesLoading, run } = useRequest(() => {
    return roleAPI
      .get({
        pageNum: 1,
        pageSize: 30,
      })
      .then((r) => {
        const first = r.data.data.list[0]
        if (!current) {
          setCurrent(first)
          infoHandle.run(first?.id)
          setSelectedKeys(first?.roleUserInfoVOList?.map(item => item.userId) || [])
        }
        return r.data.data.list
      })
  })

  return (
    <CreateWrap formRef={formRef} createRequest={roleAPI.create} updateRequest={roleAPI.saveRoleMenuByAdmin} refreshRequest={run}>
      <ActionsContext.Consumer>
        {({ showType, setShowType, createAction, updateAction }) => (
          <div className="bg-white p-4 h-[var(--syb-content-height)] test-1">
            <Grid.Row gutter={[20, 0]} className="h-full">
              <Grid.Col span={6} className="overflow-y-auto h-full border-r border-neutral-3 pr-4">
                <Title title="用户组">
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
                </Title>
                <List
                  loading={rolesLoading || infoHandle.loading}
                  data={roles?.map(item => ({
                    name: item.roleName,
                    id: item.id,
                  }))}
                  active={current?.id}
                  onActive={(item) => {
                    infoHandle.run(item.id)
                  }}
                  onUpdate={(item) => {
                    setEditCurrent(item)
                    setShowType(ShowFormType.edit)
                    // showMessage(() => roleAPI.update(item), '修改').then(() => {
                    //   run()
                    // })
                  }}
                  onDelete={item => showMessage(() => roleAPI.remove(item.id), '删除').then(() => {
                    if (current?.id === item.id) {
                      setCurrent(roles?.[0])
                    }
                    run()
                  })}
                >
                </List>
              </Grid.Col>

              <Grid.Col span={9} className="overflow-y-auto h-full border-r border-neutral-3 pr-4 flex flex-col">
                <Title title="功能权限" className="mt-0.5"></Title>
                <div className="flex overflow-y-auto">
                  <Tree
                    checkable
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
                </div>
                <div className="mt-10 gap-4 flex justify-end">
                  <Button
                    type="primary"
                    loading={updateAction.loading}
                    onClick={() => {
                      updateAction.run({
                        roleId: current?.id,
                        menuIdList: checkedKeys,
                        // roleId: number
                        // menuIdList: number[]
                      })
                    }}
                  >
                    保存
                  </Button>
                </div>
              </Grid.Col>
              <Grid.Col span={9} className="overflow-y-auto h-full">
                <Title title="成员列表" className="mt-0.5"></Title>
                <Space size={[16, 16]}>
                  {
                    current?.roleUserInfoVOList?.map(item => (
                      <Tag key={item.userId} checkable={true} color="arcoblue" checked={true}>
                        {item.userName}
                      </Tag>
                    ))
                  }
                </Space>
                <Button
                  type="primary"
                  size="small"
                  loading={roleUsersHandle.loading}
                  icon={<IconPlus></IconPlus>}
                  onClick={() => {
                    setAddUserVisible(true)
                  }}
                >
                  添加
                </Button>
              </Grid.Col>
            </Grid.Row>
            <Modal
              {...FormModalCommonProps}
              confirmLoading={createAction?.loading}
              onCancel={() => {
                setShowType(null)
                formRef.resetFields()
              }}
              onOk={async () => {
                const formData = await formRef.validate()
                if (showType === ShowFormType.create) {
                  createAction.run(formData)
                }
                else {
                  // await updateEntrepot({
                  //   ...formData,
                  //   id: activeEntrepot.id,
                  // });
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
            <Modal
              style={{
                width: '700px',
              }}
              unmountOnExit={true}
              confirmLoading={addUserLoading}
              onCancel={() => {
                setAddUserVisible(false)
              }}
              onOk={() => {
                console.log(selectedKeys.every(id => current.roleUserInfoVOList?.some(item => item.userId === id)))

                if (selectedKeys.length && selectedKeys.every(id => current.roleUserInfoVOList?.some(item => item.userId === id))) {
                  Message.info('暂无变更')
                  return null
                }
                setAddUserLoading(true)
                return showMessage(() => roleAPI
                  .saveRoleUserByAdmin({
                    roleId: current.id,
                    userIdList: selectedKeys,
                  })).then(() => {
                  infoHandle.run(current.id)
                  setAddUserVisible(false)
                })
                  .finally(() => {
                    setAddUserLoading(false)
                  })
              }}
              visible={addUserVisible}
              title={`编辑 ${current?.roleName} 成员`}
            >
              <Spin loading={roleUsersHandle.loading} className="flex justify-center">
                <Transfer
                  simple={{ retainSelectedItems: true }}
                  dataSource={roleUsersHandle.data?.list.map(item => ({
                    key: item.id,
                    value: item.userLoginAccount,
                  })) || []}
                  targetKeys={selectedKeys || []}
                  // targetKeys={current?.roleUserInfoVOList?.map(item => item.userId as any)}
                  onChange={(e) => {
                    setSelectedKeys(e)
                  }}
                  titleTexts={['用户列表', '已添加']}
                />
              </Spin>
            </Modal>
          </div>
        )}
      </ActionsContext.Consumer>
    </CreateWrap>
  )
}

export default Permission
