import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

export function getQueryStr(data = {}) {
  return Object.entries<any>(data).reduce((pre, [key, value]) => {
    if (['', null, undefined].includes(value)) {
      return pre
    }
    const encodeValue = JSON.stringify(value)
    if (!pre) {
      return `?${key}=${encodeURIComponent(encodeValue)}`
    }
    return `${pre}&${key}=${encodeURIComponent(encodeValue)}`
  }, '')
}
export function getQueryData(queryStr = location.search.slice(1)) {
  if (!queryStr) {
    return {}
  }
  const queryArr = queryStr.split('&')
  const result = {}
  for (const query of queryArr) {
    const [key, value] = query.split('=')
    try {
      result[key] = JSON.parse(decodeURIComponent(value))
    }
    catch {
      result[key] = value
    }
  }
  return result
}

const cacheMap = new Map<string, any>()
export function useSearchParam<T>(params: {
  initialValues: T
  cacheId?: string
  isSearchParams?: boolean
}) {
  const { initialValues, cacheId, isSearchParams = true } = params
  const history = useHistory()
  const [value, setValue] = useState<T>({
    ...initialValues,
    ...(cacheId ? cacheMap.get(cacheId) : {}),
    ...(isSearchParams ? getQueryData() : {}),
  })

  useEffect(() => {
    if (isSearchParams) {
      const queryStr = getQueryStr(value)
      history.replace({ search: queryStr })
    }
    if (cacheId) {
      cacheMap.set(cacheId, value)
    }
  }, [value, isSearchParams, cacheId])

  const resetParams = (val?: T) => {
    const resetValue = val || initialValues
    if (isSearchParams) {
      const search = getQueryStr(resetValue)
      history.replace({ search })
    }
    setValue(resetValue)
    return resetValue
  }

  return {
    value,
    setValue,
    resetParams,
  }
}
