import { SearchTableSchema } from '@/components/SearchTable';

export const FinancialSchema: SearchTableSchema[] = [
  {
    schema: { label: '客户名', field: 'name' },
    width: 100,
    isSearch: true,
    isCreate: true,
  },
  {
    schema: { label: '备注集合', field: 'values' },
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
    schema: { label: '空运费', field: 'airFreight' },
    width: 100,
    control: 'number',
    isSearch: true,
    isCreate: true,
  },
  {
    schema: { label: '海快费', field: 'seaFreight' },
    width: 100,
    control: 'number',
    isSearch: true,
    isCreate: true,
  },
  {
    schema: { label: '派件费（线下）', field: 'paijian' },
    width: 100,
    control: 'number',
    isSearch: true,
    isCreate: true,
  },
  {
    schema: { label: '交店费（线上）', field: 'jindian' },
    width: 100,
    control: 'number',
    isSearch: true,
    isCreate: true,
  },
  {
    schema: { label: '汇率', field: 'huilv' },
    width: 100,
    control: 'number',
    isSearch: true,
    isCreate: true,
  },
  {
    schema: { label: '修改时间', field: 'updateTime' },
    width: 150,
  },
];
