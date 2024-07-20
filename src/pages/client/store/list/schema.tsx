import { CreateFormItemType } from '@/components/CreateFormItem';
import PlatformRadio from '@/components/Selectors/PlatformRadio';
import { Button } from '@arco-design/web-react';

const StoreListSchema: CreateFormItemType[] = [
  {
    schema: {
      label: '电商平台',
      field: 'platform_type',
      span: 18
    },
    control: <PlatformRadio></PlatformRadio>
  },
  {
    schema: {
      label: '',
      field: 'auth',
      span: 6
    },
    control: (
      <>
        <Button>Shopee跨境店铺授权</Button>
        <Button>Shopee本土店铺授权</Button>
      </>
    ),
  },
  
];

export default StoreListSchema;
