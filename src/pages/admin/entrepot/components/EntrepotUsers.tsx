import { Button, Modal, Spin, Transfer } from '@arco-design/web-react'
import { IconPlus } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'

import { useState } from 'react'

import { entrepotAPI } from '@/api/admin/entrepot'
import { userAPI } from '@/api/admin/user'

import { showMessage } from '@/utils'

export default (props: {
  entrepotId: any
}) => {
  const { entrepotId } = props
  const [addUserVisible, setAddUserVisible] = useState(false)
  const [addUserLoading, setAddUserLoading] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([])

  //  const { run, data, loading } = useRequest(
  //     async (row) => {
  //       setCurrent(row)
  //       return tenantryUserAPI.getUserStoreList({ id: row.id }).then(r => r.data.data.list)
  //     },
  //     {
  //       manual: true,
  //     },
  //   )
  const roleUsersHandle = useRequest(() => {
    if (!addUserVisible || roleUsersHandle.data) {
      return roleUsersHandle.data
    }
    return userAPI.list({
      pageNum: 1,
      pageSize: 300,
    }).then((r: any) => {
      return r.data.data
    })
  }, {
    refreshDeps: [addUserVisible],
  })
  return (
    <div>
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
          setAddUserLoading(true)
          return showMessage(() => entrepotAPI
            .allocation({
              entrepotId,
              userIdList: selectedKeys,
            })).then(() => {
            // infoHandle.run(current.id)
            setAddUserVisible(false)
          })
            .finally(() => {
              setAddUserLoading(false)
            })
        }}
        visible={addUserVisible}
        title="添加用户"
      >
        <Spin loading={roleUsersHandle.loading} className="flex justify-center">
          <Transfer
            simple={{ retainSelectedItems: true }}
            dataSource={((roleUsersHandle.data?.list || []) as any[]).toSorted((a, b) =>
              Number(selectedKeys.includes(a.id)) - Number(selectedKeys.includes(b.id)),
            ).map(item => ({
              key: item.id,
              value: item.userLoginAccount,
            })) || []}
            showSearch={true}
            targetKeys={selectedKeys || []}
            // targetKeys={current?.roleUserInfoVOList?.map(item => item.userId as any)}
            onChange={(e) => {
              setSelectedKeys(e)
            }}
            searchPlaceholder="请输入"
            titleTexts={['用户列表', '已添加']}
          />
        </Spin>
      </Modal>
    </div>
  )
}
