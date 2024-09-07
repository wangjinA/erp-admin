import { TagInfoMap } from '@/components/StatusTag'

export const colors = [
  'red',
  'green',
  'blue',
  'orangered',
  'lime',
  'gold',
  'cyan',
  'orange',
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
