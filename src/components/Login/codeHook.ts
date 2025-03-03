import { useLocalStorageState } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { isProd } from '@/utils'

const TIME = isProd() ? 60 : 10

function useCode() {
  const [codeTime, setCodeTime] = useLocalStorageState('registerCodeTime', {
    defaultValue: 0,
  })
  const [currentTime, setCurrentTime] = useState(Date.now())
  const diffTime = useMemo(() => dayjs(currentTime).diff(codeTime, 'second'), [codeTime, currentTime])

  useEffect(() => {
    function tick() {
      if (diffTime < TIME) {
        setCurrentTime(Date.now())
      }
    }
    const timerId = setInterval(tick, 1000)
    return () => clearInterval(timerId)
  }, [codeTime, currentTime])

  return {
    time: TIME - diffTime > 0 ? TIME - diffTime : 0,
    resetTime: () => {
      setCodeTime(Date.now())
      setCurrentTime(Date.now())
    },
  }
}

export default useCode
