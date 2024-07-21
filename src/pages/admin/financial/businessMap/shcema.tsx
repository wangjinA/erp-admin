import { SearchTableSchema } from '@/components/SearchTable';
import { HideClass } from '@/constants/style';
import dayjs from 'dayjs';

export const BusinessmapSchema: SearchTableSchema[] = [
  {
    schema: { label: '名称', field: 'name' },
    width: 150,
    isCreate: true,
    isSearch: true,
  },
  {
    schema: { label: '对应数值', field: 'values' },
    width: 150,
    render(c) {
      return c.toString();
    },
    isCreate: true,
    controlProps: {
      mode: 'multiple',
      allowCreate: true,
    },
    control: 'select',
  },
  {
    schema: { label: '更新时间', field: 'updateTime' },
    width: 150,
    formItemProps:{
      initialValue: Date.now(),
      className: HideClass,
    },
    isCreate: true,
    render(r){
      return dayjs(r).format('YYYY-MM-DD HH:mm')
    }
  },
];
