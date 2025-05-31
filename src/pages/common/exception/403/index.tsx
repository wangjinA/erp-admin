import { Result } from '@arco-design/web-react'
import classNames from 'classnames'
import React from 'react'

import locale from './locale'

import styles from './style/index.module.less'

import useI18n from '@/utils/useI18n'

function Exception403() {
  const t = useI18n(locale)

  return (
    <div className={classNames(styles.container, 'syb-content-h')}>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="403"
          subTitle={t['exception.result.403.description']}
          // extra={
          //   <Button key="back" type="primary">
          //     {t['exception.result.403.back']}
          //   </Button>
          // }
        />
      </div>
    </div>
  )
}

export default Exception403
