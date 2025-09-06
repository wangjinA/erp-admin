import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'

interface CountdownProps {
  targetTime: string | number | Date // 目标时间
  onComplete?: () => void // 倒计时结束回调
  interval?: number // 更新间隔（毫秒）
  format?: (seconds: number) => string // 自定义格式化函数
  showDays?: boolean // 是否显示天数，默认为true
}

// 默认的天时分秒格式化函数
function formatDaysHoursMinutesSeconds(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result = ''

  if (days > 0) {
    result += `${days}天`
  }

  if (hours > 0 || days > 0) {
    result += `${hours.toString().padStart(2, '0')}小时`
  }

  if (minutes > 0 || hours > 0 || days > 0) {
    result += `${minutes.toString().padStart(2, '0')}分`
  }

  result += `${remainingSeconds.toString().padStart(2, '0')}秒`

  return result
}

const Countdown: React.FC<CountdownProps> = ({
  targetTime,
  onComplete,
  interval = 1000,
  format = formatDaysHoursMinutesSeconds,
  showDays = true,
}) => {
  const [timeData, setTimeData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  })
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 计算剩余时间数据
    const calculateTimeData = () => {
      const now = dayjs()
      const target = dayjs(targetTime)
      const diffSeconds = Math.max(0, target.diff(now, 'second'))

      const days = Math.floor(diffSeconds / 86400)
      const hours = Math.floor((diffSeconds % 86400) / 3600)
      const minutes = Math.floor((diffSeconds % 3600) / 60)
      const seconds = diffSeconds % 60

      return {
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: diffSeconds,
      }
    }

    // 初始化
    const initialTimeData = calculateTimeData()
    setTimeData(initialTimeData)

    // 设置定时器
    if (initialTimeData.totalSeconds > 0) {
      timerRef.current = setInterval(() => {
        const newTimeData = calculateTimeData()
        setTimeData(newTimeData)

        if (newTimeData.totalSeconds <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          if (onComplete) {
            onComplete()
          }
        }
      }, interval)
    }

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [targetTime, interval, onComplete])

  // 如果不显示天数，则使用小时来表示所有时间
  if (!showDays) {
    const totalHours = Math.floor(timeData.totalSeconds / 3600)
    const minutes = Math.floor((timeData.totalSeconds % 3600) / 60)
    const seconds = timeData.totalSeconds % 60
    return <>{format(timeData.totalSeconds)}</>
  }

  return <>{format(timeData.totalSeconds)}</>
}

// 导出组件和辅助函数，方便外部使用
export { formatDaysHoursMinutesSeconds }
export default Countdown
