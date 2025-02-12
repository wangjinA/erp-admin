import { useRequest } from 'ahooks'

import { entrepotAPI } from '@/api/admin/entrepot'

export default (props: {
  entrepotId: any
}) => {
  const { entrepotId } = props
  // 获取用户组详情
  const infoHandle = useRequest(() => {
    if (!entrepotId) {
      return
    }
    return entrepotAPI.users({
      entrepotId,
    }).then((r: any) => {
    })
  })
  return (
    <div>
      {
        // current?.systemAcquiesce === 1 && current?.backStatus
        //   ? (
        //       <Result
        //         className="mt-20"
        //         status="success"
        //         title="全部店铺用户"
        //         subTitle="无法编辑，默认用户拥有的菜单权限"
        //       >
        //       </Result>
        //     )
        //   : (
        //       <>
        //         <Space size={[10]} wrap>
        //           {
        //             current?.roleUserInfoVOList?.map(item => (
        //               <Tag key={item.userId} checkable={true} color="arcoblue" checked={true}>
        //                 {item.userName}
        //               </Tag>
        //             ))
        //           }
        //           <Button
        //             type="primary"
        //             size="small"
        //             loading={roleUsersHandle.loading}
        //             icon={<IconPlus></IconPlus>}
        //             onClick={() => {
        //               setSelectedKeys(current?.roleUserInfoVOList?.map(item => item.userId) || [])
        //               setAddUserVisible(true)
        //             }}
        //           >
        //             添加
        //           </Button>
        //         </Space>
        //       </>
        //     )
      }
    </div>
  )
}
