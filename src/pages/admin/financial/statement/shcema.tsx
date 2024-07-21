import { SearchTableSchema } from '@/components/SearchTable';

export const FinancialSchema: SearchTableSchema[] = [
  { schema: { label: '客户名称', field: '0' }, width: 100, isSearch:true },
  { schema: { label: '业务日期', field: '1' }, width: 100, isSearch:true },
  { schema: { label: '内部单号', field: '2' }, width: 100, isSearch:true },
  { schema: { label: '转单号码', field: '3' }, width: 100, isSearch:true },
  { schema: { label: '目的地', field: '4' }, width: 100, isSearch:true },
  { schema: { label: '快递类别', field: '5' }, width: 100, isSearch:true },
  { schema: { label: '重量', field: '6' }, width: 100, isSearch:true },
  { schema: { label: '件数', field: '7' }, width: 100, isSearch:true },
  { schema: { label: '收件人', field: '8' }, width: 100, isSearch:true },
  { schema: { label: '收件电话', field: '9' }, width: 100, isSearch:true },
  { schema: { label: '收件地址', field: '10' }, width: 100, isSearch:true },
  { schema: { label: '物品描述', field: '11' }, width: 100, isSearch:true },
  { schema: { label: '代收货款', field: '12' }, width: 100, isSearch:true },
  { schema: { label: '运費(RMB)', field: '13' }, width: 100, isSearch:true },
  { schema: { label: '派送費（台币）', field: '14' }, width: 100, isSearch:true },
  { schema: { label: '贴单费', field: '15' }, width: 100, isSearch:true },
];