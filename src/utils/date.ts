import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export function getRemainingTime(date, name) {
  const now = dayjs()
  const diff = dayjs(date).diff(now)
  const duration = dayjs.duration(diff)

  const days = Math.floor(duration.asDays())
  const hours = duration.hours()
  const minutes = duration.minutes()
  if (diff <= 0) {
    return {
      expired: true,
      dateStr: '逾期',
    }
  }
  else {
    return {
      expired: false,
      dateStr: `剩余${days}天${hours}小时${minutes}分钟${name}`,
    }
  }
}

export function secondsToDateString(seconds = 0) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result = ''

  if (hours > 0) {
    result += `${hours}小时`
  }

  if (minutes > 0) {
    result += `${minutes}分钟`
  }

  if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
    result += `${remainingSeconds}秒`
  }

  return result
}
