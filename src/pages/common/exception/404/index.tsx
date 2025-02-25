import React from 'react';
import { Result, Button } from '@arco-design/web-react';
import locale from './locale';
import useI18n from '@/utils/useI18n';
import styles from './style/index.module.less';

function Exception404() {
  const t = useI18n(locale);

  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="404"
        subTitle={t['exception.result.404.description']}
        extra={[
          <Button key="again" style={{ marginRight: 16 }}>
            {t['exception.result.404.retry']}
          </Button>,
          <Button key="back" type="primary">
            {t['exception.result.404.back']}
          </Button>,
        ]}
      />
    </div>
  );
}

export default Exception404;
