import { Select, Tag } from '@arco-design/web-react'
import { SelectProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import React from 'react'

import { DictOptions } from '../DictSelector'

import { entrepotAPI } from '@/api/admin/entrepot'
import { IconStar } from '@arco-design/web-react/icon'

type EntrepotSelectorProps = SelectProps

let cache: Promise<DictOptions[]>

export function getEntrepotOptions() {
  cache
    = cache
    || entrepotAPI
      .getList({
        pageNum: 1,
        pageSize: 100,
        entrepotType: 1,
      })
      .then(res =>
        res.data?.data?.data?.list.map(item => ({
          label: item.entrepotName,
          value: item.id,
          default: item.defaultFlag
        })),
      )
  return cache
}

export function useEntrepotOptions() {
  const res = useRequest(() => {
    return getEntrepotOptions()
  })
  return res
}

export function EntrepotNameFC(props: { value: string }) {
  const { value } = props
  const { data: options } = useEntrepotOptions()
  return <>{options?.find(item => String(item.value) === String(value))?.label || '-'}</>
}

export function useDefaultEntrepot() {
  return useRequest(() => {
    return entrepotAPI.getList({
      pageNum: 1,
      pageSize: 100,
      entrepotType: 1,
    }).then(r => r.default || r.data?.data?.data?.list?.[0])
  }, {
    manual: false
  })
}

const EntrepotSelector: React.FC<EntrepotSelectorProps> = (props) => {
  const res = useEntrepotOptions()
  return (
    <Select
      placeholder="请选择"
      allowClear={true}
      renderFormat={(option, value) => {
        return option ? (
          <span>
            <IconStar
              style={{
                color: '#f7ba1e',
              }}
            />
            {res.data?.find(o => o.value === value)?.label}
          </span>
        ) : (
          value
        );
      }}
      {...props}
      options={res.data?.map(p => ({
        label: <>{p.default ? <span>
          {p.label} <Tag className="ml-1" bordered={true} size="small" color="green">默认</Tag>
        </span> : p.label}</>,
        value: p.value
      }))}
      loading={res.loading}
    >
    </Select>
  )
}

export default EntrepotSelector
