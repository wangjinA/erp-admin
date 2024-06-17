import React from 'react';
import { Cascader } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { regionAPI } from '@/api/region';
let cache: any;
export default () => {
  const { data, loading } = useRequest<any[], []>(() => {
    if (cache) {
      return cache;
    }
    return regionAPI.get().then((res) => {
      cache = res.data.data.list[0].children;
      return cache;
    });
  });

  return (
    <Cascader
      options={data}
      fieldNames={{
        label: 'regionName',
        value: 'code',
      }}
      placeholder="请选择"
      loading={loading}
    ></Cascader>
  );
};
