import { Checkbox, Radio, Select } from '@arco-design/web-react'
import { SelectProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'

import { DictChild, dictChildAPI } from '@/api/admin/dict'
import { APIListResponse } from '@/api/type'

type DictSelectorProps = SelectProps & {
  dictCode: string
  type?: 'select' | 'radio' | 'checkbox'
}

export interface DictOptions {
  label: string
  value: any
  default?: boolean
}

const cacheData: Record<
  string,
  Promise<AxiosResponse<APIListResponse<DictChild>>>
> = {}

export function getDictOptions(params: {
  dictCode: string
  displayName?: string
}): Promise<DictOptions[]> {
  const { dictCode, displayName } = params
  const searchParams: any = {
    dictCode,
    pageSize: 100,
    pageNum: 1,
  }
  if (displayName?.trim()) {
    searchParams.displayName = displayName
  }
  cacheData[dictCode]
    = cacheData[dictCode] || dictChildAPI.getList(searchParams)
  return cacheData[dictCode].then(res =>
    res.data.data?.list.map(item => ({
      label: item.displayName,
      value: item.dictValue,
    })),
  )
}
export function useDictOptions(params: {
  dictCode: string
  displayName?: string // 用作搜索
}) {
  const { dictCode } = params
  const res = useRequest(
    async () => {
      return getDictOptions(params)
    },
    {
      refreshDeps: [dictCode],
    },
  )
  return res
}

async function getDictName({
  dictCode,
  value,
}: {
  dictCode: string
  value: any
}) {
  const res = await getDictOptions({
    dictCode,
  })
  return res.find(item => item.value === value)?.label
}

export function useDictName({
  dictCode,
  value,
}: {
  dictCode: string
  value: any
}) {
  const res = useRequest(
    async () => {
      if (!dictCode || !value) {
        return ''
      }
      return getDictName({
        dictCode,
        value,
      })
    },
    {
      refreshDeps: [dictCode, value],
    },
  )
  return res
}

export function DictNameFC({
  dictCode,
  value,
  defaultValue = '-',
}: {
  dictCode: string
  value: any
  defaultValue?: string
}) {
  const { data: name } = useDictName({
    dictCode,
    value,
  })
  return <>{name || defaultValue}</>
}

const DictSelector: React.FC<DictSelectorProps> = (props) => {
  const { dictCode, type, ...selectProps } = props

  const [searchVal, setSearchVal] = useState<string>()
  const { data, loading } = useDictOptions({
    dictCode,
    displayName: searchVal,
  })
  switch (type) {
    case 'radio':
      return (
        <Radio.Group
          {...(selectProps as any)}
          options={data}
          onChange={selectProps.onChange as any}
        >
        </Radio.Group>
      )
    case 'checkbox':
      return (
        <Checkbox.Group
          {...(selectProps as any)}
          options={data}
          onChange={selectProps.onChange as any}
        >
        </Checkbox.Group>
      )
    case 'select':
    default:
      return (
        <Select
          placeholder="请选择"
          allowClear={true}
          {...selectProps}
          loading={loading}
          options={data}
        >
        </Select>
      )
  }
}

export default DictSelector
