import { Alert, Form, Grid, Input, Select } from '@arco-design/web-react';
import { IconScan } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import styles from './index.module.less';
import React from 'react';
export default () => {
  const height = 'h-20';
  return (
    <div>
      <Grid.Row className="mx-auto w-1/2 mt-12">
        <Grid.Col span={5}>
          <div
            className={classNames(
              height,
              'flex flex-col border-r justify-center px-2'
            )}
            style={{
              backgroundColor: 'var(--color-fill-2)',
            }}
          >
            <div className="text-lg pl-5">当前仓库</div>
            <Select
              size="large"
              placeholder="请选择仓库"
              options={[
                {
                  label: '凤凰国际仓',
                  value: '1',
                },
                {
                  label: '测试-汪',
                  value: '2',
                },
              ]}
            ></Select>
          </div>
        </Grid.Col>
        <Grid.Col span={19}>
          <Input
            size="large"
            className={classNames(height, styles['input-style'], 'text-3xl')}
            placeholder="扫描或者输入快递单号"
            suffix={<IconScan />}
          ></Input>
        </Grid.Col>
        <Alert
          type="info"
          content="请用扫描快递条形码或者手动输入快递单号签收快递"
          className="mt-4"
        />
      </Grid.Row>
    </div>
  );
};
