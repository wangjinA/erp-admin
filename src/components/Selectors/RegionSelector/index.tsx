import { Cascader, CascaderProps, FormItemProps } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import React from 'react'

import { regionAPI } from '@/api/admin/region'

export const regionFormItemProps: FormItemProps = {
  formatter: (value: string) => {
    return value?.split(',')
  },
  normalize: (value: any[]) => {
    return value?.join(',')
  },
}

let cache: any
export default (props: Partial<CascaderProps>) => {
  const { data, loading } = useRequest<any[], []>(() => {
    if (cache) {
      return cache
    }
    return regionAPI.get().then((res) => {
      cache = res.data.data.list[0].children
      return cache
    })
  })

  return (
    <Cascader
      options={data}
      fieldNames={{
        label: 'regionName',
        // value: 'code',
        value: 'regionName',
      }}
      placeholder="请选择"
      loading={loading}
      {...props}
    >
    </Cascader>
  )
}
