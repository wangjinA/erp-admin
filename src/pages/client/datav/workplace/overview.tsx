import {
  Button,
  Card,
  Divider,
  Grid,
  Message,
  Skeleton,
  Typography,
} from '@arco-design/web-react'

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
import { useRequest } from 'ahooks'
import { orderAPI } from '@/api/client/order'
import dayjs from 'dayjs'

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
  const t = useI18n(locale)

  const userInfo = useSelector((state: any) => state.userInfo || {})

  const { data, loading } = useRequest(() => {
    return orderAPI.getWorkbenches({
      createStartTime: dayjs().subtract(3, 'month').format('YYYY-MM-DD HH:mm:ss'),
      createEndTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }).then(r => r.data.data);
  }, {
    manual: false
  })

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Typography.Title heading={5} className="!mb-0">
          {t['workplace.welcomeBack']}
          <Typography.Text copyable>
            {userInfo.tenantryNo || userInfo.userName || userInfo.userLoginAccount}
          </Typography.Text>
        </Typography.Title>
        {/* <div className="flex items-center ml-20 gap-2">
          <img className="size-9 select-none" src={moneyIcon}></img>
          <div>
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
        </div> */}
      </div>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem
            icon={<IconCalendar />}
            title={t['workplace.totalOnlyData']}
            count={data?.waitingPackagingNum}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconContent />}
            title={t['workplace.contentInMarket']}
            count={data?.stockPendingNum}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconComments />}
            title={t['workplace.comments']}
            count={data?.partialStorageNum}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconIncrease />}
            title={t['workplace.growth']}
            count={data?.waitingReleasedNum}
            loading={loading}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default Overview
