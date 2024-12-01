import {
  Button,
  Grid,
  Modal,
  Space,
  Tag,
  Transfer,
  Tree,
} from '@arco-design/web-react'

import useForm from '@arco-design/web-react/es/Form/useForm'

import { IconPlus } from '@arco-design/web-react/icon'

import { useRequest } from 'ahooks'

import { useState } from 'react'

import { useSelector } from 'react-redux'

import { MenuTypeTag } from '../menu'

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

function Permission() {
  const allExpandedKeys = ['0-0', '0-1', '0-0-2']
  const [checkedKeys, setCheckedKeys] = useState([])
  const [expandedKeys, setExpandedKeys] = useState(allExpandedKeys)
  const [current, setCurrent] = useState<Role>(null)
  const [addUserVisible, setAddUserVisible] = useState(false)
  const [formRef] = useForm()
  const { clientMenuList } = useSelector((state: GlobalState) => state)

  const infoHandle = useRequest((id) => {
    if (!id) {
      return
    }
    return roleAPI.info(id).then((r: any) => {
      setCheckedKeys(r.data?.data?.menuIds || [])
      setCurrent(r.data.data)
    })
  }, {
    manual: true,
  })

  const roleUsersHandle = useRequest(() => {
    if (!current?.id || !addUserVisible) {
      return
    }
    return roleAPI.getRoleUsers(current.id).then((r: any) => {
      return r.data.data
    })
  }, {
    refreshDeps: [current?.id, addUserVisible],
  })

  const { data: roles, loading: rolesLoading, run } = useRequest(() => {
    return roleAPI
      .get({
        pageNum: 1,
        pageSize: 30,
      })
      .then((r) => {
        const first = r.data.data.list[0]
        setCurrent(first)
        infoHandle.run(first?.id)
        return r.data.data.list
      })
  })
  return (
    <CreateWrap formRef={formRef} createRequest={roleAPI.create} updateRequest={roleAPI.update} refreshRequest={run}>
      <ActionsContext.Consumer>
        {({ showType, setShowType, createAction, updateAction }) => (
          <div className="bg-white p-4 h-[var(--syb-content-height)] test-1">
            <Grid.Row gutter={[20, 0]} className="h-full">
              <Grid.Col span={6} className="min-h-full border-r border-neutral-3 pr-4">
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
                {/* <Input.Search
              className="mb-4"
              placeholder="请输入仓库名称"
            ></Input.Search> */}
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
                >
                </List>
                {/*
                <List>
                  {roles?.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        infoHandle.run(item.id)
                      }}
                    >
                      <List.Item.Meta
                        style={{ height: 76 }}
                        className={classNames(current?.id === item.id ? 'bg-gray-100 border-b-0' : '', 'hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3 rounded')}
                        avatar={<Avatar>{item.roleName}</Avatar>}
                        title={item.roleName}
                        description="系统分组"
                      >
                      </List.Item.Meta>
                    </div>
                  ))}
                </List> */}
              </Grid.Col>

              <Grid.Col span={9} className="min-h-full border-r border-neutral-3 pr-4">
                {/* <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
                  <Typography.Title heading={6} className="mb-0">
                    功能权限
                  </Typography.Title>
                </Typography.Paragraph> */}
                <Title title="功能权限" className="mt-0.5"></Title>
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
                  treeData={clientMenuList || []}
                >
                </Tree>
                {/* <div className="mt-10 flex justify-center gap-4">
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
                </div> */}
              </Grid.Col>
              <Grid.Col span={9} className="min-h-full">
                <Title title="成员列表" className="mt-0.5"></Title>
                <Space size={[16, 16]}>
                  {
                    current?.roleUserInfoVOList?.map(item => (
                      <Tag checkable={true} color="arcoblue" checked={true}>
                        {item.userName}
                      </Tag>
                    ))
                  }
                </Space>
                <Button
                  className="mt-4"
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
                // initialValues={createInitialValue}
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
              confirmLoading={createAction?.loading}
              onCancel={() => {
                setAddUserVisible(false)
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
              visible={addUserVisible}
              title={`编辑 ${current?.roleName} 成员`}
            >
              <div className="flex justify-center">
                <Transfer
                  dataSource={roleUsersHandle.data?.list.map(item => ({
                    key: item,
                    value: item,
                  }))}
                  defaultTargetKeys={current?.roleUserInfoVOList?.map(item => item.userId as any)}
                  // targetKeys={current?.roleUserInfoVOList?.map(item => item.userId as any)}
                  titleTexts={['用户列表', '已添加']}
                />
              </div>
            </Modal>
          </div>
        )}
      </ActionsContext.Consumer>
    </CreateWrap>
  )
}

export default Permission
