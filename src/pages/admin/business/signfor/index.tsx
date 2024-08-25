import {
  Grid,
  Message,
  Table,
  TableColumnProps,
  Typography,
} from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import React, { useState } from 'react'

import ScanCommon from '../ScanCommon'

import { ScanParams, ScanSignResponse, scanAPI } from '@/api/admin/entrepot'
import MyBadge from '@/components/MyBadge'
import { StatusColorMap } from '@/constants/statusTag'
import { formatDate, showMessage } from '@/utils'

export function checkIsProblem(instructions: string) {
  const msgs = ['拒收', '异常', '问题']
  return msgs.some(o => instructions?.includes(o))
}

const columns: TableColumnProps[] = [
  {
    title: '快递单号',
    dataIndex: 'trackingNumber',
  },
  {
    title: '仓库',
    dataIndex: 'sendWarehouseName',
  },
  {
    title: '说明',
    dataIndex: 'instructions',
    render(c: string) {
      const status = checkIsProblem(c) ? 'error' : 'success'
      return (
        <MyBadge
          status="default"
          color={StatusColorMap[status]}
          text={c}
        >
        </MyBadge>
      )
    },
  },
  {
    title: '扫码时间',
    dataIndex: 'createTime',
    render(c) {
      return formatDate(c, new Date())
    },
  },
  {
    title: '操作人',
    dataIndex: 'operator',
  },
]

export default () => {
  const [trackingNo, setTrackingNo] = useState<string>()
  const [list, setList] = useState<ScanSignResponse[]>([])
  const { run, data, loading } = useRequest(
    async (params: ScanParams) => {
      if (list.some(item => item.trackingNumber === trackingNo)) {
        Message.error('该快递单号已扫码，请勿重复扫码')
        return
      }
      const res = await showMessage(() => scanAPI.scanSign(params), '签收')
      if (res.data.data) {
        setList([res.data.data, ...list])
      }
    },
    {
      manual: true,
    },
  )
  console.log(list)
  return (
    <div className="bg-white py-6 px-4">
      <ScanCommon
        onScan={(info) => {
          console.log(info.trackingNo)
          setTrackingNo(info.trackingNo)
          setTimeout(() => {
            run(info)
          })
        }}
      >
      </ScanCommon>
      {/* {trackingNo ? (
        <Spin loading={loading} className='block'>
          <Alert
            className="mt-4"
            type="success"
            title={<div>快递单号：【{data?.trackingNumber || '-'}】</div>}
            content={
              <div>
                {data?.instructions || '-'}，签收时间：{data?.createTime || dayjs().format('YYYY-MM-DD HH:mm:ss')}
              </div>
            }
          />
        </Spin>
      ) : null} */}
      {list?.length
        ? (
            <>

              <Grid.Row justify="space-between" align="center" className="my-4">
                <Grid.Col span={16}>
                  <Typography.Title heading={6} className="!mb-0">
                    签收列表
                  </Typography.Title>
                </Grid.Col>
                {/* <Grid.Col span={8} style={{ textAlign: 'right' }}>
                  <Button type="text">查看扫码记录</Button>
                </Grid.Col> */}
              </Grid.Row>
              <Table
                loading={loading}
                data={list}
                columns={columns}
                rowClassName={(record) => {
                  return checkIsProblem(record.instructions) ? 'error-row' : ''
                }}
              >
              </Table>
            </>
          )
        : null}
    </div>
  )
}
