import { Button, Result, Steps, Typography } from '@arco-design/web-react'
import React from 'react'

import locale from './locale'
import styles from './style/index.module.less'

import useI18n from '@/utils/useI18n'

const Step = Steps.Step

function Success() {
  const t = useI18n(locale)

  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="success"
          title={t['success.result.title']}
          subTitle={t['success.result.subTitle']}
          extra={[
            <Button key="again" type="secondary" style={{ marginRight: 16 }}>
              {t['success.result.printResult']}
            </Button>,
            <Button key="back" type="primary">
              {t['success.result.projectList']}
            </Button>,
          ]}
        />
        <div className={styles['steps-wrapper']}>
          <Typography.Paragraph bold>
            {t['success.result.progress']}
          </Typography.Paragraph>
          <Steps type="dot" current={2}>
            <Step
              title={t['success.submitApplication']}
              description="2020/10/10 14:00:39"
            />
            <Step
              title={t['success.leaderReview']}
              description={t['success.processing']}
            />
            <Step
              title={t['success.purchaseCertificate']}
              description={t['success.waiting']}
            />
            <Step
              title={t['success.safetyTest']}
              description={t['success.waiting']}
            />
            <Step
              title={t['success.launched']}
              description={t['success.waiting']}
            />
          </Steps>
        </div>
      </div>
    </div>
  )
}

export default Success
