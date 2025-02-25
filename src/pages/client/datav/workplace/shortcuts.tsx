import {
  Card,
  Typography,
} from '@arco-design/web-react'
import {
  IconArchive,
  IconCommon,
  IconFile,
} from '@arco-design/web-react/icon'
import React from 'react'

import { useHistory } from 'react-router-dom'

import locale from './locale'
import styles from './style/shortcuts.module.less'

import useI18n from '@/utils/useI18n'

function Shortcuts() {
  const t = useI18n(locale)
  const history = useHistory()

  const shortcuts = [
    {
      title: t['workplace.contentMgmt'],
      icon: <IconFile />,
      path: '/client/order/all',
    },
    {
      title: t['workplace.contentMgmt1'],
      icon: <IconCommon />,
      path: '/client/order/alreadyPacked',
    },
    {
      title: t['workplace.contentStatistic'],
      icon: <IconArchive />,
      path: '/client/store/list',
    },
    // {
    //   title: t['workplace.advancedMgmt'],
    //   key: 'Advanced Management',
    //   icon: <IconSettings />,
    // },
    // {
    //   title: t['workplace.onlinePromotion'],
    //   key: 'Online Promotion',
    //   icon: <IconMobile />,
    // },
    // {
    //   title: t['workplace.marketing'],
    //   key: 'Marketing',
    //   icon: <IconFire />,
    // },
  ]
  function onClickShortcut(key) {
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>
          {t['workplace.shortcuts']}
        </Typography.Title>
        {/* <Link>{t['workplace.seeMore']}</Link> */}
      </div>
      <div className={styles.shortcuts}>
        {shortcuts.map(shortcut => (
          <div
            className={styles.item}
            key={shortcut.path}
            onClick={() => history.push(shortcut.path)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
      {/* <Divider /> */}
      {/* <div className={styles.recent}>{t['workplace.recent']}</div>
      <div className={styles.shortcuts}>
        {recentShortcuts.map(shortcut => (
          <div
            className={styles.item}
            key={shortcut.key}
            onClick={() => onClickShortcut(shortcut.key)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div> */}
    </Card>
  )
}

export default Shortcuts
