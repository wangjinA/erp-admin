import { Select } from '@arco-design/web-react'
import { SelectProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import React from 'react'

import { DictOptions } from '../DictSelector'

import { roleAPI } from '@/api/admin/role'

type RoleSelectorProps = SelectProps

let cache: Promise<DictOptions[]>

export function getRoleOptions() {
  cache
    = cache
    || roleAPI.get({
      pageNum: 1,
      pageSize: 100,
    })
      .then(res =>
        res.data.data?.list.map(item => ({
          label: item.roleName,
          value: item.id,
        })),
      )
  return cache
}

export function useRoleOptions() {
  const res = useRequest(() => {
    return getRoleOptions()
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
