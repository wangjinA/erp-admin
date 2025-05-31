import React from 'react'

import Announcement from './announcement'
import Carousel from './carousel'
import './mock'
import Overview from './overview'
import Shortcuts from './shortcuts'
import styles from './style/index.module.less'

import LatestNews from '@/pages/admin/user/info/latest-news'

function Workplace() {
  return (
    <div className={styles.wrapper}>

      <div className="mr-4 w-[calc(100%-(280px+16px))] flex gap-4 flex-col">
        <Overview />
        <LatestNews></LatestNews>
      </div>
      <div className="w-[280px] flex flex-col gap-4">
        <Shortcuts />
        <Carousel />
        <Announcement />
        {/* <Docs /> */}
      </div>
    </div>
  )
}

export default Workplace
