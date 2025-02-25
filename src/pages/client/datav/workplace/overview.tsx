import {
  Card,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@arco-design/web-react'
import { IconCaretUp } from '@arco-design/web-react/icon'

import axios from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import IconCalendar from './assets/calendar.svg'
import IconComments from './assets/comments.svg'
import IconContent from './assets/content.svg'
import IconIncrease from './assets/increase.svg'
import locale from './locale'
import styles from './style/overview.module.less'

import LatestNews from '@/pages/admin/user/info/latest-news'
import useI18n from '@/utils/useI18n'

const { Row, Col } = Grid

interface StatisticItemType {
  icon?: ReactNode
  title?: ReactNode
  count?: ReactNode
  loading?: boolean
  unit?: ReactNode
}

function StatisticItem(props: StatisticItemType) {
  const { icon, title, count, loading, unit } = props
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <Skeleton loading={loading} text={{ rows: 2, width: 60 }} animation>
          <div className={styles.title}>{title}</div>
          <div className={styles.count}>
            {count}
            <span className={styles.unit}>{unit}</span>
          </div>
        </Skeleton>
      </div>
    </div>
  )
}

interface DataType {
  allContents?: string
  liveContents?: string
  increaseComments?: string
  growthRate?: string
  chartData?: { count?: number, date?: string }[]
  down?: boolean
}

function Overview() {
  const [data, setData] = useState<DataType>({})
  const [loading, setLoading] = useState(true)
  const t = useI18n(locale)

  const userInfo = useSelector((state: any) => state.userInfo || {})

  const fetchData = () => {
    setLoading(true)
    axios
      .get('/api/workplace/overview-content')
      .then((res) => {
        setData(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card>
      <Typography.Title heading={5}>
        {t['workplace.welcomeBack']}
        {userInfo.userName || userInfo.userLoginAccount}
      </Typography.Title>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem
            icon={<IconCalendar />}
            title={t['workplace.totalOnlyData']}
            count={data.allContents}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconContent />}
            title={t['workplace.contentInMarket']}
            count={data.liveContents}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconComments />}
            title={t['workplace.comments']}
            count={data.increaseComments}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconIncrease />}
            title={t['workplace.growth']}
            count={(
              <span>
                {data.growthRate}
                {' '}
                <IconCaretUp
                  style={{ fontSize: 18, color: 'rgb(var(--green-6))' }}
                />
              </span>
            )}
            loading={loading}
          />
        </Col>
      </Row>
      <Divider />
      <LatestNews></LatestNews>
    </Card>
  )
}

export default Overview
