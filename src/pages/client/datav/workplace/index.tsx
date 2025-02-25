import { Grid, Space } from '@arco-design/web-react'
import React from 'react'

import Announcement from './announcement'
import Carousel from './carousel'
import './mock'
import Overview from './overview'
import Shortcuts from './shortcuts'
import styles from './style/index.module.less'

import LatestNews from '@/pages/admin/user/info/latest-news'

const { Row, Col } = Grid

const gutter = 16

function Workplace() {
  return (
    <div className={styles.wrapper}>
      <Space size={16} direction="vertical" className={styles.left}>
        <Overview />
        <LatestNews></LatestNews>
      </Space>
      <Space className={styles.right} size={16} direction="vertical">
        <Shortcuts />
        <Carousel />
        <Announcement />
        {/* <Docs /> */}
      </Space>
    </div>
  )
}

export default Workplace
