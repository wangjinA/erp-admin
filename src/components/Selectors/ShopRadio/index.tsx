import { Button, Radio, Select, SelectProps, Spin } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import React from 'react'

import { shopStoreAPI } from '@/api/client/shopStore'

// value为 shopStoreAPI.getList的返回类型
const cache: Record<string, ReturnType<typeof shopStoreAPI.getList>> = {}

export function useShopOptions(type = 'default-test') {
  const res = useRequest(() => {
    cache[type] = cache[type] || shopStoreAPI.getList({
      pageNum: 1,
      pageSize: 50,
    })
    return cache[type].then(r => r.data.data.list.map(item => ({
      label: item.shopName,
      value: item.platformShopId,
    })))
  })
  return res
}

export default (props) => {
  const res = useShopOptions()
  return res.loading
    ? (
        <Spin></Spin>
      )
    : res.data?.length
      ? (
          <Radio.Group {...props}>
            {res.data.filter(o => o.label).map((item) => {
              return (
                <Radio className="pl-0" key={item.value} value={item.value}>
                  {({ checked }) => {
                    return (
                      <Button
                        tabIndex={-1}
                        key={item.value}
                        type={checked ? 'primary' : 'default'}
                      >
                        {item.label}
                      </Button>
                    )
                  }}
                </Radio>
              )
            })}
          </Radio.Group>
        )
      : (
          <>-</>
        )
}

export function ShopNameFC(props: { value: number }) {
  const { value } = props
  const { data: options } = useShopOptions()
  return <>{options?.find(item => item.value === value)?.label || '-'}</>
}

export function ShopSelector(props: SelectProps) {
  const { data: options, loading } = useShopOptions()
  return (
    <Select placeholder="请选择店铺" loading={loading} allowClear={true} options={options} {...props} />
  )
}
