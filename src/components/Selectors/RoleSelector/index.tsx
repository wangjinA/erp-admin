import { Select } from '@arco-design/web-react'
import { SelectProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import React from 'react'

import { DictOptions } from '../DictSelector'

import { roleAPI } from '@/api/admin/role'
import { roleAPI as clientRoleAPI } from '@/api/client/role'
import { isAdmin } from '@/routes'

type RoleSelectorProps = SelectProps

let cache: Promise<DictOptions[]>
let clientCache: Promise<DictOptions[]>

function getRoleOptions() {
  cache
    = cache
    || roleAPI.get({
      pageNum: 1,
      pageSize: 50,
    })
      .then(res =>
        res.data.data?.list.map(item => ({
          label: item.roleName,
          value: item.id,
        })),
      )
  return cache
}

function getClientRoleOptions() {
  clientCache
    = clientCache
    || clientRoleAPI.get({
      pageNum: 1,
      pageSize: 50,
    })
      .then(res =>
        res.data.data?.list.map(item => ({
          label: item.roleName,
          value: item.id,
        })),
      )
  return clientCache
}

export function useRoleOptions() {
  const res = useRequest(() => {
    return isAdmin() ? getRoleOptions() : getClientRoleOptions()
  })
  return res
}

export function RoleNameFC(props: { value: string }) {
  const { value } = props
  const { data: options } = useRoleOptions()
  return <>{options?.find(item => String(item.value) === String(value))?.label}</>
}

const RoleSelector: React.FC<RoleSelectorProps> = (props) => {
  const res = useRoleOptions()
  return (
    <Select
      placeholder="请选择"
      {...props}
      options={res.data}
      loading={res.loading}
    >
    </Select>
  )
}

export default RoleSelector
