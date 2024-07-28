import { entrepotAPI } from '@/api/admin/entrepot';
import { Select } from '@arco-design/web-react';
import { SelectProps } from '@arco-design/web-react/lib';
import { useRequest } from 'ahooks';
import React from 'react';
import { DictOptions } from '../DictSelector';

type EntrepotSelectorProps = SelectProps;

let cache: Promise<DictOptions[]>;

export function getEntrepotOptions() {
  cache =
    cache ||
    entrepotAPI
      .getList({
        pageNum: 1,
        pageSize: 100,
        entrepotType: 1,
      })
      .then((res) =>
        res.data.data?.list.map((item) => ({
          label: item.entrepotName,
          value: item.id,
        }))
      );
  return cache;
}

export function useEntrepotOptions() {
  const res = useRequest(() => {
    return getEntrepotOptions();
  });
  return res;
}

const EntrepotSelector: React.FC<EntrepotSelectorProps> = (props) => {
  const res = useEntrepotOptions();
  return (
    <Select
      placeholder="请选择"
      {...props}
      options={res.data}
      loading={res.loading}
    ></Select>
  );
};

export default EntrepotSelector;
