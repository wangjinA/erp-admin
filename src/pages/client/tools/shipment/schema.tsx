import { Button, Image } from '@arco-design/web-react'

import { shopStoreAPI } from '@/api/client/shopStore'
import shopeeIcon from '@/assets/shopee.png'
import { SearchTableSchema } from '@/components/SearchTable'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import StatusTag from '@/components/StatusTag'
import { formatDate, getExpiredStatus } from '@/utils'

const StoreListUtilsSchema: SearchTableSchema[] = [
  {
    schema: {
      label: '电商平台',
      field: 'commercePlatform',
      span: 16,
    },
    isSearch: true,
    render(c) {
      return <DictNameFC value={c} dictCode="platform_type" />
    },
  },
  {
    schema: {
      field: 'auth',
      span: 8,
    },
    control: (
      <div className="flex gap-4 justify-end">
        {/* <Button
          type="outline"
          icon={(
            <Image
              style={{
                transform: 'translateY(-2px)',
                marginRight: 2,
              }}
              width={15}
              height={15}
              src={shopeeIcon}
            />
          )}
          onClick={async () => {
            const res = await shopStoreAPI.getAuthLink()
            window.open(res.data.data)
          }}
        >
          Shopee跨境店铺授权
        </Button> */}
        <Button
          type="outline"
          icon={(
            <Image
              style={{
                transform: 'translateY(-2px)',
                marginRight: 2,
              }}
              width={15}
              height={15}
              src={shopeeIcon}
            />
          )}
          onClick={async () => {
            const res = await shopStoreAPI.getAuthLink()
            window.open(res.data.data)
          }}
        >
          Shopee店铺授权
        </Button>
      </div>
    ),
    isSearch: true,
  },
  {
    schema: {
      label: '店铺名称',
      field: 'shopName',
    },
    width: 300,
  },
  {
    schema: {
      label: '授权状态',
      field: 'consumerInfo.status',
    },
    render(e) {
      return <DictNameFC dictCode="shopee_utils_status" value={e}></DictNameFC>
    },
  },
  {
    schema: {
      label: '功能过期时间',
      field: 'consumerInfo.expiredDate',
    },
    render(c) {
      const status = getExpiredStatus(c)
      const color = {
        red: 'red',
        warning: 'orange',
      }
      return c
        ? (
            <span style={{
              color: color[status],
            }}
            >
              {formatDate(c)}
              {status
                ? (
                    <StatusTag
                      size="small"
                      className="ml-2"
                      tagInfos={[
                        {
                          text: '已过期',
                          value: 'red',
                          color: color[status],
                        },
                        {
                          text: '即将到期',
                          value: 'warning',
                          color: color[status],
                        },
                      ]}
                      value={status}
                    >
                    </StatusTag>
                  )
                : null}
            </span>
          )
        : '-'
    },
  },
]

export default StoreListUtilsSchema
