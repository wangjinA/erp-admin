import { DictChild, dictChildAPI } from '@/api/admin/dict';
import { Select } from '@arco-design/web-react';
import { SelectProps } from '@arco-design/web-react/lib';
import { useRequest } from 'ahooks';
import React, { useState } from 'react';

type DictSelectorProps = SelectProps & {
  dictCode: string;
};

export interface DictOptions {
  label: string;
  value: string;
}

export function useDictOptions(
  params: Pick<DictChild, 'dictCode' | 'displayName'>
) {
  const { dictCode, displayName } = params;
  const res = useRequest(
    async () => {
      if (!dictCode) {
        return [];
      }
      const params: any = {
        dictCode,
        pageSize: 100,
        pageNum: 1,
      };
      if (displayName?.trim()) {
        params.displayName = displayName;
      }
      const res = await dictChildAPI.getList(params);
      return (
        res.data.data?.list.map((item) => ({
          label: item.displayName,
          value: item.dictValue,
        })) || []
      );
    },
    {
      refreshDeps: [dictCode],
    }
  );
  return res;
}

const DictSelector: React.FC<DictSelectorProps> = (props) => {
  const { dictCode, ...selectProps } = props;
  const [searchVal, setSearchVal] = useState<string>();
  const { data, loading } = useDictOptions({
    dictCode,
    displayName: searchVal,
  });
  return (
    <Select
      placeholder="请选择"
      {...selectProps}
      loading={loading}
      options={data}
    ></Select>
  );
};

export default DictSelector;
