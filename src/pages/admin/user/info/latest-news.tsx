import { Avatar, Button, Card, Divider, Image, Input, List, Message, Skeleton, Typography } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import classNames from 'classnames'
import React from 'react'

import styles from './style/index.module.less'

import { entrepotAPI } from '@/api/admin/entrepot'
import { boundAPI } from '@/api/client/bound'
import CopyText from '@/components/CopyText'
import LabelValue from '@/components/LabelValue'
import StatusTag from '@/components/StatusTag'
import { showMessage } from '@/utils'

function LatestNews() {
  const entrepotListHandler = useRequest(() => {
    return entrepotAPI
      .getList({
        pageNum: 1,
        pageSize: 100,
        entrepotType: 1,
      }).then(r => r.data.data.list)
  })
  const boundInfoHandler = useRequest(() => {
    return boundAPI
      .getBoundInfo().then(r => r.data.data)
  })
  const boundListHandler = useRequest(() => {
    return boundAPI
      .getLogisticsList().then(r => r.data.data.list)
  })

  const bindLogisticsHandler = useRequest((v) => {
    return showMessage(() => boundAPI
      .bindLogistics(v), '绑定').then(boundInfoHandler.run)
  }, {
    manual: true,
  })

  const setDefaultHandler = useRequest((id) => {
    return showMessage((() => entrepotAPI.setDefualt(id))).then(entrepotListHandler.run)
  }, {
    manual: true,
  })

  console.log(boundInfoHandler.data)

  return (
    <Card
      className="flex-1 overflow-hidden"
      bodyStyle={{
        height: '100%',
      }}
    >
      <div className="flex flex-col h-full">
        <Typography.Title heading={6} className="!mb-0">
          <div className="flex items-center justify-between">
            <div>
              {
                boundInfoHandler.data?.id
                  ? '仓库地址'
                  : '合作物流商'
              }
            </div>
            {
              boundInfoHandler.data?.id
                ? (
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <img src={boundInfoHandler.data?.headImg} alt="" />
                      </Avatar>
                      <div>{boundInfoHandler.data?.userName}</div>
                    </div>
                  )
                : null
            }
          </div>
        </Typography.Title>
        <Divider></Divider>
        {
          (!boundInfoHandler.loading && !boundInfoHandler.data?.id)
            ? (
                <>
                  <div className="flex w-96 mt-4 mx-auto flex-1">
                    <Input.Search
                      placeholder="请输入合作物流商名称"
                      searchButton="绑定"
                      loading={bindLogisticsHandler.loading}
                      onSearch={(v) => {
                        if (v) {
                          const target = boundListHandler.data?.find(item => item.userName === v)
                          if (target) {
                            bindLogisticsHandler.run(target.id)
                          }
                          else {
                            Message.error('物流商不存在, 请和物流商确认后再操作！')
                          }
                        }
                      }}
                    >
                    </Input.Search>
                  </div>
                </>
              )
            : (
                <div className="flex-1 overflow-hidden">
                  <div className="h-full overflow-auto">
                    <List

                      loading={entrepotListHandler.loading}
                      dataSource={entrepotListHandler.data || (Array.from({ length: 5 }).fill({})) as any}
                      render={(item, index) => {
                        return (
                          <List.Item key={index} style={{ padding: '0px 20px 12px 0px', paddingTop: index ? 12 : 0 }} className="group">
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
                                        <div className="flex gap-4 items-center">
                                          <span className="text-lg">
                                            {item.entrepotName}
                                          </span>
                                          {item.defaultFlag
                                            ? (
                                                <StatusTag
                                                  size="small"
                                                  tagInfos={[
                                                    {
                                                      text: '默认仓库',
                                                      value: 1,
                                                      color: 'red',
                                                    },
                                                  ]}
                                                  value={1}
                                                >
                                                </StatusTag>
                                              )
                                            : null}
                                          <div className={`${!item.defaultFlag ? 'hidden group-hover:inline-block' : 'hidden'}`}>
                                            <Button
                                              type="primary"
                                              size="mini"
                                              onClick={() => {
                                                setDefaultHandler.run(item.id)
                                              }}
                                            >
                                              设为默认
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                      description={(
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
                                      )}
                                    />
                                    <Image className="arco-image-cover" width={100} height={100} src={item.qrCode}></Image>
                                  </div>
                                )}
                          </List.Item>
                        )
                      }}
                    />
                  </div>
                </div>
              )
        }

      </div>
    </Card>
  )
}

export default LatestNews
