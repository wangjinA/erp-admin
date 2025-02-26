import React from 'react';
import { Result, Button } from '@arco-design/web-react';
import locale from './locale';
import useI18n from '@/utils/useI18n';
import styles from './style/index.module.less';

function Exception500() {
  const t = useI18n(locale);

  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="500"
        subTitle={t['exception.result.500.description']}
        extra={
          <Button key="back" type="primary">
            {t['exception.result.500.back']}
          </Button>
        }
      />
    </div>
  );
}

export default Exception500;
