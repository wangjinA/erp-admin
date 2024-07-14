import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
export function getQueryStr(data = {}) {
  return Object.entries<any>((data)).reduce((pre, [key, value]) => {
    if (['', null, undefined].includes(value)) {
      return pre;
    }
    const encodeValue = JSON.stringify(value);
    if (!pre) {
      return `?${key}=${encodeURIComponent(encodeValue)}`;
    }
    return `${pre}&${key}=${encodeURIComponent(encodeValue)}`;

  }, '');
}
export function getQueryData(queryStr = location.search.slice(1)) {
  if (!queryStr) {
    return {};
  }
  const queryArr = queryStr.split('&');
  const result = {};
  for (const query of queryArr) {
    const [key, value] = query.split('=');
    try {
      result[key] = JSON.parse(decodeURIComponent(value));
    } catch {
      result[key] = value;
    }
  }
  return result;
}

const cacheMap = new Map<string, any>();
export function useSearchParam<T>(initValue: T, cacheId?: string) {
  const history = useHistory();
  const [value, setValue] = useState<T>({
    ...initValue,
    ...cacheMap.get(cacheId),
    ...getQueryData(),
  });

  useEffect(() => {
    const queryStr = getQueryStr(value);
    history.replace({ search: queryStr });
    cacheMap.set(cacheId, value);
  }, [value]);

  const resetParams = (val?: T) => {
    const resetValue = val || initValue;
    const search = getQueryStr(resetValue);
    history.replace({ search });
    setValue(resetValue);
    return resetValue;
  };

  return {
    value,
    setValue,
    resetParams,
  };
}
