import { Card, Image, List, Skeleton, Typography } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import classNames from 'classnames'
import React from 'react'

import styles from './style/index.module.less'

import { entrepotAPI } from '@/api/admin/entrepot'
import CopyText from '@/components/CopyText'
import LabelValue from '@/components/LabelValue'

function LatestNews() {
  const entrepotListHandler = useRequest(() => {
    return entrepotAPI
      .getList({
        pageNum: 1,
        pageSize: 100,
        entrepotType: 1,
      }).then(r => r.data.data.list)
  })

  return (
    <Card>
      <Typography.Title heading={6} className="!mb-0">仓库地址</Typography.Title>
      <List
        dataSource={entrepotListHandler.data || (Array.from({ length: 5 }).fill({})) as any}
        render={(item, index) => {
          return (
            <List.Item key={index} style={{ padding: '12px 20px 12px 0px' }}>
              {entrepotListHandler.loading
                ? (
                    <Skeleton
                      animation
                      text={{ width: ['60%', '90%'], rows: 2 }}
                      image={{ shape: 'circle' }}
                    />
                  )
                : (
                    <div className="flex w-full items-center">
                      <List.Item.Meta
                        className={classNames(styles['list-meta-ellipsis'], 'flex-1')}
                        title={(
                          <span className="text-lg">
                            {item.entrepotName}
                          </span>
                        )}
                        description={(
                          // <Paragraph
                          //   ellipsis={{ rows: 1 }}
                          //   type="secondary"
                          //   style={{ fontSize: '12px', margin: 0 }}
                          // >
                          //   {item.description}
                          <>
                            <LabelValue label="收货人" value={item.consignee}></LabelValue>
                            <LabelValue label="联系电话" value={item.telephone}></LabelValue>
                            <LabelValue
                              label="收货地址"
                              value={(
                                <CopyText value={item.deliveryAddress + item.detailedAddress}>
                                  {item.deliveryAddress + item.detailedAddress}
                                </CopyText>
                              )}
                            >
                            </LabelValue>
                          </>
                          // </Paragraph>
                        )}
                      />
                      <Image className="arco-image-cover" width={100} height={100} src={item.qrCode}></Image>
                    </div>
                  )}
            </List.Item>
          )
        }}
      />
    </Card>
  )
}

export default LatestNews
