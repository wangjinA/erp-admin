import {
  Alert,
  Grid,
  Input,
  Message,
  Select,
  Typography,
} from '@arco-design/web-react';
import { IconScan } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import styles from './index.module.less';
import React, { useState } from 'react';
import { useRequest, useLocalStorageState } from 'ahooks';
import { ScanParams, entrepotAPI } from '@/api/admin/entrepot';
import { useEntrepotOptions } from '@/components/Selectors/EntrepotSelector';

interface ScanComponentProps {
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onScan?: (params: ScanParams) => void;
}

export default (props: ScanComponentProps) => {
  const { placeholder, className, style, onScan } = props;
  const { data, loading } = useEntrepotOptions();
  const [value, setValue] = useState<string>();
  const [entrepot, setEntrepot] = useLocalStorageState<any>('scan-entrepot');
  const height = 'h-20';
  return (
    <div className={classNames('bg-white p-4', className)} style={style}>
      <Grid.Row className="mx-auto w-1/2" style={{ minWidth: 650 }}>
        <Grid.Col span={5}>
          <div
            className={classNames(
              height,
              'flex flex-col border-r border-neutral-3 justify-center px-2'
            )}
            style={{
              backgroundColor: 'var(--color-fill-2)',
            }}
          >
            {/* <div className="text-lg pl-5">当前仓库</div> */}
            <Typography.Title heading={6} className="!mb-0 pl-5">
              当前仓库
            </Typography.Title>
            <Select
              value={entrepot}
              onChange={setEntrepot}
              size="large"
              placeholder="请选择仓库"
              options={data}
              loading={loading}
            ></Select>
          </div>
        </Grid.Col>
        <Grid.Col span={19}>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e);
            }}
            size="large"
            className={classNames(height, styles['input-style'], 'text-3xl')}
            placeholder={placeholder || "扫描或者输入快递单号"}
            onPressEnter={(e) => {
              if (entrepot === undefined) {
                return Message.error('请选择仓库');
              } else if (!e.target.value) {
                return Message.error('请输入信息');
              }
              setValue('');
              onScan({
                trackingNo: e.target.value,
                sendWarehouse: entrepot,
              });
            }}
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
