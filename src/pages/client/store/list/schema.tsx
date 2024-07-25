import { SearchTableSchema } from '@/components/SearchTable';
import PlatformRadio from '@/components/Selectors/PlatformRadio';
import { Button, Image } from '@arco-design/web-react';
import shopeeIcon from '@/assets/shopee.png';
import { shopStoreAPI } from '@/api/client/shopStore';

const StoreListSchema: SearchTableSchema[] = [
  {
    schema: {
      label: '电商平台',
      field: 'platform_type',
      span: 16,
    },
    control: <PlatformRadio></PlatformRadio>,
    isSearch: true,
  },
  {
    schema: {
      field: 'auth',
      span: 8,
    },
    control: (
      <div className="flex gap-4 justify-end">
        <Button
          type="outline"
          icon={
            <Image
              style={{
                transform: 'translateY(-2px)',
                marginRight: 2
              }}
              width={15}
              height={15}
              src={shopeeIcon}
            />
          }
          onClick={async () => {
            const res = await shopStoreAPI.getAuthLink();
            window.open(res.data.data);
          }}
        >
          Shopee跨境店铺授权
        </Button>
        <Button
          type="outline"
          icon={
            <Image
              style={{
                transform: 'translateY(-2px)',
                marginRight: 2
              }}
              width={15}
              height={15}
              src={shopeeIcon}
            />
          }
          onClick={async () => {
            const res = await shopStoreAPI.getAuthLink();
            window.open(res.data.data);
          }}
        >
          Shopee本土店铺授权
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
  },
  // {
  //   schema: {
  //     label: '店铺别名',
  //     field: '',
  //   }
  // },
  {
    schema: {
      label: '电商平台',
      field: '',
    },
  },
  {
    schema: {
      label: '地区',
      field: '',
    },
  },
  {
    schema: {
      label: '类型',
      field: 'storeType',
    },
    render(col) {
      return col ? '跨境' : '本土';
    },
  },
  {
    schema: {
      label: '授权状态',
      field: '',
    },
  },
  {
    schema: {
      label: '授权时间',
      field: 'authTime',
    },
  },
];

export default StoreListSchema;
