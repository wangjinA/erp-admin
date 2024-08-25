import { TagInfoMap } from '@/components/StatusTag'

const colors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
]

export const StatusColorMap = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  processing: 'arcoblue',
  default: 'gray',
}

export const usableTagInfoMap: TagInfoMap[] = [
  {
    value: 0,
    text: '正常',
    color: 'green',
  },
  {
    value: 1,
    text: '禁用',
    color: 'red',
  },
]
