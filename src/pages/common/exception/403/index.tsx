import React from 'react';
import { Result, Button } from '@arco-design/web-react';
import locale from './locale';
import useI18n from '@/utils/useI18n';
import styles from './style/index.module.less';

function Exception403() {
  const t = useI18n(locale);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="403"
          subTitle={t['exception.result.403.description']}
          extra={
            <Button key="back" type="primary">
              {t['exception.result.403.back']}
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default Exception403;
