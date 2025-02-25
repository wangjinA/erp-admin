import {
  Button,
  Card,
  Divider,
  Grid,
  Message,
  Skeleton,
  Typography,
} from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import axios from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import IconCalendar from './assets/calendar.svg'
import IconComments from './assets/comments.svg'
import IconContent from './assets/content.svg'
import IconIncrease from './assets/increase.svg'

import locale from './locale'
import styles from './style/overview.module.less'

import moneyIcon from '@/assets/money.png'

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
            {/* <span className={styles.unit}>{unit}</span> */}
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

  const countDataHandler = useRequest(() => {

  }, {})

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Typography.Title heading={5} className="!mb-0">
          {t['workplace.welcomeBack']}
          {userInfo.userName || userInfo.userLoginAccount}
        </Typography.Title>
        <div className="flex items-center ml-20 gap-2">
          <img className="size-9 select-none" src={moneyIcon}></img>
          <div>
            {/* <span style={{ color: '#333' }}>账户余额：</span> */}
            <Typography.Text>
              账户余额：
            </Typography.Text>
            <span className="ml-1 font-bold text-orange-600">
              <span className="text-xs">¥</span>
              100000
            </span>
          </div>
          <Button
            type="primary"
            status="success"
            size="mini"
            className="ml-2"
            onClick={() => {
              Message.warning('请联系客服进行缴费')
            }}
          >
            立即缴费
          </Button>
        </div>
      </div>
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
            count={data.growthRate}
            loading={loading}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default Overview
