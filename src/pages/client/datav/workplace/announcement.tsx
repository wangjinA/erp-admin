import { Card, Link, Skeleton, Tag, Typography } from '@arco-design/web-react'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

import locale from './locale'
import styles from './style/announcement.module.less'

import { Domain } from '@/api'
import useI18n from '@/utils/useI18n'

function Announcement() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const t = useI18n(locale)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setData([
        {
          type: 'activity',
          key: '1',
          content: '最新优惠活动，送1000元优惠券',
        },
        {
          type: 'info',
          key: '2',
          content: '平台持续招商中，欢迎入驻！',
        },
        {
          type: 'notice',
          key: '3',
          content: '新功能上线，敬请期待！',
        },
      ])
      setLoading(false)
    }, 1200)
  }, [])

  function getTagColor(type) {
    switch (type) {
      case 'activity':
        return 'orangered'
      case 'info':
        return 'cyan'
      case 'notice':
        return 'arcoblue'
      default:
        return 'arcoblue'
    }
  }

  return (
    <Card>
      <div className="flex justify-between mb-4">
        <Typography.Title heading={6} className="!mb-0">
          {t['workplace.announcement']}
        </Typography.Title>
        <Link>{t['workplace.seeMore']}</Link>
      </div>
      <Skeleton loading={loading} text={{ rows: 5, width: '100%' }} animation>
        <div>
          {data.map(d => (
            <Link
              key={d.key}
              className={classNames(styles.item)}
              onClick={() => {
                window.open(Domain)
              }}
            >
              <Tag color={getTagColor(d.type)} size="small">
                {t[`workplace.${d.type}`]}
              </Tag>
              <span className={styles.link}>{d.content}</span>
            </Link>
          ))}
        </div>
      </Skeleton>
    </Card>
  )
}

export default Announcement
