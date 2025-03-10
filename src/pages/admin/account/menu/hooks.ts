import { useRequest } from 'ahooks'
import { groupBy } from 'lodash'

import { clientMenuAPI, menuAPI } from '@/api/admin/menu'
import { MenuItem } from '@/api/menu'

export const MenuSize = 200

export function listToTree(list: MenuItem[]) {
  const groupedByParentId = groupBy(list, item => item.parentId)

  function buildNodeTree(node) {
    const children = groupedByParentId[node.menuId]
    if (children) {
      // 如果存在子项，递归为子项构建树
      node.children = children.map(buildNodeTree)
    }
    return node
  }

  const res = list
    .filter(item => String(item.parentId) === '0')
    .map(buildNodeTree)
  return res
}

export function useMenuTree() {
  return useRequest(() => {
    return menuAPI.list({
      pageNum: 1,
      pageSize: MenuSize,
    }).then((r) => {
      return listToTree(r.data.data.list)
    })
  })
}

export function useClientMenuTree() {
  return useRequest(() => {
    return clientMenuAPI.list({
      pageNum: 1,
      pageSize: MenuSize,
    }).then((r) => {
      return listToTree(r.data.data.list)
    })
  })
}
