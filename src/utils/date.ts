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
