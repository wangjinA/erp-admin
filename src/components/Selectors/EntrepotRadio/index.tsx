import { Button, Radio, Spin } from '@arco-design/web-react'
import React from 'react'

import { useEntrepotOptions } from '../EntrepotSelector'

export default (props) => {
  const res = useEntrepotOptions()
  return res.loading
    ? (
        <Spin></Spin>
      )
    : res.data
      ? (
          <Radio.Group {...props}>
            {[{ label: '全部', value: undefined }, ...res.data].map((item) => {
              return (
                <Radio className="pl-0" key={item.value || 'all'} value={item.value}>
                  {({ checked }) => {
                    return (
                      <Button
                        tabIndex={-1}
                        key={item.value || 'all'}
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
