import {
  Alert,
  Grid,
  Input,
  Message,
  Select,
  Spin,
  Typography,
} from '@arco-design/web-react'
import { IconScan } from '@arco-design/web-react/icon'
import { useLocalStorageState } from 'ahooks'
import classNames from 'classnames'

import React, { useRef, useState } from 'react'

import styles from './index.module.less'

import { ScanParams } from '@/api/admin/entrepot'
import { useEntrepotOptions } from '@/components/Selectors/EntrepotSelector'
import { EmitTypes, useEventBus } from '@/hooks/useEventBus'

export interface ScanComponentProps {
  showAlert?: boolean;
  isAuto?: boolean;
  placeholder?: string
  className?: string
  loading?: boolean
  style?: React.CSSProperties
  onScan?: (params: ScanParams) => void
}

export const ScanMinWidth = 650

export default (props: ScanComponentProps) => {
  const { showAlert = true, isAuto = false, placeholder, className, style, loading, onScan } = props
  const { data, loading: loadingEntrepot } = useEntrepotOptions()
  const [value, setValue] = useState<string>()
  const [entrepot, setEntrepot] = useLocalStorageState<any>('scan-entrepot')
  // useEffect(() => {
  //   if (data?.length) {
  //     setEntrepot(data.find(o => o.default)?.value || data[0]?.value)
  //   }
  // }, [data])
  const ref = useRef<any>()

  useEventBus(EmitTypes.focusScanInput, () => {
    console.log(ref.current)
    ref.current.focus()
  })

  const height = 'h-20'
  return (
    <div className={className} style={style}>
      <Grid.Row className="mx-auto w-1/2" style={{ minWidth: ScanMinWidth }}>
        <Grid.Col span={5}>
          <div
            className={classNames(
              height,
              'flex flex-col border-r border-neutral-3 justify-center px-2',
            )}
            style={{
              backgroundColor: 'var(--color-fill-2)',
            }}
          >
            {/* <div className="text-lg pl-5">当前仓库</div> */}
            <Typography.Title heading={6} className="!mb-0 pl-5">
              当前仓库
            </Typography.Title>
            {
              isAuto ? <Typography.Text type="secondary" className="pl-5">自动匹配</Typography.Text> : <Select
                value={entrepot}
                onChange={setEntrepot}
                size="large"
                placeholder="请选择仓库"
                options={data}
                loading={loadingEntrepot}
              >
              </Select>
            }
          </div>
        </Grid.Col>
        <Grid.Col span={19}>
          <Input
            ref={ref}
            value={value}
            autoFocus={true}
            onChange={(e) => {
              if (e) {
                setValue(e.trim())
              } else {
                setValue(e)
              }
            }}
            size="large"
            className={classNames(height, styles['input-style'], 'text-3xl')}
            placeholder={placeholder || '扫描或者输入快递单号'}
            onPressEnter={(e) => {
              if (!isAuto && entrepot === undefined) {
                return Message.error('请选择仓库')
              }
              else if (!e.target.value) {
                return Message.error('请输入信息')
              }
              setValue('')
              onScan({
                trackingNo: e.target.value,
                sendWarehouse: entrepot,
              })
            }}
            suffix={(loadingEntrepot || loading) ? <Spin /> : <IconScan />}
          >
          </Input>
        </Grid.Col>
        {
          showAlert ? <Alert
            type="info"
            content="请用扫描快递条形码或者手动输入快递单号签收快递"
            className="mt-4"
          /> : null
        }
      </Grid.Row>
    </div>
  )
}
