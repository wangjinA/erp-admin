import { Avatar, Card, Dropdown, Link, Menu, Space, Spin, Typography } from '@arco-design/web-react'
import { IconDelete, IconEdit, IconMore } from '@arco-design/web-react/icon'
import classNames from 'classnames'

import styles from './index.module.less'

interface DataItem {
  id: any
  name: string
  avatar?: string
  description?: string
}

interface ListProps<T> {
  data: (T & DataItem)[]
  active?: any
  rowKey?: string
  loading?: boolean
  onActive?: (row: (T & DataItem)) => void
  onDelete?: (row: (T & DataItem)) => void
  onUpdate?: (row: (T & DataItem)) => void
}

export const DropList = (
  <>
    <Menu.Item key="update">
      <IconEdit />
      <Typography.Text className="ml-2">修改</Typography.Text>

    </Menu.Item>
    <Menu.Item key="delete">
      <IconDelete />
      <Typography.Text className="ml-2">删除</Typography.Text>
    </Menu.Item>
  </>
)

function List<T>(props: ListProps<T>) {
  const { data, active, loading, onUpdate, onDelete, onActive, rowKey = 'id' } = props
  return (
    <Spin className="block" loading={loading}>
      <Space className={styles['syb-list']} direction="vertical" size="small">
        {data?.map(item => (
          <Card
            size="small"
            key={item[rowKey]}
            className={classNames('cursor-pointer', {
              active: item[rowKey] === active,
            })}
            onClick={() => {
              onActive?.(item)
            }}
            hoverable
          >
            <Space
              className="flex items-center justify-between"
            >
              <Space>
                <Avatar
                  style={{
                    backgroundColor: '#165DFF',
                  }}
                  size={28}
                >
                  {item.avatar || item.name[0]}
                </Avatar>
                <Space direction="vertical" size="mini">
                  <Typography.Text className="syb-list-name">{item.name}</Typography.Text>
                  <Typography.Text className="text-sm" type="secondary">{item.description}</Typography.Text>
                </Space>
              </Space>
              <div onClick={(e) => {
                e.stopPropagation()
              }}
              >

                <Dropdown
                  droplist={(
                    <Menu onClickMenuItem={(e) => {
                      console.log(e)
                      if (e === 'update') {
                        onUpdate?.(item)
                      }
                      else if (e === 'delete') {
                        onDelete?.(item)
                      }
                    }}
                    >
                      {DropList}
                    </Menu>
                  )}
                  trigger="click"
                  position="br"
                >
                  <Link>
                    <IconMore />
                  </Link>
                </Dropdown>
              </div>
            </Space>
          </Card>
        ))}
      </Space>
    </Spin>
  )
}
export default List
