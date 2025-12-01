import { Button, Image, Tag } from '@arco-design/web-react'

import { shopStoreAPI } from '@/api/client/shopStore'
import shopeeIcon from '@/assets/shopee.png'
import Remark from '@/components/Remark'
import { SearchTableSchema } from '@/components/SearchTable'
import { DictNameFC } from '@/components/Selectors/DictSelector'

function getStoreListSchema(
  refresh?: () => void,
): SearchTableSchema[] {
  return [
    {
      schema: {
        label: '电商平台',
        field: 'commercePlatform',
      },
      control: 'dictSelector',
      controlProps: {
        dictCode: 'platform_type',
      },
      render(c) {
        return <DictNameFC value={c} dictCode="platform_type" />
      },
    },
    {
      schema: {
        label: '店铺名称',
        field: 'shopName',
      },
      width: 250,
      isSearch: true,
    },
    // {
    //   schema: {
    //     label: '店铺别名',
    //     field: '',
    //   }
    // },
    {
      schema: {
        label: '地区',
        field: 'region',
      },
      render(c, row) {
        return (
          <div>
            <DictNameFC value={c} dictCode="region" />
            /
            {row.storeType ? '跨境' : '本土'}
          </div>
        )
      },
    },
    // {
    //   schema: {
    //     label: '类型',
    //     field: 'storeType',
    //   },
    //   render(col) {
    //     return col ? '跨境' : '本土'
    //   },
    // },
    {
      schema: {
        label: '授权状态',
        field: 'status',
      },
      render(e, row) {
        if(row.deleteStatus){
          return <Tag color='red'>已删除</Tag>
        }
        if(!row.authTime || !row.authExpireTime) {
          return '授权失败'
        }
        return <Tag color={e === 'NORMAL' ? 'green' : 'red'}><DictNameFC dictCode="accredit_status" value={e}></DictNameFC></Tag>
      },
    },
    {
      schema: {
        label: '授权时间',
        field: 'authTime',
      },
    },
    {
      schema: {
        label: '授权过期时间',
        field: 'authExpireTime',
      },
    },
  ]
}

export default getStoreListSchema
